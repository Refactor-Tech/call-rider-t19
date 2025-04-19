import { describe, it, expect } from "vitest";
import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

describe.only("create account", () => {
  it("should create passenger account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };

    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    const outputSignup = responseSignup.data;
    const responseGetAccoubt = await axios.get(
      `http://localhost:3000/accounts/${outputSignup.accountId}`
    );
    const outputGetAccount = responseGetAccoubt.data;

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

    await axios.post("http://localhost:3000/signup", input);
    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Duplicated account");
  });

  it("should not create passenger account with invalid name", async () => {
    const input = {
      name: "John",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };
    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Invalid name");
  });

  it("should not create passenger account with invalid email", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe`,
      cpf: "87748248800",
      password: "password123",
      isPassenger: true,
    };
    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Invalid email");
  });

  it("should not create passenger account with invalid CPF", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@example.com`,
      cpf: "",
      password: "password123",
      isPassenger: true,
    };
    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Invalid CPF");
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

    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    const outputSignup = responseSignup.data;
    const responseGetAccoubt = await axios.get(
      `http://localhost:3000/accounts/${outputSignup.accountId}`
    );
    const outputGetAccount = responseGetAccoubt.data;

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

    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      input
    );
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Invalid car plate");
  });
});
