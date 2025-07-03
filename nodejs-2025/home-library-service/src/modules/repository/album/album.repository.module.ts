import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AlbumPrismaRepository } from './album.prisma.repository';
import { ALBUM_REPOSITORY } from './album.repository.constants';

@Module({
  providers: [
    PrismaService,
    {
      provide: ALBUM_REPOSITORY,
      useFactory: (prismaService: PrismaService) => {
        return new AlbumPrismaRepository(prismaService.album);
      },
      inject: [PrismaService],
    },
  ],
  exports: [ALBUM_REPOSITORY],
})
export class AlbumRepositoryModule {}
