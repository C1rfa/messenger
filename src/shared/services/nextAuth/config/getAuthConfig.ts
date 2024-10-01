import { NextAuthMiddlewareOptions } from "next-auth/middleware"

export const getAuthConfig = ():NextAuthMiddlewareOptions => {
    return {
        pages: {
            signIn: "/"
        }
    }
};