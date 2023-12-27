import { Module } from '@nestjs/common';
import {
    ProgressPostgresRepository,
    UserProgressRecord,
    UserProgressService,
} from '@kit-platform/progress';
import { PROGRESS_RESOLVERS } from '../api/resolvers';
import { buildSubgraphModule } from '@kit-platform/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'kit_admin',
            password: 'password',
            database: 'kit',
            synchronize: true, //this automatically creates the tables for based on the entities, not ideal for production, but works well for development
            logging: false,
            entities: [UserProgressRecord],
        }),
        buildSubgraphModule('./dist/apps/services/progress/schema.graphql'),
    ],
    providers: [
        ...PROGRESS_RESOLVERS,
        UserProgressService,
        ProgressPostgresRepository.Provider(),
        //todo loaders
    ],
})
export class ProgressModule {}
