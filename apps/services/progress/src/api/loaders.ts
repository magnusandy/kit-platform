import { Inject, Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { UserProgressId, UserProgressService } from '@kit-platform/progress';
import { UserProgressData as UserProgressDataDTO } from '../generated/graphqlTypes';
import DataLoader from 'dataloader';
import { userProgressDataToSchema } from './mappers';

@Injectable()
export class UserProgressDataLoader
    implements NestDataLoader<UserProgressId, UserProgressDataDTO>
{
    constructor(
        @Inject(UserProgressService)
        private readonly progressService: UserProgressService
    ) {}

    generateDataLoader(): DataLoader<UserProgressId, UserProgressDataDTO> {
        return new DataLoader<UserProgressId, UserProgressDataDTO>(
            async (ids: UserProgressId[]) => {
                const progress = await this.progressService.loadByIds(ids);
                return ids.map((id) => {
                    const found = progress.find((item) => item.matches(id));
                    return found ? userProgressDataToSchema(found) : null;
                });
            }
        );
    }
}

export const PROGRESS_LOADERS = [UserProgressDataLoader];