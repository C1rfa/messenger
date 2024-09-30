import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaClient: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prismaClient = globalThis.prismaClient ?? prismaClientSingleton();

export default prismaClient;

if (process.env.NODE_ENV !== 'production') globalThis.prismaClient = prismaClient;