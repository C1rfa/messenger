import { getAuthOptions } from "@/shared/services/nextAuth";
import NextAuth from "next-auth";


const handler = NextAuth(
    getAuthOptions()
);

export { handler as GET, handler as POST };