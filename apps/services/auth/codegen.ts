import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'apps/services/auth/src/schema.graphql',
    generates: {
        'apps/services/auth/src/generated/graphqlTypes.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
        },
        'apps/services/auth/graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};

export default config;
