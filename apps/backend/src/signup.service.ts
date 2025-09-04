import MailerGateway from './mailer-gateway';
import { AccountRepository } from './account-repository';
import Account from './Account';

export class Signup {
  constructor(
    readonly accountDAO: AccountRepository,
    readonly mailerGateway: MailerGateway
  ) {}

  async execute(input: any) {
    const account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.carPlate,
      input.password,
      input.isPassenger,
      input.isDriver
    );
    const existingAccount = await this.accountDAO.getAccountByEmail(input.email);
    if (existingAccount) throw new Error('Duplicated account');
    await this.accountDAO.saveAccount(account);
    await this.mailerGateway?.send(account.email, 'Welcome', '');
    return {
      accountId: account.accountId,
    };
  }
}
