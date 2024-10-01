
import { ToastMessageProvider } from "@/app/providers/ToastMessageProvider";
import { Inter } from "next/font/google";

import "@/app/styles/globals.css";
import { ServerSessionProvider } from "@/app/providers/ServerSessionProvider";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html>
      <body className={inter.className}>
        <ToastMessageProvider />
        <ServerSessionProvider>
          {children}
        </ServerSessionProvider>
      </body>
    </html>
  );
}
