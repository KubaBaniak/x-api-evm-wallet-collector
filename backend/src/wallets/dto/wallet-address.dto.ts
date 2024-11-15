import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class WalletAddress {
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
}
