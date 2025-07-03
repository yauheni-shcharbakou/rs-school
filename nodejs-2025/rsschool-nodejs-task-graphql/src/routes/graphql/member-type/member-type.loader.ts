import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: {
        id: { in: [...ids] },
      },
    });

    const profileById = new Map(
      memberTypes.map((memberType) => [memberType.id, memberType]),
    );

    return ids.map((id) => profileById.get(id)!);
  });
};
