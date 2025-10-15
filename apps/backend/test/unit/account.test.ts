import Account from '@/core/domain/account';
import { describe, it, expect } from 'vitest';

describe('Account', () => {
  it('should create a passenger account', () => {
    const account = Account.create(
      'John Doe',
      'john.doe@example.com',
      '87748248800',
      '',
      'password123',
      true,
      false
    );
    expect(account).toBeInstanceOf(Account);
    expect(account.getName()).toBe('John Doe');
    expect(account.getEmail()).toBe('john.doe@example.com');
    expect(account.getCpf()).toBe('87748248800');
    expect(account.getCarPlate()).toBe('');
    expect(account.getPassword()).toBe('password123');
    expect(account.isPassenger).toBe(true);
    expect(account.isDriver).toBe(false);
  });

  it('should not create account with invalid name', () => {
    expect(() => {
      Account.create(
        '',
        'john.doe@example.com',
        '87748248800',
        '',
        'password123',
        true,
        false
      );
    }).toThrowError('Invalid name');
  });

  it('should not create account with invalid email', () => {
    expect(() => {
      Account.create(
        'John Doe',
        'invalid-email',
        '87748248800',
        '',
        'password123',
        true,
        false
      );
    }).toThrowError('Invalid email');
  });

  it('should not create account with invalid cpf', () => {
    expect(() => {
      Account.create(
        'John Doe',
        'john.doe@example.com',
        'invalid-cpf',
        '',
        'password123',
        true,
        false
      );
    }).toThrowError('Invalid CPF');
  });

  it('should not create account with invalid carPlate', () => {
    expect(() => {
      Account.create(
        'John Doe',
        'john.doe@example.com',
        '87748248800',
        'invalid-car-plate',
        'password123',
        false,
        true
      );
    }).toThrowError('Invalid car plate');
  });
});
