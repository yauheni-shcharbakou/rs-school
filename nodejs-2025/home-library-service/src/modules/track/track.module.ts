import { Module } from '@nestjs/common';
import { ALBUM_REPOSITORY } from '../repository/album/album.repository.constants';
import { ARTIST_REPOSITORY } from '../repository/artist/artist.repository.constants';
import { FAVORITES_REPOSITORY } from '../repository/favorites/favorites.repository.constants';
import { RepositoryModule } from '../repository/repository.module';
import { TRACK_REPOSITORY } from '../repository/track/track.repository.constants';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    RepositoryModule.forFeature(
      TRACK_REPOSITORY,
      ALBUM_REPOSITORY,
      ARTIST_REPOSITORY,
      FAVORITES_REPOSITORY,
    ),
  ],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
