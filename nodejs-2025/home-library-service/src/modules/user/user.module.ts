import { Module } from '@nestjs/common';
import { CryptoModule } from '../crypto/crypto.module';
import { RepositoryModule } from '../repository/repository.module';
import { USER_REPOSITORY } from '../repository/user/user.repository.constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CryptoModule, RepositoryModule.forFeature(USER_REPOSITORY)],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
