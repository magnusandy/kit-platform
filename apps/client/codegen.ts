import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:6050',
    documents: [`${__dirname}/src/**/*.tsx`],
    generates: {
        [`${__dirname}/src/__generated__/`]: {
            preset: 'client',
        },
    },
};

export default config;
