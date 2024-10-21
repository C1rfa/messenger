import { NextResponse } from "next/server";
import { prismaClient } from "@/shared/services/prisma";
import bcrypt from "bcrypt";



export const POST = async (request: Request) => {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password)
    {
        return new NextResponse("Some information, required for profile regestration, is missing", { status: 400 });   
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const profile = await prismaClient.user.create(
        {
            data: {
                name,
                email,
                passwordHash
            }
        }
    );

    return NextResponse.json(profile);
};