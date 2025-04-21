import { describe, it, expect } from "vitest";
import { getAccount, signup } from "@/service";

describe("create account", () => {
  it("should create passenger account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };

    const outputSignup = await signup(input);
    const outputGetAccount = await getAccount(outputSignup.accountId);
    expect(outputSignup).toHaveProperty("accountId");
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.is_passenger).toBe(input.isPassenger);
    expect(outputGetAccount.account_id).toBe(outputSignup.accountId);
  });

  it("should not create duplicated passenger account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };

    await signup(input);
    await expect(signup(input)).rejects.toThrow(
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
    await expect(signup(input)).rejects.toThrow(new Error("Invalid name"));
  });

  it("should not create passenger account with invalid email", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };
    await expect(signup(input)).rejects.toThrow(new Error("Invalid email"));
  });

  it("should not create passenger account with invalid CPF", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "",
      password: "password123",
      isPassenger: true,
    };
    await expect(signup(input)).rejects.toThrow(new Error("Invalid CPF"));
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

    const outputSignup = await signup(input);
    const outputGetAccount = await getAccount(outputSignup.accountId);

    expect(outputSignup).toHaveProperty("accountId");
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.is_driver).toBe(input.isDriver);
    expect(outputGetAccount.account_id).toBe(outputSignup.accountId);
    expect(outputGetAccount.car_plate).toBe(input.carPlate);
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
    await expect(signup(input)).rejects.toThrow(new Error("Invalid car plate"));
  });
});
