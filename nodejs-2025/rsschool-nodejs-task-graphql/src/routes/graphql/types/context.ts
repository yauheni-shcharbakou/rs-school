import { MemberType, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IPost } from '../post/post.types.js';
import { IProfile } from '../profile/profile.types.js';
import { IUser } from '../user/user.types.js';

export interface ILoaders {
  memberType: DataLoader<string, MemberType>;
  post: DataLoader<string, IPost[]>;
  profile: DataLoader<string, IProfile | undefined>;
  subscription: DataLoader<string, IUser[]>;
  subscriber: DataLoader<string, IUser[]>;
}

export interface IContext {
  prisma: PrismaClient;
  loaders: ILoaders;
}
