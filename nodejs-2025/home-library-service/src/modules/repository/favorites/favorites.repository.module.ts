import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FavoritesPrismaRepository } from './favorites.prisma.repository';
import { FAVORITES_REPOSITORY } from './favorites.repository.constants';

@Module({
  providers: [
    PrismaService,
    {
      provide: FAVORITES_REPOSITORY,
      useFactory: (prismaService: PrismaService) => {
        return new FavoritesPrismaRepository(prismaService.favorites);
      },
      inject: [PrismaService],
    },
  ],
  exports: [FAVORITES_REPOSITORY],
})
export class FavoritesRepositoryModule {}
