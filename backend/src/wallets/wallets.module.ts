import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { PrismaService } from '../prisma.service';
import { WalletsRepository } from './wallets.repository';
import { UsersService } from '../users/users.service';
import { TwitterService } from '../twitter/twitter.service';
import { UsersRepository } from '../users/users.repository';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [WalletsController],
  providers: [
    WalletsService,
    PrismaService,
    WalletsRepository,
    UsersService,
    UsersRepository,
    TwitterService,
  ],
  exports: [WalletsService],
})
export class WalletsModule {}
