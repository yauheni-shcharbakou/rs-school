import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index.js';
import { IdField } from '../id/id.schema.js';
import { IPost } from './post.types.js';

const fields = {
  id: IdField,
  title: {
    type: new GraphQLNonNull(GraphQLString),
  },
  content: {
    type: new GraphQLNonNull(GraphQLString),
  },
  authorId: IdField,
} as const;

export const Post = new GraphQLObjectType<IPost>({ name: 'Post', fields });

export const CreatePostDto = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: fields.title,
    content: fields.content,
    authorId: fields.authorId,
  },
});

export const ChangePostDto = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  },
});
