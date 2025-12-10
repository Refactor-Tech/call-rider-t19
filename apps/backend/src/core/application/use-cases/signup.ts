import MailerGateway from '@/infra/gateways/mailer-gateway';
import { AccountRepository } from '@/infra/repository/account-repository';
import Account from '@/core/domain/entity/account';

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
    await this.mailerGateway?.send(account.getEmail(), 'Welcome', '');
    return {
      accountId: account.getAccountId(),
    };
  }
}
