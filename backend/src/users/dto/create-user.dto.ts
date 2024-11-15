import { IsNumberString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumberString()
  twitterId: string;

  @IsString()
  name: string;

  @IsString()
  username: string;
}
