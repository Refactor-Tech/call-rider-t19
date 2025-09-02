// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { validateCpf } from '../src/validate-cpf';

const validCPFs = [
  '123.456.789-09',
  '12345678909',
  '965.658.020-68',
  '97456321558',
  '87748248800',
];
const invalidCPFs = [
  '111.111.111-11',
  '12345678900',
  '42343299',
  'aaaa',
  '0',
  null,
  undefined,
];

describe('validate-cpf', () => {
  it.each(validCPFs)('should validate a cpf %s', (cpf) => {
    expect(validateCpf(cpf)).toBeTruthy();
  });

  it.each(invalidCPFs)('should invalidate a cpf %s', (cpf) => {
    expect(validateCpf(cpf)).toBeFalsy();
  });
});
