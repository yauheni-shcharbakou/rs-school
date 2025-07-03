import { IIdField } from '../id/id.types.js';
import { IPost } from '../post/post.types.js';
import { IProfile } from '../profile/profile.types.js';

export interface IUser extends IIdField {
  name: string;
  balance: number;
  profile?: IProfile;
  posts: IPost[];
  userSubscribedTo: IUser[];
  subscribedToUser: IUser[];
}

export interface ICreateUser {
  dto: Pick<IUser, 'name' | 'balance'>;
}

export interface IChangeUser extends IIdField {
  dto: Partial<Pick<IUser, 'name' | 'balance'>>;
}

export interface ISubscriptionChange {
  userId: string;
  authorId: string;
}
