export interface IUser {
  id: string;
  name: string;
  password: string;
  wins: number;
}

export interface IUserPublic extends Omit<IUser, 'password'> {}

export interface IUserLoginData extends Pick<IUser, 'name' | 'password'> {}

export interface IUserWinData extends Pick<IUser, 'name' | 'wins'> {}
