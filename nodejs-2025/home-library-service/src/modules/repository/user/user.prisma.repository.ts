import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { IUser, IUserCreate, IUserUpdate } from '../../../models/user.model';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(protected readonly model: Prisma.UserDelegate) {}

  protected convertUser(user?: User): IUser | undefined {
    if (!user) {
      return;
    }

    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async existsById(id: string): Promise<boolean> {
    const user = await this.model.findUnique({ where: { id } });
    return !!user;
  }

  async findAll(): Promise<IUser[]> {
    const users = await this.model.findMany();
    return users.map((user) => this.convertUser(user));
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.model.findUnique({ where: { id } });
    return this.convertUser(user);
  }

  async findOne(filter: IUserUpdate): Promise<IUser | undefined> {
    const user = await this.model.findFirst({ where: filter });
    return this.convertUser(user);
  }

  async create(data: IUserCreate): Promise<IUser> {
    const user = await this.model.create({ data });
    return this.convertUser(user);
  }

  async updateById(id: string, data: IUserUpdate): Promise<IUser | undefined> {
    const user = await this.model.update({
      where: { id },
      data: {
        ...data,
        version: { increment: 1 },
      },
    });

    return this.convertUser(user);
  }

  async updateMany(
    filter: IUserUpdate,
    updateData: IUserUpdate,
  ): Promise<void> {
    await this.model.updateMany({
      where: filter,
      data: {
        ...updateData,
        version: { increment: 1 },
      },
    });
  }

  async deleteById(id: string): Promise<boolean> {
    const isExist = await this.existsById(id);

    if (!isExist) {
      return false;
    }

    await this.model.delete({ where: { id } });
    return true;
  }
}
