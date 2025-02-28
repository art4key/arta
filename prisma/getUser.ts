import { Prisma } from "@prisma/client";
import prisma from ".";

async function getUser(
    userId: string,
    options?: Omit<Prisma.UserFindUniqueArgs, "where">,
) {
    const user = await prisma.user.findUnique({
        where: { userId },
        ...options,
    });
    return user;
}

export default getUser;
