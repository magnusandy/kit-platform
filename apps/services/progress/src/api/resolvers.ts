import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import {
    Content,
    UpdateProgressInput,
    UserProgressData as UserProgressDataDTO,
} from '../generated/graphqlTypes';
import { Headers, Inject } from '@nestjs/common';
import {
    UserProgressDataUpdates,
    UserProgressId,
    UserProgressService,
} from '@kit-platform/progress';
import { verifyAccessToProgress } from '@kit-platform/user-access';
import { GraphQLError } from 'graphql/error';
import { userProgressDataToSchema } from './mappers';
import { Loader } from '@kit-platform/graphql';
import DataLoader from 'dataloader';
import { UserProgressDataLoader } from './loaders';

@Resolver('Content')
class ContentResolver {
    constructor(
        @Inject(UserProgressService)
        private readonly progressService: UserProgressService
    ) {}

    @Query('userProgress')
    async userProgress(
        @Args('userId') userId: string,
        @Args('contentId') contentId: string,
        @Loader(UserProgressDataLoader)
        progressLoader: DataLoader<UserProgressId, UserProgressDataDTO>
    ): Promise<UserProgressDataDTO> {
        return progressLoader.load({ userId, contentId });
    }

    @Mutation('saveProgress')
    async saveProgress(
        @Args('input') input: UpdateProgressInput,
        @Headers('authorization') authToken: string | undefined
    ): Promise<UserProgressDataDTO> {
        const {
            userId,
            contentId,
            progressPercentInt,
            completedTimestamp,
            isBookmarked,
        } = input;
        const completedDate = completedTimestamp
            ? new Date(completedTimestamp)
            : undefined;
        const canAccess = await verifyAccessToProgress(authToken, userId);
        if (!canAccess) {
            throw new GraphQLError('User does not have access to this content');
        }
        const id: UserProgressId = { userId, contentId };
        const updates: UserProgressDataUpdates = {
            progressPercentInt,
            completedDate,
            isBookmarked,
        };
        const updated = await this.progressService.save(id, updates);
        return userProgressDataToSchema(updated);
    }

    @ResolveField('progress')
    async progress(
        @Parent() content: Content,
        @Args('userId') userId: string,
        @Headers('authorization') authToken: string | undefined,
        @Loader(UserProgressDataLoader)
        progressLoader: DataLoader<UserProgressId, UserProgressDataDTO>
    ): Promise<Content['progress']> {
        const canAccess = await verifyAccessToProgress(authToken, userId);
        if (!canAccess) {
            throw new GraphQLError('User does not have access to this content');
        }
        return progressLoader.load({ userId, contentId: content.id });
    }
}

export const PROGRESS_RESOLVERS = [ContentResolver];
