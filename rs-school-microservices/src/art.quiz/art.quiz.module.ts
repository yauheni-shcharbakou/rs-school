import { Module } from '@nestjs/common'
import { ArtQuizController } from './art.quiz.controller'
import { ArtQuizService } from './art.quiz.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { ArtQuizUserModel } from './art.quiz.user.model'

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ArtQuizUserModel,
        schemaOptions: { collection: 'art-quiz-user' },
      },
    ]),
  ],
  controllers: [ArtQuizController],
  providers: [ArtQuizService],
})
export class ArtQuizModule {}
