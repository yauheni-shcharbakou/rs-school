import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index.js';
import { IdField } from '../id/id.schema.js';
import { Post } from '../post/post.schema.js';
import { Profile } from '../profile/profile.schema.js';
import { IContext } from '../types/context.js';
import { IUser } from './user.types.js';

const fields = {
  id: IdField,
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  balance: {
    type: new GraphQLNonNull(GraphQLFloat),
  },
} as const;

export const User: GraphQLObjectType<IUser> = new GraphQLObjectType<IUser, IContext>({
  name: 'User',
  fields: () => {
    return {
      ...fields,
      profile: {
        type: Profile,
        resolve: async (parent, _args, { loaders }) => {
          return loaders.profile.load(parent.id);
        },
      },
      posts: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
        resolve: async (parent, _args, { loaders }) => {
          return loaders.post.load(parent.id);
        },
      },
      userSubscribedTo: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
        resolve: async (parent, _args, { loaders }) => {
          return loaders.subscription.load(parent.id);
        },
      },
      subscribedToUser: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
        resolve: async (parent, _args, { loaders }) => {
          return loaders.subscriber.load(parent.id);
        },
      },
    };
  },
});

export const CreateUserDto = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: fields.name,
    balance: fields.balance,
  },
});

export const ChangeUserDto = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  },
});
