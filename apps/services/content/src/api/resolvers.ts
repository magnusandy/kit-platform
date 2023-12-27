import { Args, Query, Resolver } from '@nestjs/graphql';
import { Article } from '../generated/graphqlTypes';
import { articles } from '../data/articles';
import { videos } from '../data/videos';
import { quizzes } from '../data/quizzes';

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

export const CONTENT_RESOLVERS = [ArticleResolver, VideoResolver, QuizResolver];
