import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { IdField } from './id/id.schema.js';
import { IIdField } from './id/id.types.js';
import { ChangePostDto, CreatePostDto, Post } from './post/post.schema.js';
import { IChangePost, ICreatePost } from './post/post.types.js';
import { ChangeProfileDto, CreateProfileDto, Profile } from './profile/profile.schema.js';
import { IChangeProfile, ICreateProfile } from './profile/profile.types.js';
import { IContext } from './types/context.js';
import { ChangeUserDto, CreateUserDto, User } from './user/user.schema.js';
import { IChangeUser, ICreateUser, ISubscriptionChange } from './user/user.types.js';

export const Mutations = new GraphQLObjectType<unknown, IContext>({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(User),
      args: { dto: { type: new GraphQLNonNull(CreateUserDto) } },
      resolve: async (_, { dto }: ICreateUser, { prisma }) => {
        return prisma.user.create({ data: dto });
      },
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: { dto: { type: new GraphQLNonNull(CreatePostDto) } },
      resolve: async (_, { dto }: ICreatePost, { prisma }) => {
        return prisma.post.create({ data: dto });
      },
    },
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: { dto: { type: new GraphQLNonNull(CreateProfileDto) } },
      resolve: async (_, { dto }: ICreateProfile, { prisma }) => {
        return prisma.profile.create({ data: dto });
      },
    },
    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: IdField,
        dto: { type: new GraphQLNonNull(ChangePostDto) },
      },
      resolve: async (_, { id, dto }: IChangePost, { prisma }) => {
        return prisma.post.update({ where: { id }, data: dto });
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: IdField,
        dto: { type: new GraphQLNonNull(ChangeProfileDto) },
      },
      resolve: async (_, { id, dto }: IChangeProfile, { prisma }) => {
        return prisma.profile.update({ where: { id }, data: dto });
      },
    },
    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: IdField,
        dto: { type: new GraphQLNonNull(ChangeUserDto) },
      },
      resolve: async (_, { id, dto }: IChangeUser, { prisma }) => {
        return prisma.user.update({ where: { id }, data: dto });
      },
    },
    deleteUser: {
      ...IdField,
      args: { id: IdField },
      resolve: async (_, { id }: IIdField, { prisma }) => {
        const result = await prisma.user.delete({ where: { id }, select: { id: true } });
        return result.id;
      },
    },
    deleteProfile: {
      ...IdField,
      args: { id: IdField },
      resolve: async (_, { id }: IIdField, { prisma }) => {
        const result = await prisma.profile.delete({
          where: { id },
          select: { id: true },
        });

        return result.id;
      },
    },
    deletePost: {
      ...IdField,
      args: { id: IdField },
      resolve: async (_, { id }: IIdField, { prisma }) => {
        const result = await prisma.post.delete({ where: { id }, select: { id: true } });
        return result.id;
      },
    },
    subscribeTo: {
      ...IdField,
      args: {
        userId: IdField,
        authorId: IdField,
      },
      resolve: async (_, { userId, authorId }: ISubscriptionChange, { prisma }) => {
        const result = await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId,
          },
          select: { subscriberId: true },
        });

        return result.subscriberId;
      },
    },
    unsubscribeFrom: {
      ...IdField,
      args: {
        userId: IdField,
        authorId: IdField,
      },
      resolve: async (_, { userId, authorId }: ISubscriptionChange, { prisma }) => {
        const result = await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId,
            },
          },
          select: { subscriberId: true },
        });

        return result.subscriberId;
      },
    },
  },
});
