import { describe, it, expect } from 'vitest';
import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

describe('create account', () => {
  it('should create passenger account', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
    };

    const responseSignup = await axios.post(
      'http://localhost:3000/signup',
      input
    );
    expect(responseSignup.status).toBe(200);
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(
      `http://localhost:3000/accounts/${outputSignup.accountId}`
    );
    const outputGetAccount = responseGetAccount.data;
    expect(outputSignup).toHaveProperty('accountId');
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
  });

  it('should not create passenger account with invalid name', async () => {
    const input = {
      name: 'John',
      email: `john.doe${Math.random()}@example.com`,
      cpf: '87748248800',
      password: 'password123',
      isPassenger: true,
    };
    const responseSignup = await axios.post(
      'http://localhost:3000/signup',
      input
    );
    expect(responseSignup.status).toBe(422);
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe('Invalid name');
  });
});
