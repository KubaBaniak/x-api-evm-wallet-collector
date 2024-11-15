import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @MaxLength(40)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
