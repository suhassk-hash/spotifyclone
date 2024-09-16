import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
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
            async authorize(credentials) : Promise<any>{
                if (!credentials) {
                    return null;
                }

                await dbConnect();
                const userDoc = await UserModel.findOne({ username: credentials.username });

                if (userDoc && bcrypt.compareSync(credentials.password, userDoc.password)) {
                    return {
                        _id: userDoc.id.toString(),
                        username: userDoc.username,
                        playlists: userDoc.playlists,
                    };
                }

                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    _id: token._id as string,
                    username: token.username as string,
                    email: token.email as string,
                    playlists: token.playlists, // Ensure playlists are included
                };
            }
            return session;
        },
        async jwt({ user, token }) {
            if (user) {
                token._id = user._id as string;
                token.username = user.username as string;
                token.email = user.email as string;
                token.playlists = user.playlists; // Ensure playlists are included
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
