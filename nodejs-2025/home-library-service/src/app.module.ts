import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppExceptionFilter } from './filters/exception.filter';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AuthModule } from './modules/auth/auth.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { LoggingModule } from './modules/logging/logging.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AlbumModule,
    ArtistModule,
    AuthModule,
    FavoritesModule,
    LoggingModule,
    TrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
