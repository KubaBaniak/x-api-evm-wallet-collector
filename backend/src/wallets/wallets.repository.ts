import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWalletDto: CreateWalletDto): Promise<WalletResponse> {
    return this.prismaService.eVMWallet.create({ data: createWalletDto });
  }

  findAll(): Promise<WalletResponse[]> {
    return this.prismaService.eVMWallet.findMany();
  }

  findOneByAddress(address: string): Promise<WalletResponse | undefined> {
    return this.prismaService.eVMWallet.findFirst({ where: { address } });
  }
}
