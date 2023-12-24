/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n            query GetData($userId: ID!, $contentId: ID!) {\n                userProgress(userId: $userId, contentId: $contentId) {\n                    userId\n                    contentId\n                    completedTimestamp\n                }\n            }\n        ": types.GetDataDocument,
    "\n            query Quiz($id: ID!, $userId: ID!) {\n                quizById(id: $id) {\n                    id\n                    title\n                    questions {\n                        id\n                        questionText\n                        progress(userId: $userId) {\n                            completedTimestamp\n                        }\n                    }\n                }\n            }\n        ": types.QuizDocument,
    "\n        mutation MarkQuestionComplete($input: UpdateProgressInput!) {\n            saveProgress(input: $input) {\n                completedTimestamp\n            }\n        }\n    ": types.MarkQuestionCompleteDocument,
    "\n        mutation Login($username: String!, $password: String!) {\n            login(username: $username, password: $password) {\n                accessToken\n                user {\n                    id\n                    firstName\n                    lastName\n                    username\n                }\n            }\n        }\n    ": types.LoginDocument,
    "\n            query Article($slug: String) {\n                article(slug: $slug) {\n                    id\n                    title\n                    image\n                    quizId\n                }\n            }\n        ": types.ArticleDocument,
    "\n        query AllContent {\n            articles {\n                id\n                title\n                image\n                slug\n                description\n            }\n            videos {\n                id\n                title\n                description\n                slug\n                image\n            }\n            quizzes {\n                id\n                title\n            }\n        }\n    ": types.AllContentDocument,
    "\n            query Video($slug: String) {\n                video(slug: $slug) {\n                    id\n                    title\n                    image\n                    youtubeId\n                    description\n                    quizId\n                }\n            }\n        ": types.VideoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            query GetData($userId: ID!, $contentId: ID!) {\n                userProgress(userId: $userId, contentId: $contentId) {\n                    userId\n                    contentId\n                    completedTimestamp\n                }\n            }\n        "): (typeof documents)["\n            query GetData($userId: ID!, $contentId: ID!) {\n                userProgress(userId: $userId, contentId: $contentId) {\n                    userId\n                    contentId\n                    completedTimestamp\n                }\n            }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            query Quiz($id: ID!, $userId: ID!) {\n                quizById(id: $id) {\n                    id\n                    title\n                    questions {\n                        id\n                        questionText\n                        progress(userId: $userId) {\n                            completedTimestamp\n                        }\n                    }\n                }\n            }\n        "): (typeof documents)["\n            query Quiz($id: ID!, $userId: ID!) {\n                quizById(id: $id) {\n                    id\n                    title\n                    questions {\n                        id\n                        questionText\n                        progress(userId: $userId) {\n                            completedTimestamp\n                        }\n                    }\n                }\n            }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation MarkQuestionComplete($input: UpdateProgressInput!) {\n            saveProgress(input: $input) {\n                completedTimestamp\n            }\n        }\n    "): (typeof documents)["\n        mutation MarkQuestionComplete($input: UpdateProgressInput!) {\n            saveProgress(input: $input) {\n                completedTimestamp\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation Login($username: String!, $password: String!) {\n            login(username: $username, password: $password) {\n                accessToken\n                user {\n                    id\n                    firstName\n                    lastName\n                    username\n                }\n            }\n        }\n    "): (typeof documents)["\n        mutation Login($username: String!, $password: String!) {\n            login(username: $username, password: $password) {\n                accessToken\n                user {\n                    id\n                    firstName\n                    lastName\n                    username\n                }\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            query Article($slug: String) {\n                article(slug: $slug) {\n                    id\n                    title\n                    image\n                    quizId\n                }\n            }\n        "): (typeof documents)["\n            query Article($slug: String) {\n                article(slug: $slug) {\n                    id\n                    title\n                    image\n                    quizId\n                }\n            }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query AllContent {\n            articles {\n                id\n                title\n                image\n                slug\n                description\n            }\n            videos {\n                id\n                title\n                description\n                slug\n                image\n            }\n            quizzes {\n                id\n                title\n            }\n        }\n    "): (typeof documents)["\n        query AllContent {\n            articles {\n                id\n                title\n                image\n                slug\n                description\n            }\n            videos {\n                id\n                title\n                description\n                slug\n                image\n            }\n            quizzes {\n                id\n                title\n            }\n        }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            query Video($slug: String) {\n                video(slug: $slug) {\n                    id\n                    title\n                    image\n                    youtubeId\n                    description\n                    quizId\n                }\n            }\n        "): (typeof documents)["\n            query Video($slug: String) {\n                video(slug: $slug) {\n                    id\n                    title\n                    image\n                    youtubeId\n                    description\n                    quizId\n                }\n            }\n        "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;