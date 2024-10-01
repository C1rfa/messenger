import { getAuthConfig } from "@/shared/services/nextAuth";

import withAuth from "next-auth/middleware";
import getConfig from "next/config";


export default withAuth(
    getAuthConfig()
);

export const config = getConfig();