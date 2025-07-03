import { prop } from '@typegoose/typegoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

export interface ArtQuizUserModel extends Base {}

export class ArtQuizUserModel extends TimeStamps {
  @prop({ unique: true })
  nickname: string

  @prop({ type: () => [Number] })
  painters: number[]

  @prop({ type: () => [Number] })
  images: number[]
}
