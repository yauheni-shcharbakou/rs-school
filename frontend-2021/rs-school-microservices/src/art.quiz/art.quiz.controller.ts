import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ArtQuizService } from 'src/art.quiz/art.quiz.service'
import { ArtQuizUserModel } from 'src/art.quiz/art.quiz.user.model'
import { ArtQuizUserDto } from 'src/art.quiz/art.quiz.user.dto'

@Controller('art-quiz/api')
export class ArtQuizController {
  constructor(private readonly userService: ArtQuizService) {}

  @Get()
  async getAll(): Promise<ArtQuizUserModel[]> {
    return this.userService.getAll()
  }

  @Post()
  async register(@Query('nickname') nickname: string): Promise<string> {
    return this.userService.register(nickname)
  }

  @Patch()
  async update(@Body() dto: ArtQuizUserDto): Promise<boolean> {
    return this.userService.updateUser(dto)
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<boolean> {
    return this.userService.delete(id)
  }
}
