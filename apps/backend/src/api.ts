import express from "express";
import cors from "cors";
import { Signup } from "./signup.service";
import { GetAccount } from "./get-account.service";
import { AccountDAODatabase } from "./data";

const app = express();
app.use(express.json());
app.use(cors());

const accountDAO = new AccountDAODatabase();
const signup = new Signup(accountDAO);
const getAccount = new GetAccount(accountDAO);

app.post("/signup", async function (req, res) {
  const input = req.body;
  try {
    const output = await signup.signup(input);
    res.json(output);
  } catch (e: any) {
    res.status(422).json({ message: e.message });
  }
});

app.get("/accounts/:id", async function (req, res) {
  const output = await getAccount.getAccount(req.params.id);
  res.json(output);
});

app.listen(3000);
