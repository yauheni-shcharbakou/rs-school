import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { ArtQuizUserModel } from './art.quiz.user.model'
import { ArtQuizUserDto } from './art.quiz.user.dto'

@Injectable()
export class ArtQuizService {
  private readonly defaultAnswers: number[] = [...Array(12).keys()].map(() => 0)

  constructor(
    @InjectModel(ArtQuizUserModel)
    private readonly userModel: ModelType<ArtQuizUserModel>
  ) {}

  async getAll(): Promise<ArtQuizUserModel[]> {
    return this.userModel.find().lean()
  }

  async register(nickname: string): Promise<string> {
    const newUser = await this.userModel.create({
      nickname,
      painters: this.defaultAnswers,
      images: this.defaultAnswers,
    })

    return newUser.id.toString()
  }

  async updateUser({ id, painters, images }: ArtQuizUserDto) {
    await this.userModel.findByIdAndUpdate(id, { painters, images })
    return true
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id)
    return true
  }
}
