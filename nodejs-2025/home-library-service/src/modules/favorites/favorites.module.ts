import { Module } from '@nestjs/common';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { ARTIST_REPOSITORY } from '../repository/artist/artist.repository.constants';
import { FAVORITES_REPOSITORY } from '../repository/favorites/favorites.repository.constants';
import { RepositoryModule } from '../repository/repository.module';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    RepositoryModule.forFeature(
      FAVORITES_REPOSITORY,
      ALBUM_REPOSITORY,
      TRACK_REPOSITORY,
      ARTIST_REPOSITORY,
    ),
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
