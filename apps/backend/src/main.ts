import { Signup } from './signup.service';
import { GetAccount } from './get-account.service';
import { AccountRepositoryDatabase } from './account-repository';
import { MailerGatewayMemory } from './mailer-gateway';
import { PgPromiseAdapter } from './database-connection';
import { ExpressAdapter, FastifyAdapter } from './http-server';
import AccountController from './account.controller';

// entry point - composition root
const httpServer = new FastifyAdapter();
const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection);
const mailerGateway = new MailerGatewayMemory();
const signup = new Signup(accountRepository, mailerGateway);
const getAccount = new GetAccount(accountRepository);

new AccountController(httpServer, signup, getAccount);

httpServer.listen(3000);
