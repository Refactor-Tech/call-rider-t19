import { validateCpf } from './validate-cpf';

export default class Account {
  constructor(
    readonly accountId: string,
    readonly name: string,
    readonly email: string,
    readonly cpf: string,
    readonly carPlate: string,
    readonly password: string,
    readonly isPassenger: boolean,
    readonly isDriver: boolean
  ) {
    if (!this.isValidName()) throw new Error('Invalid name');
    if (!this.isValidEmail()) throw new Error('Invalid email');
    if (this.isDriver && !this.isValidCarPlate(carPlate)) throw new Error('Invalid car plate');
    if (!validateCpf(cpf)) throw new Error('Invalid CPF');
  }

  isValidName() {
    return this.name.match(/[a-zA-Z] [a-zA-Z]+/);
  }

  isValidEmail() {
    return this.email.match(/^(.+)@(.+)$/);
  }

  isValidCarPlate(carPlate: string) {
    return carPlate.match(/[A-Z]{3}[0-9]{4}/);
  }
}
