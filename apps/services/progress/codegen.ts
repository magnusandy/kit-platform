import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'apps/services/progress/src/schema.graphql',
    generates: {
        'apps/services/progress/src/generated/graphqlTypes.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
        },
        'apps/services/progress/graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};

export default config;
