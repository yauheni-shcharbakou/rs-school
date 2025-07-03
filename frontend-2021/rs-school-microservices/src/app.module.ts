import { resolve } from 'path'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'

import { getMongoConfig } from 'src/configs/mongo.config'
import { ArtQuizModule } from 'src/art.quiz/art.quiz.module'
import { AppController } from 'src/app.controller'
import { AppService } from 'src/app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'public'),
    }),
    ArtQuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
