import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { memberTypeLoader } from './member-type/member-type.loader.js';
import { postLoader } from './post/post.loader.js';
import { profileLoader } from './profile/profile.loader.js';
import { createGqlResponseSchema, gqlResponseSchema, MainSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { ILoaders } from './types/context.js';
import { subscriberLoader, subscriptionLoader } from './user/user.loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler({ body }) {
      const query = parse(body.query);
      const validationResult = validate(MainSchema, query, [depthLimit(5)]);

      if (validationResult?.length) {
        return { errors: validationResult };
      }

      const loaders: ILoaders = {
        memberType: memberTypeLoader(prisma),
        post: postLoader(prisma),
        profile: profileLoader(prisma),
        subscriber: subscriberLoader(prisma),
        subscription: subscriptionLoader(prisma),
      };

      return graphql({
        schema: MainSchema,
        source: body.query,
        variableValues: body.variables,
        contextValue: { prisma, loaders },
      });
    },
  });
};

export default plugin;
