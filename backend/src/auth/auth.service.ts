import { BadRequestException, Injectable } from '@nestjs/common';
import { TwitterTokenResponse } from './auth.dto';
import { TWITTER_API_TOKEN, TWITTER_REDIRECT_URI } from './constants';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateOneTimeToken(accessToken: string): Promise<string> {
    return this.jwtService.signAsync({ accessToken }, { expiresIn: 5 * 60 });
  }

  async generateLongLivedToken(
    accessToken: string,
    userId: number,
  ): Promise<string> {
    return this.jwtService.signAsync({ accessToken, userId });
  }

  async getTwitterTokenFromAuthCode(
    authCode: string,
  ): Promise<TwitterTokenResponse> {
    const clientId = this.configService.get<string>('TWITTER_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'TWITTER_CLIENT_SECRET',
    );

    if (!clientId || !clientSecret) {
      throw new BadRequestException(
        'Twitter client credentials are not configured.',
      );
    }

    const data = new URLSearchParams({
      code: authCode,
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: TWITTER_REDIRECT_URI,
      code_verifier: 'challenge',
    });

    try {
      const response = await axios.post(TWITTER_API_TOKEN, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      });

      return new TwitterTokenResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        throw new BadRequestException(
          `Failed to exchange auth code for token: ${error.response?.data?.error || error.message}`,
        );
      }
      throw new BadRequestException(
        'An unexpected error occurred while retrieving the token.',
      );
    }
  }
}
