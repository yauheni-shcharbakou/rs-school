import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IProfile } from './profile.types.js';

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (userIds: readonly string[]) => {
    const profiles = (await prisma.profile.findMany({
      where: {
        userId: { in: [...userIds] },
      },
    })) as IProfile[];

    const profileByUser = new Map(profiles.map((profile) => [profile.userId, profile]));
    return userIds.map((userId) => profileByUser.get(userId));
  });
};
