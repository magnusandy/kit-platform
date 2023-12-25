import { articles } from './data/articles';
import { videos } from './data/videos';
import { quizzes } from './data/quizzes';
import { Module } from '@nestjs/common';
import { Args, GraphQLModule, Query, Resolver } from '@nestjs/graphql';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { NestFactory } from '@nestjs/core';
import { Article } from './generated/graphqlTypes';

@Resolver('Article')
class ArticleResolver {
    @Query('article')
    getArticle(
        @Args('id') id: string | undefined,
        @Args('slug') slug: string | undefined
    ): Article | undefined {
        return articles.find(
            (article) => article.id === id || article.slug === slug
        );
    }

    @Query('articles')
    getArticles(): Article[] {
        return articles;
    }
}

@Resolver('Video')
class VideoResolver {
    @Query('video')
    getVideo(
        @Args('id') id: string | undefined,
        @Args('slug') slug: string | undefined
    ) {
        return videos.find((video) => video.id === id || video.slug === slug);
    }

    @Query('videos')
    getVideos() {
        return videos;
    }
}

@Resolver('Quiz')
class QuizResolver {
    @Query('quizById')
    getQuizById(@Args('id') id: string | undefined) {
        return quizzes.find((quiz) => quiz.id === id);
    }

    @Query('quizzes')
    getQuizzes() {
        return quizzes;
    }
}

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            typePaths: ['./dist/apps/services/content/schema.graphql'],
            path: '/',
        }),
    ],
    controllers: [],
    providers: [ArticleResolver, VideoResolver, QuizResolver],
})
class ContentModule {}

async function bootstrap() {
    const app = await NestFactory.create(ContentModule);
    await app.listen(6110);
}
bootstrap();

/*

// Schema
// ------
const typeDefs = gql(
    fs.readFileSync(
        path.resolve('./dist/apps/services/content/schema.graphql'),
        { encoding: 'utf8' }
    )
);

// Resolvers
// ---------
const resolvers: Resolvers = {
    Query: {
        articles: () => articles,
        article: (_, { id, slug }) => {
            return articles.find(
                (article) => article.id === id || article.slug === slug
            );
        },
        quizzes: () => quizzes,
        quizById: (_, { id }) => {
            return quizzes.find((quiz) => quiz.id === id);
        },
        videos: () => videos,
        video: (_, { id, slug }) => {
            return videos.find(
                (video) => video.id === id || video.slug === slug
            );
        },
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.CONTENT_SERVICE_PORT) || 6110 },
    });

    console.log('Content server ready at:', url);
})();

 */
