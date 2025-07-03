import {
  DynamicModule,
  InjectionToken,
  InternalServerErrorException,
  Type,
} from '@nestjs/common';
import { ALBUM_REPOSITORY } from './album/album.repository.constants';
import { AlbumRepositoryModule } from './album/album.repository.module';
import { ARTIST_REPOSITORY } from './artist/artist.repository.constants';
import { ArtistRepositoryModule } from './artist/artist.repository.module';
import { FAVORITES_REPOSITORY } from './favorites/favorites.repository.constants';
import { FavoritesRepositoryModule } from './favorites/favorites.repository.module';
import { TRACK_REPOSITORY } from './track/track.repository.constants';
import { TrackRepositoryModule } from './track/track.repository.module';
import { USER_REPOSITORY } from './user/user.repository.constants';
import { UserRepositoryModule } from './user/user.repository.module';

export class RepositoryModule {
  private static readonly moduleById = new Map<InjectionToken, Type>([
    [USER_REPOSITORY, UserRepositoryModule],
    [TRACK_REPOSITORY, TrackRepositoryModule],
    [ALBUM_REPOSITORY, AlbumRepositoryModule],
    [ARTIST_REPOSITORY, ArtistRepositoryModule],
    [FAVORITES_REPOSITORY, FavoritesRepositoryModule],
  ]);

  static forFeature(
    ...repositoryInjectionTokens: InjectionToken[]
  ): DynamicModule {
    const repositoryModules = repositoryInjectionTokens.map((token) => {
      const repositoryModule = this.moduleById.get(token);

      if (!repositoryModule) {
        throw new InternalServerErrorException(
          `Invalid repository token: ${token.toString()}`,
        );
      }

      return repositoryModule;
    });

    return {
      module: RepositoryModule,
      imports: repositoryModules,
      exports: repositoryModules,
    };
  }
}
