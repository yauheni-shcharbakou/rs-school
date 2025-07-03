import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IIdField } from '../../../interfaces/id-field.interface';
import {
  ITrack,
  ITrackCreate,
  ITrackFilter,
} from '../../../models/track.model';
import { ITrackRepository } from './track.repository.interface';

type TrackRelationsUpdate = {
  artist?: {
    connect?: IIdField;
    disconnect?: boolean | IIdField;
  };
  album?: {
    connect?: IIdField;
    disconnect?: boolean | IIdField;
  };
};

@Injectable()
export class TrackPrismaRepository implements ITrackRepository {
  constructor(protected readonly model: Prisma.TrackDelegate) {}

  protected getRelationsUpdate(
    artistId?: string | null,
    albumId?: string | null,
    updateOperation = true,
  ): TrackRelationsUpdate {
    const update: TrackRelationsUpdate = {};

    if (artistId) {
      update.artist = { connect: { id: artistId } };
    }

    if (albumId) {
      update.album = { connect: { id: albumId } };
    }

    if (!updateOperation) {
      return update;
    }

    if (artistId === null) {
      update.artist = { disconnect: true };
    }

    if (albumId === null) {
      update.album = { disconnect: true };
    }

    return update;
  }

  async existsById(id: string): Promise<boolean> {
    const artist = await this.findById(id);
    return !!artist;
  }

  async findAll(): Promise<ITrack[]> {
    return this.model.findMany();
  }

  async findById(id: string): Promise<ITrack> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: ITrackCreate): Promise<ITrack> {
    return this.model.create({
      data: {
        name: data.name,
        duration: data.duration,
        ...this.getRelationsUpdate(data.artistId, data.albumId, false),
      },
    });
  }

  async updateById(
    id: string,
    updateData: ITrackFilter,
  ): Promise<ITrack | undefined> {
    return this.model.update({
      where: { id },
      data: {
        name: updateData.name,
        duration: updateData.duration,
        ...this.getRelationsUpdate(updateData.artistId, updateData.albumId),
      },
    });
  }

  async updateMany(
    filter: ITrackFilter,
    updateData: ITrackFilter,
  ): Promise<void> {
    if (!updateData.albumId && !updateData.artistId) {
      await this.model.updateMany({ where: filter, data: updateData });
      return;
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
