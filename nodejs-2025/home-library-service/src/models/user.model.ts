import { IIdField } from '../interfaces/id-field.interface';

export interface IUser extends IIdField {
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IUserCreate extends Pick<IUser, 'login' | 'password'> {}

export interface IUserUpdate extends Partial<IUserCreate> {}

export interface IUserUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
