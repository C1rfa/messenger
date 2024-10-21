import { NextAuthOptions } from "next-auth";
import { prismaClient } from "@/shared/services/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import CredentialsProvider  from "next-auth/providers/credentials";
import SpotifyProvider from "next-auth/providers/spotify";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";


export const getAuthOptions = (): NextAuthOptions => {
    return {
        secret: process.env.NEXTAUTH_SECRET,
        adapter: PrismaAdapter(prismaClient),
        session: {
            strategy: "jwt"
        },
        providers: [
            SpotifyProvider({
                clientId: process.env.SPOTIFY_CLIENT_ID!,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
                profile(profileData) {
                    return {
                        id: profileData.id,
                        name: profileData.display_name,
                        email: profileData.email,
                    }
                }
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!
            }),
            GitHubProvider({
                clientId: process.env.GITHUB_ID!,
                clientSecret: process.env.GITHUB_SECRET!
            }),
            CredentialsProvider(
                {
                    name: "Credentials",
                    credentials: {
                        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
                        password: { label: "Password", type: "password" }
                    },
                    async authorize(credentials) {
                        if (!credentials?.email || !credentials?.password)
                        {                            
                            return null;
                        }

                        const account = await prismaClient.user.findUnique({
                            where: {
                                email: credentials.email,
                            }
                        });

                        const isCorrectAccount = await bcrypt.compare(credentials.password, account?.passwordHash as string);
                        
                        if (!isCorrectAccount) {
                            return null;
                        }

                        return account;
                    }
                }
            )
        ],
        debug: process.env.NODE_ENV === "development",
    }
};