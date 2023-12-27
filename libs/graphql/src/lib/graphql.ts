import { GraphQLModule } from '@nestjs/graphql';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';

export function buildSubgraphModule(typePath: string) {
    return GraphQLModule.forRoot<ApolloFederationDriverConfig>({
        driver: ApolloFederationDriver,
        typePaths: [typePath],
        path: '/',
    });
}
