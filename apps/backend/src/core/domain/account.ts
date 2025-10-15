import CarPlate from './value-objects/car-plate';
import CPF from './value-objects/cpf';
import Email from './value-objects/email';
import Name from './value-objects/name';
import Password from './value-objects/password';

export default class Account {
  private name: Name;
  private email: Email;
  private cpf: CPF;
  private carPlate: CarPlate;
  private password: Password;

  constructor(
    readonly accountId: string,
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    password: string,
    readonly isPassenger: boolean,
    readonly isDriver: boolean
  ) {
    this.name = new Name(name);
    this.email = new Email(email);
    this.cpf = new CPF(cpf);
    this.carPlate = new CarPlate(carPlate);
    this.password = new Password(password);
    // if (this.isDriver && !this.isValidCarPlate(carPlate))
    //   throw new Error('Invalid car plate');
  }

  static create(
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    password: string,
    isPassenger: boolean,
    isDriver: boolean
  ) {
    const accountId = crypto.randomUUID();
    return new Account(
      accountId,
      name,
      email,
      cpf,
      carPlate,
      password,
      isPassenger,
      isDriver
    );
  }

  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getCpf() {
    return this.cpf.getValue();
  }

  getCarPlate() {
    return this.carPlate.getValue();
  }

  getPassword() {
    return this.password.getValue();
  }
}
