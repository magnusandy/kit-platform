import { Module } from '@nestjs/common';
import {
    ProgressPostgresRepository,
    UserProgressRecord,
    UserProgressService,
} from '@kit-platform/progress';
import { PROGRESS_RESOLVERS } from './api/resolvers';
import {
    buildSubgraphModule,
    DataLoaderInterceptor,
} from '@kit-platform/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROGRESS_LOADERS } from './api/loaders';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
        ...PROGRESS_LOADERS,
        {
            provide: APP_INTERCEPTOR,
            useClass: DataLoaderInterceptor,
        },
    ],
})
export class ProgressModule {}
