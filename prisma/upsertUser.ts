import type { User } from "@prisma/client";
import prisma from ".";

interface UserUpdateData {
    displayname: string;
    username: string;
    experienceIncrement?: number;
}

async function upsertUser(userId: string, data: UserUpdateData): Promise<User> {
    return prisma.$transaction(async (tx) => {
        const user = await tx.user.upsert({
            where: { userId },
            update: {
                experience: { increment: data.experienceIncrement ?? 0 },
                displayname: data.displayname,
                username: data.username,
            },
            create: {
                userId,
                displayname: data.displayname,
                username: data.username,
                experience: data.experienceIncrement ?? 0,
            },
        });

        if (user.experience >= user.requiredExperience) {
            const newRequiredExperience = Math.floor(
                user.requiredExperience * 1.2,
            );
            return tx.user.update({
                where: { userId },
                data: {
                    level: { increment: 1 },
                    experience: 0,
                    requiredExperience: newRequiredExperience,
                },
            });
        }

        return user;
    });
}

export default upsertUser;
