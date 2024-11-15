interface WalletModel {
  id: number;
  address: string;
  userId: number;
}

class WalletResponse {
  id: number;
  address: string;
  userId: number;
  constructor({ id, address, userId }: WalletModel) {
    this.id = id;
    this.address = address;
    this.userId = userId;
  }
}
