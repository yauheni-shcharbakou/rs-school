import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  IArtist,
  IArtistCreate,
  IArtistFilter,
} from '../../../models/artist.model';
import { IArtistRepository } from './artist.repository.interface';

@Injectable()
export class ArtistPrismaRepository implements IArtistRepository {
  constructor(protected readonly model: Prisma.ArtistDelegate) {}

  async existsById(id: string): Promise<boolean> {
    const album = await this.findById(id);
    return !!album;
  }

  async findAll(): Promise<IArtist[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<IArtist> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: IArtistCreate): Promise<IArtist> {
    return this.model.create({ data });
  }

  async updateById(
    id: string,
    data: IArtistFilter,
  ): Promise<IArtist | undefined> {
    return this.model.update({ where: { id }, data });
  }

  async updateMany(
    filter: IArtistFilter,
    updateData: IArtistFilter,
  ): Promise<void> {
    await this.model.updateMany({ where: filter, data: updateData });
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
