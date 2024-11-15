import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserResponse } from './dto/user-response.dto';
import { Validator } from 'class-validator';
import { UserTwitterData } from 'src/twitter/types/user-data';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async isValid(user: UserTwitterData): Promise<boolean> {
    const validator = new Validator();
    const errors = await validator.validate(user);

    return errors.length === 0;
  }

  async create(userTwitterData: UserTwitterData): Promise<UserResponse> {
    const isValid = await this.isValid(userTwitterData);

    if (!isValid) {
      throw new BadRequestException();
    }

    const existingUser = await this.findOneByTwitterId(userTwitterData.id);
    if (existingUser) {
      return existingUser;
    }
    const correctedUserDto = {
      twitterId: userTwitterData.id,
      name: userTwitterData.name,
      username: userTwitterData.username,
    };
    return this.usersRepository.create(correctedUserDto);
  }

  findOne(userId: number): Promise<UserResponse> {
    return this.usersRepository.findOne(userId);
  }

  findOneByTwitterId(twitterId: string): Promise<UserResponse> {
    return this.usersRepository.findOneByTwitterId(twitterId);
  }

  findAll(): Promise<UserResponse[]> {
    return this.usersRepository.findAll();
  }
}
