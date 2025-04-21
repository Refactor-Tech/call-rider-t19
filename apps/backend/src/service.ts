import crypto from "crypto";
import { validateCpf } from "@/validate-cpf";
import { getAccountByEmail, getAccountById, saveAccount } from "@/data";

export async function signup(input: any) {
  const account = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    cpf: input.cpf,
    password: input.password,
    isPassenger: input.isPassenger,
    isDriver: input.isDriver,
    carPlate: input.carPlate,
  };
  const existingAccount = await getAccountByEmail(input.email);
  if (existingAccount) throw new Error("Duplicated account");
  const isNameValid = input.name.match(/[a-zA-Z] [a-zA-Z]+/);
  const isEmailValid = input.email.match(/^(.+)@(.+)$/);
  const isValidCPF = validateCpf(input.cpf);
  if (!isNameValid) throw new Error("Invalid name");
  if (!isEmailValid) throw new Error("Invalid email");
  if (!isValidCPF) throw new Error("Invalid CPF");
  if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
    throw new Error("Invalid car plate");
  await saveAccount(account);
  return {
    accountId: account.id,
  };
}

export async function getAccount(id: string) {
  const account = await getAccountById(id);
  return account;
}
