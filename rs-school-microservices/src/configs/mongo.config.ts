import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'
import { LOCAL_DB_URL } from '../shared/constants'

export const getMongoConfig = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => {
  return {
    uri: configService.get('MONGO_URI') || LOCAL_DB_URL,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}
