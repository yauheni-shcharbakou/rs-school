import { Module } from '@nestjs/common';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { ARTIST_REPOSITORY } from '../repository/artist/artist.repository.constants';
import { FAVORITES_REPOSITORY } from '../repository/favorites/favorites.repository.constants';
import { RepositoryModule } from '../repository/repository.module';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    RepositoryModule.forFeature(
      ARTIST_REPOSITORY,
      TRACK_REPOSITORY,
      ALBUM_REPOSITORY,
      FAVORITES_REPOSITORY,
    ),
  ],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
