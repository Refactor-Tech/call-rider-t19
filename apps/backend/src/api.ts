import express from 'express';
import cors from 'cors';
import { Signup } from './signup.service';
import { GetAccount } from './get-account.service';
import { AccountRepositoryDatabase } from './account-repository';
import { MailerGatewayMemory } from './mailer-gateway';
import { PgPromiseAdapter } from './database-connection';

const app = express();
app.use(express.json());
app.use(cors());

const connection = new PgPromiseAdapter();

const accountRepository = new AccountRepositoryDatabase(connection);
const mailerGateway = new MailerGatewayMemory();
const signup = new Signup(accountRepository, mailerGateway);
const getAccount = new GetAccount(accountRepository);

app.post('/signup', async function (req, res) {
  const input = req.body;
  try {
    const output = await signup.execute(input);
    res.json(output);
  } catch (e: any) {
    res.status(422).json({ message: e.message });
  }
});

app.get('/accounts/:id', async function (req, res) {
  const output = await getAccount.execute(req.params.id);
  res.json(output);
});

app.listen(3000);
