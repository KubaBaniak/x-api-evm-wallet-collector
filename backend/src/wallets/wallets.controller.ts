import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletAddress } from './dto/wallet-address.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Token } from 'src/auth/custom-decorators/token.decorator';
import { UserId } from 'src/auth/custom-decorators/userId.decorator';
import { UsersService } from 'src/users/users.service';
import { WALLET_ADDRESSES_FILENAME } from './constants';

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async linkWalletToUser(
    @Body() { address }: WalletAddress,
    @UserId() userId: string,
    @Token() accessToken: string,
  ): Promise<WalletResponse> {
    this.walletsService.isWalletAddressValid(address);
    const user = await this.userService.findOne(+userId);
    return this.walletsService.linkWalletToUser({
      address,
      twitterId: user.twitterId,
      token: accessToken,
    });
  }

  @Get()
  @Header(
    'Content-Disposition',
    `attachment; filename="${WALLET_ADDRESSES_FILENAME}.txt"`,
  )
  async downloadAllWallets(): Promise<StreamableFile> {
    const walletAddresses = await this.walletsService.getAllWallets();
    const fileToStream =
      await this.walletsService.downloadWalletAddresses(walletAddresses);
    return new StreamableFile(fileToStream, { type: 'txt' });
  }
}
