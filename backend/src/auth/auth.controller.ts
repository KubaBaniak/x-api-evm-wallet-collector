import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { TwitterService } from 'src/twitter/twitter.service';
import { JwtResponse } from './dto/jwt-response';
import { AuthGuard } from './guards/auth.guard';
import { Token } from './custom-decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly twitterService: TwitterService,
  ) {}

  @Post('oauth/callback')
  async exchangeAuthCode(
    @Body() authCodeDto: { authCode: string },
  ): Promise<JwtResponse> {
    const tokenResponse = await this.authService.getTwitterTokenFromAuthCode(
      authCodeDto.authCode,
    );

    const jwtToken = await this.authService.generateOneTimeToken(
      tokenResponse.access_token,
    );
    return new JwtResponse(jwtToken);
  }

  @UseGuards(AuthGuard)
  @Post('validate/ott')
  async validateOneTimeToken(@Token() accessToken: string) {
    const twitterUserData =
      await this.twitterService.getCurrentUserData(accessToken);

    const user = await this.usersService.create(twitterUserData);

    const sessionToken = await this.authService.generateLongLivedToken(
      accessToken,
      user.id,
    );

    return { token: sessionToken, user };
  }
}
