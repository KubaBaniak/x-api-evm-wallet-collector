interface UserModel {
  id: number;
  twitterId: string;
  name: string;
  username: string;
  wallet?: { address: string };
}

export class UserResponse {
  id: number;
  twitterId: string;
  name: string;
  username: string;
  wallet?: { address: string };

  constructor({ id, twitterId, name, username, wallet }: UserModel) {
    this.id = id;
    this.twitterId = twitterId;
    this.name = name;
    this.username = username;
    this.wallet = wallet;
  }
}
