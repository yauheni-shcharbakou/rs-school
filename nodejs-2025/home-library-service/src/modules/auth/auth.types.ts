import { IUser } from '../../models/user.model';

export interface IAuthRefresh {
  refreshToken: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthJwtPayload {
  userId: string;
  login: string;
}

export interface IAuthLoginResult extends IUser, IAuthTokens {}
