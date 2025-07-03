import { Inject, Injectable } from '@nestjs/common';
import {
  IUser,
  IUserCreate,
  IUserUpdatePassword,
} from '../../models/user.model';
import { BaseService } from '../../services/base.service';
import { CryptoService } from '../crypto/crypto.service';
import { USER_REPOSITORY } from '../repository/user/user.repository.constants';
import { IUserRepository } from '../repository/user/user.repository.interface';

@Injectable()
export class UserService extends BaseService<IUser, IUserCreate> {
  constructor(
    @Inject(USER_REPOSITORY) protected readonly repository: IUserRepository,
    private readonly cryptoService: CryptoService,
  ) {
    super();
  }

  async create(data: IUserCreate): Promise<IUser> {
    return super.create({
      ...data,
      password: await this.cryptoService.hash(data.password),
    });
  }

  async updatePassword(id: string, data: IUserUpdatePassword) {
    const errors = {
      notFound: false,
      invalidPassword: false,
    };

    const user = await this.repository.findById(id);

    if (!user) {
      errors.notFound = true;
      return { errors };
    }

    const isOldPasswordValid = await this.cryptoService.compare(
      data.oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      errors.invalidPassword = true;
      return { errors };
    }

    const updatedUser = await this.repository.updateById(user.id, {
      password: await this.cryptoService.hash(data.newPassword),
    });

    return { errors, updatedUser };
  }
}
