import pgp from 'pg-promise';
import { GetAccountData } from './get-account.service';

export interface AccountDAO extends GetAccountData {}
export class AccountDAODatabase implements AccountDAO {
  async getAccountByEmail(email: string) {
    const connection = pgp()('postgres://admin:123456@localhost:5432/app');
    const [account] = await connection.query('select * from ccca.account where email = $1', [
      email,
    ]);
    await connection.$pool.end();
    if (!account) return false;
    return {
      accountId: account?.account_id,
      name: account.name,
      email: account.email,
      cpf: account.cpf,
      carPlate: account.car_plate,
      isPassenger: account.is_passenger,
      isDriver: account.is_driver,
    };
  }

  async getAccountById(id: string) {
    const connection = pgp()('postgres://admin:123456@localhost:5432/app');
    const [account] = await connection.query('select * from ccca.account where account_id = $1', [
      id,
    ]);
    await connection.$pool.end();
    return {
      accountId: account.account_id,
      name: account.name,
      email: account.email,
      cpf: account.cpf,
      carPlate: account.car_plate,
      isPassenger: account.is_passenger,
      isDriver: account.is_driver,
    };
  }

  async saveAccount(account: any) {
    const connection = pgp()('postgres://admin:123456@localhost:5432/app');
    await connection.query(
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

    await connection.$pool.end();
  }
}

export class AccountDAOMemory implements AccountDAO {
  accounts: any[] = [];

  getAccountById(accountId: string): Promise<any> {
    return this.accounts.find((account) => account.accountId === accountId);
  }

  async saveAccount(account: any) {
    this.accounts.push(account);
  }

  getAccountByEmail(email: string): Promise<any> {
    return this.accounts.find((account) => account.email === email);
  }
}
