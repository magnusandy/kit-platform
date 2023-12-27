import { Module } from '@nestjs/common';
import { buildSubgraphModule } from '@kit-platform/graphql';
import { AUTH_RESOLVERS } from './api/resolvers';

@Module({
    imports: [buildSubgraphModule('./dist/apps/services/auth/schema.graphql')],
    controllers: [],
    providers: [...AUTH_RESOLVERS],
})
export class AuthModule {}
