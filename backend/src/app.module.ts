import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TwitterModule } from './twitter/twitter.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    AuthModule,
    TwitterModule,
    ConfigModule.forRoot(),
    UsersModule,
    WalletsModule,
  ],
})
export class AppModule {}
