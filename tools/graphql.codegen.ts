import type { CodegenConfig } from '@graphql-codegen/cli';

export function codegenConfig(
    schemaPath: string,
    outputPath: string
): CodegenConfig {
    return {
        overwrite: true,
        schema: schemaPath,
        generates: {
            [outputPath]: {
                plugins: ['typescript', 'typescript-resolvers'],
            },
        },
    };
}
