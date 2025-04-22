import { describe, it, expect, beforeEach } from "vitest";
import { Signup } from "@/signup.service";
import { GetAccount } from "@/get-account.service";
import { AccountDAODatabase, AccountDAOMemory } from "@/data";

let signup: Signup;
let getAccount: GetAccount;

beforeEach(() => {
  // const accountDAO = new AccountDAODatabase();
  const accountDAO = new AccountDAOMemory();
  signup = new Signup(accountDAO);
  getAccount = new GetAccount(accountDAO);
});

describe("create account", () => {
  it("should create passenger account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };

    const outputSignup = await signup.signup(input);
    const outputGetAccount = await getAccount.getAccount(
      outputSignup.accountId
    );
    expect(outputSignup).toHaveProperty("accountId");
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
  });

  it("should not create duplicated passenger account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };

    await signup.signup(input);
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Duplicated account")
    );
  });

  it("should not create passenger account with invalid name", async () => {
    const input = {
      name: "John",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid name")
    );
  });

  it("should not create passenger account with invalid email", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid email")
    );
  });

  it("should not create passenger account with invalid CPF", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "",
      password: "password123",
      isPassenger: true,
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid CPF")
    );
  });

  it("should create driver account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isDriver: true,
      carPlate: "ABC1234",
    };

    const outputSignup = await signup.signup(input);
    const outputGetAccount = await getAccount.getAccount(
      outputSignup.accountId
    );

    expect(outputSignup).toHaveProperty("accountId");
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isDriver).toBe(input.isDriver);
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
    expect(outputGetAccount.carPlate).toBe(input.carPlate);
  });

  it("should not create driver account with wrong car plate", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isDriver: true,
      carPlate: "",
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid car plate")
    );
  });
});
