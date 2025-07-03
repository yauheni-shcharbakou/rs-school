import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IUser } from './user.types.js';

export const subscriptionLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (subscriberIds: readonly string[]) => {
    const subscriptions = await prisma.subscribersOnAuthors.findMany({
      where: {
        subscriberId: { in: [...subscriberIds] },
      },
      select: {
        subscriberId: true,
        author: true,
      },
    });

    const subscriptionsBySubscriber = new Map(
      subscriptions.reduce((acc: Map<string, IUser[]>, { subscriberId, author }) => {
        const subscriptions = acc.get(subscriberId) ?? [];
        subscriptions.push(author as IUser);
        acc.set(subscriberId, subscriptions);
        return acc;
      }, new Map()),
    );

    return subscriberIds.map(
      (subscriberId) => subscriptionsBySubscriber.get(subscriberId) ?? [],
    );
  });
};

export const subscriberLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (authorIds: readonly string[]) => {
    const subscribers = await prisma.subscribersOnAuthors.findMany({
      where: {
        authorId: { in: [...authorIds] },
      },
      select: {
        authorId: true,
        subscriber: true,
      },
    });

    const subscribersByAuthor = new Map(
      subscribers.reduce((acc: Map<string, IUser[]>, { authorId, subscriber }) => {
        const subscribers = acc.get(authorId) ?? [];
        subscribers.push(subscriber as IUser);
        acc.set(authorId, subscribers);
        return acc;
      }, new Map()),
    );

    return authorIds.map((authorId) => subscribersByAuthor.get(authorId) ?? []);
  });
};
