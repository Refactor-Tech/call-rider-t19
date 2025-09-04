import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Signup } from '@/signup.service';
import { GetAccount } from '@/get-account.service';
import { AccountDAODatabase, AccountDAOMemory } from '@/account-repository';
import { MailerGatewayMemory } from '@/mailer-gateway';
import sinon from 'sinon';
import Account from '@/Account';

let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
  // const accountDAO = new AccountDAODatabase();
  const accountDAO = new AccountDAOMemory();
  const mailerGateway = new MailerGatewayMemory();
  signup = new Signup(accountDAO, mailerGateway);
  getAccount = new GetAccount(accountDAO);
});

afterEach(() => {
  sinon.restore();
});

describe('create account', () => {
  it('should create passenger account', async () => {
    const input = {
      accountId: '',
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
      carPlate: '',
      isDriver: false,
    };
    const outputSignup = await signup.execute(input);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputSignup).toHaveProperty('accountId');
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
  });

  it('should create passenger account using stub', async () => {
    sinon.stub(MailerGatewayMemory.prototype, 'send').resolves();
    sinon.stub(AccountDAODatabase.prototype, 'getAccountByEmail').resolves();
    sinon.stub(AccountDAODatabase.prototype, 'saveAccount').resolves();
    const input = {
      accountId: '',
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
      carPlate: '',
      isDriver: false,
    };
    sinon
      .stub(AccountDAODatabase.prototype, 'getAccountById')
      .resolves(
        new Account(
          input.accountId,
          input.name,
          input.email,
          input.cpf,
          input.carPlate,
          input.password,
          input.isPassenger,
          input.isDriver
        )
      );
    const outputSignup = await signup.execute(input);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputSignup).toHaveProperty('accountId');
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
  });

  it('should create passenger account using spy', async () => {
    const mailerGatewaySpy = sinon.spy(MailerGatewayMemory.prototype, 'send');
    const input = {
      accountId: '',
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
      carPlate: '',
      isDriver: false,
    };
    const outputSignup = await signup.execute(input);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputSignup).toHaveProperty('accountId');
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
    expect(mailerGatewaySpy.calledOnce).toBeTruthy();
    expect(mailerGatewaySpy.calledWith(input.email, 'Welcome', '')).toBeTruthy();
  });

  it('should create passenger account using mock', async () => {
    const mailerGatewayMock = sinon.mock(MailerGatewayMemory.prototype);
    const input = {
      accountId: '',
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
      carPlate: '',
      isDriver: false,
    };
    mailerGatewayMock
      .expects('send')
      .withArgs(input.email, 'Welcome', '')
      .once()
      .callsFake(() => {
        console.log('Mocked mailer');
      });
    const outputSignup = await signup.execute(input);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputSignup).toHaveProperty('accountId');
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
  });

  it('should not create duplicated passenger account', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
    };

    await signup.execute(input);
    await expect(signup.execute(input)).rejects.toThrow(new Error('Duplicated account'));
  });

  it('should not create passenger account with invalid name', async () => {
    const input = {
      name: 'John',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
    };
    await expect(signup.execute(input)).rejects.toThrow(new Error('Invalid name'));
  });

  it('should create driver account', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isDriver: true,
      carPlate: 'ABC1234',
    };

    const outputSignup = await signup.execute(input);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);

    expect(outputSignup).toHaveProperty('accountId');
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isDriver).toBe(input.isDriver);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
    expect(outputGetAccount.carPlate).toBe(input.carPlate);
  });
});
