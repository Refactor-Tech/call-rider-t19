import { Signup } from './core/application/use-cases/signup';
import { GetAccount } from './core/application/use-cases/get-account';
import { AccountRepositoryDatabase } from './infra/repository/account-repository';
import { MailerGatewayMemory } from './infra/gateways/mailer-gateway';
import { PgPromiseAdapter } from './infra/database/database-connection';
import { ExpressAdapter, FastifyAdapter } from './infra/http/http-server';
import AccountController from './infra/controllers/account.controller';

// entry point - composition root
const httpServer = new FastifyAdapter();
const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection);
const mailerGateway = new MailerGatewayMemory();
const signup = new Signup(accountRepository, mailerGateway);
const getAccount = new GetAccount(accountRepository);

new AccountController(httpServer, signup, getAccount);

httpServer.listen(3000);
