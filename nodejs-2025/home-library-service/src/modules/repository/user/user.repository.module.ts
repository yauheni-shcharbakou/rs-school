import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserPrismaRepository } from './user.prisma.repository';
import { USER_REPOSITORY } from './user.repository.constants';

@Module({
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService.user);
      },
      inject: [PrismaService],
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserRepositoryModule {}
