import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { IdField } from './id/id.schema.js';
import { IIdField } from './id/id.types.js';
import { MemberTypeEnum } from './member-type/member-type.enums.js';
import { MemberType, MemberTypeId } from './member-type/member-type.schema.js';
import { Post } from './post/post.schema.js';
import { Profile } from './profile/profile.schema.js';
import { IContext } from './types/context.js';
import { User } from './user/user.schema.js';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { IUser } from './user/user.types.js';

export const RootQueryType = new GraphQLObjectType<unknown, IContext>({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_parent, _args, { prisma }) => {
        return prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: async (_parent, { id }: { id: MemberTypeEnum }, { prisma }) => {
        return prisma.memberType.findUnique({ where: { id } });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (_parent, _args, { prisma }) => {
        return prisma.post.findMany();
      },
    },
    post: {
      type: Post,
      args: { id: IdField },
      resolve: async (_parent, { id }: IIdField, { prisma }) => {
        return prisma.post.findUnique({ where: { id } });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async (_parent, _args, { prisma }) => {
        return prisma.profile.findMany();
      },
    },
    profile: {
      type: Profile,
      args: { id: IdField },
      resolve: async (_parent, { id }: IIdField, { prisma }) => {
        return prisma.profile.findUnique({ where: { id } });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (_parent, _args, { prisma, loaders }, resolveInfo) => {
        const info = parseResolveInfo(resolveInfo) as ResolveTree;
        const fragment = simplifyParsedResolveInfoFragmentWithType(
          info,
          new GraphQLNonNull(User),
        );

        const include = {
          userSubscribedTo: !!fragment?.fields?.['userSubscribedTo'],
          subscribedToUser: !!fragment?.fields?.['subscribedToUser'],
        };

        const users = await prisma.user.findMany({ include });

        const userById = new Map(
          users.map((user) => [user.id, user as unknown as IUser]),
        );

        const emptyArraysPreset: [string, IUser[]][] = Array.from(
          userById.keys(),
          (userId) => [userId, [] as IUser[]],
        );

        const subscribersByUser = new Map(emptyArraysPreset);
        const subscriptionsByUser = new Map(emptyArraysPreset);

        for (const user of users) {
          (user.userSubscribedTo ?? []).forEach(({ authorId, subscriberId }) => {
            const subscriptions = subscriptionsByUser.get(subscriberId) ?? [];
            const author = userById.get(authorId);

            if (author) {
              subscriptions.push(author);
              subscriptionsByUser.set(user.id, subscriptions);
            }
          });

          (user.subscribedToUser ?? []).forEach(({ authorId, subscriberId }) => {
            const subscribers = subscribersByUser.get(authorId) ?? [];
            const subscriber = userById.get(subscriberId);

            if (subscriber) {
              subscribers.push(subscriber);
              subscribersByUser.set(authorId, subscribers);
            }
          });
        }

        for (const [user, subscriptions] of subscriptionsByUser.entries()) {
          loaders.subscription.prime(user, subscriptions);
        }

        for (const [user, subscribers] of subscribersByUser.entries()) {
          loaders.subscriber.prime(user, subscribers);
        }

        return users;
      },
    },
    user: {
      type: User,
      args: { id: IdField },
      resolve: async (_parent, { id }: IIdField, { prisma }) => {
        return prisma.user.findUnique({ where: { id } });
      },
    },
  },
});
