"use client";

import { SessionProvider } from "next-auth/react";

interface ServerSessionProviderProps {
    children: React.ReactNode;
};

export const ServerSessionProvider: React.FC<ServerSessionProviderProps> = ({ children }) => {
    return (
        <SessionProvider>
            { children }
        </SessionProvider>
    );
};