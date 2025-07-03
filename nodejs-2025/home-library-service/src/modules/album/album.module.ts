import { Module } from '@nestjs/common';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { ARTIST_REPOSITORY } from '../repository/artist/artist.repository.constants';
import { FAVORITES_REPOSITORY } from '../repository/favorites/favorites.repository.constants';
import { RepositoryModule } from '../repository/repository.module';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [
    RepositoryModule.forFeature(
      ALBUM_REPOSITORY,
      TRACK_REPOSITORY,
      ARTIST_REPOSITORY,
      FAVORITES_REPOSITORY,
    ),
  ],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
