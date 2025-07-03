import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ArtistPrismaRepository } from './artist.prisma.repository';
import { ARTIST_REPOSITORY } from './artist.repository.constants';

@Module({
  providers: [
    PrismaService,
    {
      provide: ARTIST_REPOSITORY,
      useFactory: (prismaService: PrismaService) => {
        return new ArtistPrismaRepository(prismaService.artist);
      },
      inject: [PrismaService],
    },
  ],
  exports: [ARTIST_REPOSITORY],
})
export class ArtistRepositoryModule {}
