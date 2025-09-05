import { Signup } from './signup.service';
import { GetAccount } from './get-account.service';
import { AccountRepositoryDatabase } from './account-repository';
import { MailerGatewayMemory } from './mailer-gateway';
import { PgPromiseAdapter } from './database-connection';
import { ExpressAdapter, FastifyAdapter } from './http-server';

const httpServer = new FastifyAdapter();
const connection = new PgPromiseAdapter();

httpServer.register('post', '/signup', async (params: any, body: any) => {
  const accountRepository = new AccountRepositoryDatabase(connection);
  const mailerGateway = new MailerGatewayMemory();
  const signup = new Signup(accountRepository, mailerGateway);
  const output = await signup.execute(body);
  return output;
});
httpServer.register('get', '/accounts/:id', async (params: any, body: any) => {
  const accountRepository = new AccountRepositoryDatabase(connection);
  const getAccount = new GetAccount(accountRepository);
  const output = await getAccount.execute(params.id);
  return output;
});

httpServer.listen(3000);
