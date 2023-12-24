import React, { useContext, useState } from 'react';
import { ApolloError, gql, useMutation } from '@apollo/client';
import {
    LoginMutation,
    LoginMutationVariables,
} from '../__generated__/graphql';

type AuthContextType = {
    accessToken: string;
    user?: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
    };
    setUser?: (accessToken: string, user: User) => void;
};

type User = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
};

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    accessToken: '',
});

const ls = {
    get: (key: string, defaultValue: unknown = '') => {
        const item = window.localStorage.getItem(`kit:${key}`);
        return item ? JSON.parse(item) : defaultValue;
    },
    set: (key: string, value: unknown) => {
        window.localStorage.setItem(`kit:${key}`, JSON.stringify(value));
    },
};

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(ls.get('accessToken', ''));
    const [user, setUser] = useState(ls.get('user', null));

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                setUser: (accessToken: string, user: User) => {
                    ls.set('accessToken', accessToken);
                    ls.set('user', user);
                    setAccessToken(accessToken);
                    setUser(user);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useUser = () => {
    const { user } = useContext(AuthContext);
    return user;
};

type LoginFunction = (username: string, password: string) => Promise<void>;

export const useLogin = (): [
    LoginFunction,
    {
        loading: boolean;
        data: {
            accessToken: string;
            user: User;
        };
        error: ApolloError;
    }
] => {
    const { setUser } = useContext(AuthContext);
    const [mutate, { data, loading, error }] = useMutation<
        LoginMutation,
        LoginMutationVariables
    >(gql`
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                accessToken
                user {
                    id
                    firstName
                    lastName
                    username
                }
            }
        }
    `);

    const login: LoginFunction = (username: string, password: string) => {
        return mutate({
            variables: {
                username,
                password,
            },
        }).then(({ data }) => {
            const { accessToken, user } = data.login;
            setUser(accessToken, user);
        });
    };

    return [
        login,
        {
            loading,
            data: {
                accessToken: data?.login.accessToken,
                user: data?.login.user,
            },
            error,
        },
    ];
};
