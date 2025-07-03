import { IIdField } from '../id/id.types.js';

export interface IPost extends IIdField {
  title: string;
  content: string;
  authorId: string;
}

export interface ICreatePost {
  dto: Omit<IPost, 'id'>;
}

export interface IChangePost extends IIdField {
  dto: Partial<Pick<IPost, 'title' | 'content'>>;
}
