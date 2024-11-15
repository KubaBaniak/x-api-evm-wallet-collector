interface TwitterTokenData {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
  refresh_token: string;
}

export class TwitterTokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
  refresh_token: string;
  constructor({
    token_type,
    expires_in,
    access_token,
    scope,
    refresh_token,
  }: TwitterTokenData) {
    this.token_type = token_type;
    this.expires_in = expires_in;
    this.access_token = access_token;
    this.scope = scope;
    this.refresh_token = refresh_token;
  }
}
