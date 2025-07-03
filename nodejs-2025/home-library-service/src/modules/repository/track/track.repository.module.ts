import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TrackPrismaRepository } from './track.prisma.repository';
import { TRACK_REPOSITORY } from './track.repository.constants';

@Module({
  providers: [
    PrismaService,
    {
      provide: TRACK_REPOSITORY,
      useFactory: (prismaService: PrismaService) => {
        return new TrackPrismaRepository(prismaService.track);
      },
      inject: [PrismaService],
    },
  ],
  exports: [TRACK_REPOSITORY],
})
export class TrackRepositoryModule {}
