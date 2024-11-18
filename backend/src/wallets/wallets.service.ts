import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WalletsRepository } from './wallets.repository';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { TwitterService } from 'src/twitter/twitter.service';
import { ACCOUNT_TO_FOLLOW } from 'src/twitter/constants';
import { UsersService } from 'src/users/users.service';
import { LinkWalletObject } from './dto/link-wallet';
import { WalletAddress } from './dto/wallet-address.dto';
import { createReadStream, promises as fsPromises } from 'fs';
import { WALLET_ADDRESSES_FILENAME } from './constants';
import { join } from 'path';
import { isAddress } from 'web3-validator';

@Injectable()
export class WalletsService {
  constructor(
    private readonly walletsRepository: WalletsRepository,
    private readonly twitterService: TwitterService,
    private readonly userService: UsersService,
  ) {}

  isWalletAddressValid(address: string): void {
    const isValid = isAddress(address);
    if (!isValid) {
      throw new BadRequestException(
        'Wrong address format - please use EVM wallet with checksum',
      );
    }
  }

  create(createWalletDto: CreateWalletDto): Promise<WalletResponse> {
    return this.walletsRepository.create(createWalletDto);
  }

  async findWallet(userId: number): Promise<WalletResponse | undefined> {
    const userWallet = await this.walletsRepository.findOne(userId);
    if (!userWallet) {
      throw new NotFoundException();
    }

    return userWallet;
  }

  async getAllWallets(): Promise<WalletResponse[]> {
    return this.walletsRepository.findAll();
  }

  async linkWalletToUser(
    linkWalletObject: LinkWalletObject,
  ): Promise<WalletResponse> {
    const user = await this.userService.findOneByTwitterId(
      linkWalletObject.twitterId,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.wallet) {
      throw new BadRequestException('User already registered wallet ');
    }

    const wallet = await this.walletsRepository.findOne(user.id);
    if (wallet) {
      throw new ConflictException('Wallet address already in use');
    }

    const isFollowingTargetUser = await this.twitterService.isFollowingAccount(
      linkWalletObject.token,
    );

    if (!isFollowingTargetUser) {
      throw new BadRequestException(
        `User does not follow ${ACCOUNT_TO_FOLLOW}`,
      );
    }

    return this.create({
      address: linkWalletObject.address,
      userId: user.id,
    });
  }

  async downloadWalletAddresses(
    walletAddresses: WalletAddress[],
  ): Promise<NodeJS.ReadableStream> {
    const formattedWalletAddresses = walletAddresses
      .map((wallet) => wallet.address)
      .join('\n');

    const fullFilename = `${WALLET_ADDRESSES_FILENAME}.txt`;

    try {
      await fsPromises.writeFile(
        fullFilename,
        formattedWalletAddresses,
        'utf8',
      );

      return createReadStream(join(process.cwd(), fullFilename));
    } catch {
      throw new InternalServerErrorException(
        'Failed to download wallet addresses',
      );
    }
  }
}
