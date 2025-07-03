import { Module } from '@nestjs/common'
import { ArtQuizController } from 'src/art.quiz/art.quiz.controller'
import { ArtQuizService } from 'src/art.quiz/art.quiz.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { ArtQuizUserModel } from 'src/art.quiz/art.quiz.user.model'

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
