import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ACCOUNT_TO_FOLLOW } from './constants';
import { UserTwitterData } from './types/user-data';

@Injectable()
export class TwitterService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrentUserData(token: string): Promise<UserTwitterData> {
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://api.x.com/2/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      if (response.status !== 200) {
        throw new UnauthorizedException();
      }
      return response.data.data;
    } catch (error) {
      const statusCode = error.status || 500;
      const message = error.response?.data?.title || 'Unexpected error';
      throw new HttpException(message + ' - retreiving user data', statusCode);
    }
  }

  async isFollowingAccount(token: string): Promise<boolean> {
    console.log(token);
    try {
      const url = `https://api.twitter.com/2/users/by/username/${ACCOUNT_TO_FOLLOW}`;
      const urlParams = new URLSearchParams({
        'user.fields': 'connection_status',
      });
      const fullUrl = `${url}?${urlParams.toString()}`;

      const response = await lastValueFrom(
        this.httpService.get(fullUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      if (response.status !== 200) {
        throw new UnauthorizedException(
          `API returned status: ${response.status}`,
        );
      }

      return (
        response.data.data.connection_status.includes('following') === true
      );
    } catch (error) {
      console.log(error.response.data);
      throw new HttpException(error.message, error.status);
    }
  }
}
