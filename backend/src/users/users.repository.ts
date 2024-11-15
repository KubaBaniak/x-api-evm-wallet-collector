import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { UserResponse } from './dto/user-response.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll(): Promise<UserResponse[]> {
    return this.prisma.user.findMany();
  }

  findOne(userId: number): Promise<UserResponse> {
    return this.prisma.user.findFirst({ where: { id: userId } });
  }

  findOneByTwitterId(twitterId: string): Promise<UserResponse> {
    return this.prisma.user.findFirst({
      where: { twitterId },
      include: { wallet: { select: { address: true } } },
    });
  }
}
