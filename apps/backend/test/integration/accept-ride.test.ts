import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Signup } from '@/core/application/use-cases/signup';
import { GetAccount } from '@/core/application/use-cases/get-account';
import {
  AccountRepositoryDatabase,
  AccountDAOMemory,
} from '@/infra/repository/account-repository';
import { MailerGatewayMemory } from '@/infra/gateways/mailer-gateway';
import sinon from 'sinon';
import { RideDAODatabase } from '@/infra/repository/ride-repository';
import RequestRide from '@/core/application/use-cases/request-ride';
import GetRide from '@/core/application/use-cases/get-ride';
import {
  DatabaseConnection,
  PgPromiseAdapter,
} from '@/infra/database/database-connection';
import AcceptRide from '@/core/application/use-cases/accept-ride';

let connection: DatabaseConnection;
let signup: Signup;
let getAccount: GetAccount;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;

beforeEach(() => {
  connection = new PgPromiseAdapter();
  const accountRepository = new AccountRepositoryDatabase(connection);
  // const accountRepository = new AccountDAOMemory();
  const rideRepository = new RideDAODatabase(connection);
  const mailerGateway = new MailerGatewayMemory();
  signup = new Signup(accountRepository, mailerGateway);
  getAccount = new GetAccount(accountRepository);
  requestRide = new RequestRide(accountRepository, rideRepository);
  getRide = new GetRide(accountRepository, rideRepository);
  acceptRide = new AcceptRide(accountRepository, rideRepository);
});

afterEach(async () => {
  sinon.restore();
  await connection.close();
});

describe('accept ride', () => {
  it('should accept ride', async () => {
    const inputSignupPassenger = {
      accountId: '',
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
      carPlate: '',
      isDriver: false,
    };
    const outputSignupPassenger = await signup.execute(inputSignupPassenger);
    const inputSignupDriver = {
      accountId: '',
      name: 'Jane Smith',
      email: `jane.smith${Math.random()}@example.com`,
      cpf: '05088111711',
      password: 'password456',
      isPassenger: false,
      carPlate: 'XYZ1234',
      isDriver: true,
    };
    const outputSignupDriver = await signup.execute(inputSignupDriver);
    const inputRequestRide = {
      passengerId: outputSignupPassenger.accountId,
      from: {
        latitude: -27.584905257808835,
        longitude: -48.545022195325124,
      },
      to: {
        latitude: -27.496887588317275,
        longitude: -48.522234807851476,
      },
    };
    const outputRequestRide = await requestRide.execute({
      passengerId: outputSignupPassenger.accountId,
      from: inputRequestRide.from,
      to: inputRequestRide.to,
    });
    const inputAccpetRide = {
      rideId: outputRequestRide.rideId,
      driverId: outputSignupDriver.accountId,
    };
    await acceptRide.execute(inputAccpetRide);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.status).toBe('accepted');
    expect(outputGetRide.driverId).toBe(outputSignupDriver.accountId);
  });
});
