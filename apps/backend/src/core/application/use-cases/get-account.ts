export interface GetAccountData {
  getAccountById(accountId: string): Promise<any>;
  getAccountByEmail(email: string): Promise<any>;
  saveAccount(account: any): Promise<void>;
}

export class GetAccount {
  constructor(readonly getAccountData: GetAccountData) {}

  async execute(id: string): Promise<Output> {
    const account = await this.getAccountData.getAccountById(id);
    return {
      accountId: account.accountId,
      email: account.getEmail(),
      name: account.getName(),
      cpf: account.getCpf(),
      password: account.getPassword(),
      carPlate: account.getCarPlate(),
      isPassenger: account.isPassenger,
      isDriver: account.isDriver,
    };
  }
}

type Output = {
  accountId: string;
  email: string;
  name: string;
  cpf: string;
  password: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
};
