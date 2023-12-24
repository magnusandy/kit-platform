import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'apps/services/content/src/schema.graphql',
    generates: {
        'apps/services/content/src/generated/graphqlTypes.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
        },
        'apps/services/content/graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};

export default config;
