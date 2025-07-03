import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IIdField } from '../../../interfaces/id-field.interface';
import {
  IAlbum,
  IAlbumCreate,
  IAlbumFilter,
} from '../../../models/album.model';
import { IAlbumRepository } from './album.repository.interface';

type AlbumRelationsUpdate = {
  artist?: {
    connect?: IIdField;
    disconnect?: boolean | IIdField;
  };
};

@Injectable()
export class AlbumPrismaRepository implements IAlbumRepository {
  constructor(protected readonly model: Prisma.AlbumDelegate) {}

  protected getRelationsUpdate(
    artistId?: string | null,
    updateOperation = true,
  ): AlbumRelationsUpdate {
    const update: AlbumRelationsUpdate = {};

    if (artistId) {
      update.artist = { connect: { id: artistId } };
    }

    if (!updateOperation) {
      return update;
    }

    if (artistId === null) {
      update.artist = { disconnect: true };
    }

    return update;
  }

  async existsById(id: string): Promise<boolean> {
    const artist = await this.findById(id);
    return !!artist;
  }

  async findAll(): Promise<IAlbum[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<IAlbum> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: IAlbumCreate): Promise<IAlbum> {
    return this.model.create({
      data: {
        name: data.name,
        year: data.year,
        ...this.getRelationsUpdate(data.artistId, false),
      },
    });
  }

  async updateById(
    id: string,
    updateData: IAlbumFilter,
  ): Promise<IAlbum | undefined> {
    return this.model.update({
      where: { id },
      data: {
        name: updateData.name,
        year: updateData.year,
        ...this.getRelationsUpdate(updateData.artistId),
      },
    });
  }

  async updateMany(
    filter: IAlbumFilter,
    updateData: IAlbumFilter,
  ): Promise<void> {
    if (updateData.artistId !== null) {
      await this.model.updateMany({
        where: filter,
        data: {
          name: updateData.name,
          year: updateData.year,
          ...this.getRelationsUpdate(updateData.artistId),
        },
      });
    }
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
