import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql/error';
import { login } from '@kit-platform/user-access';

@Resolver()
class AuthResolver {
    @Mutation('login')
    async login(
        @Args('username') username: string,
        @Args('password') password: string
    ) {
        try {
            const { accessToken, user } = await login(username, password);
            return {
                accessToken,
                user: {
                    ...user,
                    id: user.id.toString(),
                },
                success: true,
            };
        } catch (error) {
            throw new GraphQLError(error.message);
        }
    }
}

export const AUTH_RESOLVERS = [AuthResolver];
