import { codegenConfig } from '../../../tools/graphql.codegen';

const config = codegenConfig(
    `${__dirname}/src/schema.graphql`,
    `${__dirname}/src/generated/graphqlTypes.ts`
);

export default config;
