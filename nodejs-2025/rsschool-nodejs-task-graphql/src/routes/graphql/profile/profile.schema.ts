import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql/index.js';
import { IdField } from '../id/id.schema.js';
import { MemberType, MemberTypeId } from '../member-type/member-type.schema.js';
import { IContext } from '../types/context.js';
import { IProfile } from './profile.types.js';

const fields = {
  id: IdField,
  isMale: {
    type: new GraphQLNonNull(GraphQLBoolean),
  },
  yearOfBirth: {
    type: new GraphQLNonNull(GraphQLInt),
  },
  memberTypeId: {
    type: new GraphQLNonNull(MemberTypeId),
  },
  userId: IdField,
} as const;

export const Profile = new GraphQLObjectType<IProfile, IContext>({
  name: 'Profile',
  fields: {
    ...fields,
    memberType: {
      type: MemberType,
      resolve: async (parent, _args, { loaders }) => {
        return loaders.memberType.load(parent.memberTypeId);
      },
    },
  },
});

export const CreateProfileDto = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: fields.isMale,
    yearOfBirth: fields.yearOfBirth,
    userId: fields.userId,
    memberTypeId: fields.memberTypeId,
  },
});

export const ChangeProfileDto = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberTypeId: {
      type: MemberTypeId,
    },
  },
});
