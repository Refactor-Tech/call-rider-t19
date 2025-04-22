export interface GetAccountData {
  getAccountById(accountId: string): Promise<any>;
}

export class GetAccount {
  constructor(readonly getAccountData: GetAccountData) {}

  async getAccount(id: string) {
    const account = await this.getAccountData.getAccountById(id);
    return account;
  }
}
