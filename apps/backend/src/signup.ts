import crypto from "crypto";
import pgp from "pg-promise";
import express from "express";
import { validateCpf } from "@/validate-cpf";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const input = req.body;
  const connection = pgp()("postgres://admin:123456@localhost:5432/app");
  try {
    const id = crypto.randomUUID();
    const [existingAccount] = await connection.query(
      "select * from ccca.account where email = $1",
      [input.email]
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
    await connection.query(
      "insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        id,
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        !!input.isPassenger,
        !!input.isDriver,
        input.password,
      ]
    );
    res.json({ accountId: id });
  } catch (e: any) {
    res.status(422).json({ message: e.message });
  } finally {
    await connection.$pool.end();
  }
});

app.get("/accounts/:id", async function (req, res) {
  const connection = pgp()("postgres://admin:123456@localhost:5432/app");
  try {
    const [acc] = await connection.query(
      "select * from ccca.account where account_id = $1",
      [req.params.id]
    );
    if (acc) {
      res.json(acc);
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } finally {
    await connection.$pool.end();
  }
});

app.listen(3000);
