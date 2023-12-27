import { Module } from '@nestjs/common';
import { buildSubgraphModule } from '@kit-platform/graphql';
import { CONTENT_RESOLVERS } from './api/resolvers';

@Module({
    imports: [
        buildSubgraphModule('./dist/apps/services/content/schema.graphql'),
    ],
    controllers: [],
    providers: [...CONTENT_RESOLVERS],
})
export class ContentModule {}
