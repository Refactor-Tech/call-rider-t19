import crypto from "crypto";
import { validateCpf } from "@/validate-cpf";

export interface SignupData {
  saveAccount(account: any): Promise<void>;
  getAccountByEmail(email: string): Promise<any>;
}

export class Signup {
  constructor(readonly signupData: SignupData) {}

  async signup(input: any) {
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
    const existingAccount = await this.signupData.getAccountByEmail(
      input.email
    );
    if (existingAccount) throw new Error("Duplicated account");
    const isNameValid = input.name.match(/[a-zA-Z] [a-zA-Z]+/);
    const isEmailValid = input.email.match(/^(.+)@(.+)$/);
    const isValidCPF = validateCpf(input.cpf);
    if (!isNameValid) throw new Error("Invalid name");
    if (!isEmailValid) throw new Error("Invalid email");
    if (!isValidCPF) throw new Error("Invalid CPF");
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("Invalid car plate");
    await this.signupData.saveAccount(account);
    return {
      accountId: account.accountId,
    };
  }
}
