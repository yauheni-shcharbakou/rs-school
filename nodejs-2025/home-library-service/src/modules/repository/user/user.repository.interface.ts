import { IUser, IUserCreate, IUserUpdate } from '../../../models/user.model';
import { IBaseRepository } from '../base/base.repository.interface';

export interface IUserRepository
  extends IBaseRepository<IUser, IUserCreate, IUserUpdate, IUserUpdate> {
  findOne(filter: IUserUpdate): Promise<IUser | undefined>;
}
