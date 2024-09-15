import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import AppleProvider from 'next-auth/providers/apple';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/dbConnect';
import UserModel from '../../../../model/User';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                await dbConnect();
                const user = await UserModel.findOne({ username: credentials.username });

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return user;
                }

                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID!,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        // }),
        // AppleProvider({
        //     clientId: process.env.APPLE_CLIENT_ID!,
        //     clientSecret: process.env.APPLE_CLIENT_SECRET!,
        // }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    name: token.name,
                };
            }
            return session;
        },
        async jwt({ user, token }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
        newUser: '/signup',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
