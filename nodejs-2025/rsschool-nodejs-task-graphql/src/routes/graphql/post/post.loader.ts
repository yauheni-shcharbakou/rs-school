import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IPost } from './post.types.js';

export const postLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (authorIds: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: [...authorIds] },
      },
    });

    const postsByAuthor = new Map(
      posts.reduce((acc: Map<string, IPost[]>, post) => {
        const posts = acc.get(post.authorId) ?? [];
        posts.push(post);
        acc.set(post.authorId, posts);
        return acc;
      }, new Map()),
    );

    return authorIds.map((authorId) => postsByAuthor.get(authorId) ?? []);
  });
};
