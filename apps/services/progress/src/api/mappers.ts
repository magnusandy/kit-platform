//ideally there is some type generation of the graphql types so that we can avoid the any here
// i like to have a clear seperation between the domain objects and the schema objects, often they will differ in shape
import { UserProgressData } from '@kit-platform/progress';
import { UserProgressData as UserProgressDataDTO } from '../generated/graphqlTypes';

export function userProgressDataToSchema(
    userProgress: UserProgressData
): UserProgressDataDTO {
    return {
        userId: userProgress.userId,
        contentId: userProgress.contentId,
        progressPercentInt: userProgress.progressPercentInt,
        completedTimestamp: userProgress.completedDate
            ? userProgress.completedDate.valueOf()
            : null,
        isBookmarked: userProgress.isBookmarked,
    };
}
