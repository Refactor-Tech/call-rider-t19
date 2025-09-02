import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Signup } from '@/signup.service';
import { GetAccount } from '@/get-account.service';
import { AccountDAODatabase, AccountDAOMemory } from '@/accountDAO';
import { MailerGatewayMemory } from '@/mailer-gateway';
import sinon from 'sinon';
import { RideDAODatabase } from '@/rideDAO';
import RequestRide from '@/request-ride.service';
import GetRide from '@/get-ride.service';

let signup: Signup;
let getAccount: GetAccount;
let requestRide: RequestRide;
let getRide: GetRide;

beforeEach(() => {
  // const accountDAO = new AccountDAODatabase();
  const accountDAO = new AccountDAOMemory();
  const rideDAO = new RideDAODatabase();
  const mailerGateway = new MailerGatewayMemory();
  signup = new Signup(accountDAO, mailerGateway);
  getAccount = new GetAccount(accountDAO);
  requestRide = new RequestRide(accountDAO, rideDAO);
  getRide = new GetRide(accountDAO, rideDAO);
});

afterEach(() => {
  sinon.restore();
});

describe('request ride', () => {
  it.only('should request ride', async () => {
    const inputSignup = {
      accountId: '',
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
      carPlate: '',
      isDriver: false,
    };
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
      passengerId: outputSignup.accountId,
      from: {
        latitude: -27.584905257808835,
        longitude: -48.545022195325124,
      },
      to: {
        latitude: -27.496887588317275,
        longitude: -48.522234807851476,
      },
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    expect(outputRequestRide.rideId).toBeDefined();
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.rideId).toBe(outputRequestRide.rideId);
    expect(outputGetRide.passengerId).toBe(outputSignup.accountId);
    expect(outputGetRide.passengerName).toBe(inputSignup.name);
    expect(outputGetRide.from.latitude).toBe(inputRequestRide.from.latitude);
    expect(outputGetRide.from.longitude).toEqual(inputRequestRide.from.longitude);
    expect(outputGetRide.to).toEqual(inputRequestRide.to);
    expect(outputGetRide.status).toBe('requested');
    expect(outputGetRide.fare).toBe(0);
    expect(outputGetRide.distance).toBe(0);
  });
});
