import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import dbConnect from "../../../lib/dbConnect"
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
                id: { label: 'ID', type: 'text' },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect(); // Ensure connection is established

            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    
                };
            }
            return session;
        },
        async jwt({ user, token }) {
            if (user) {
                
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
        newUser:'/signup',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRETKEY
};