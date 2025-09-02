import crypto from 'crypto';
import { validateCpf } from '@/validate-cpf';
import MailerGateway from './mailer-gateway';
import { AccountDAO } from './accountDAO';

export class Signup {
  constructor(
    readonly accountDAO: AccountDAO,
    readonly mailerGateway: MailerGateway
  ) {}

  async execute(input: any) {
    const account = {
      accountId: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      password: input.password,
      isPassenger: input.isPassenger,
      isDriver: input.isDriver,
      carPlate: input.carPlate,
    };
    const existingAccount = await this.accountDAO.getAccountByEmail(input.email);
    if (existingAccount) throw new Error('Duplicated account');
    const isNameValid = input.name.match(/[a-zA-Z] [a-zA-Z]+/);
    const isEmailValid = input.email.match(/^(.+)@(.+)$/);
    const isValidCPF = validateCpf(input.cpf);
    if (!isNameValid) throw new Error('Invalid name');
    if (!isEmailValid) throw new Error('Invalid email');
    if (!isValidCPF) throw new Error('Invalid CPF');
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error('Invalid car plate');
    await this.accountDAO.saveAccount(account);
    await this.mailerGateway?.send(account.email, 'Welcome', '');
    return {
      accountId: account.accountId,
    };
  }
}
