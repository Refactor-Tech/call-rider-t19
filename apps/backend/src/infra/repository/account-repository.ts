import Account from '@/core/domain/account';
import { DatabaseConnection } from '@/infra/database/database-connection';

export interface AccountRepository {
  saveAccount(account: Account): Promise<void>;
  getAccountByEmail(email: string): Promise<Account | undefined>;
  getAccountById(id: string): Promise<Account | undefined>;
}
export class AccountRepositoryDatabase implements AccountRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async getAccountByEmail(email: string) {
    const [account] = await this.connection.query(
      'select * from ccca.account where email = $1',
      [email]
    );
    if (!account) return;
    return new Account(
      account.account_id,
      account.name,
      account.email,
      account.cpf,
      account.car_plate,
      account.password,
      account.is_passenger,
      account.is_driver
    );
  }

  async getAccountById(id: string) {
    const [account] = await this.connection.query(
      'select * from ccca.account where account_id = $1',
      [id]
    );
    return new Account(
      account.account_id,
      account.name,
      account.email,
      account.cpf,
      account.car_plate,
      account.password,
      account.is_passenger,
      account.is_driver
    );
  }

  async saveAccount(account: Account) {
    await this.connection.query(
      'insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        account.accountId,
        account.name,
        account.email,
        account.cpf,
        account.carPlate,
        !!account.isPassenger,
        !!account.isDriver,
        account.password,
      ]
    );
  }
}

export class AccountDAOMemory implements AccountRepository {
  accounts: Account[] = [];

  async getAccountById(accountId: string) {
    const account = this.accounts.find((account) => account.accountId === accountId);
    return account;
  }

  async saveAccount(account: Account) {
    this.accounts.push(account);
  }

  async getAccountByEmail(email: string) {
    return this.accounts.find((account) => account.email === email);
  }
}
