export interface GetAccountData {
  getAccountById(accountId: string): Promise<any>;
  getAccountByEmail(email: string): Promise<any>;
  saveAccount(account: any): Promise<void>;
}

export class GetAccount {
  constructor(readonly getAccountData: GetAccountData) {}

  async getAccount(id: string) {
    const account = await this.getAccountData.getAccountById(id);
    return account;
  }
}
