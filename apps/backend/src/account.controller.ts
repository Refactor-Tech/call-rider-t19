import { GetAccount } from './get-account.service';
import HttpServer from './http-server';
import { Signup } from './signup.service';

export default class AccountController {
  constructor(
    readonly httpServer: HttpServer,
    readonly signup: Signup,
    readonly getAccount: GetAccount
  ) {
    httpServer.register('post', '/signup', async (params: any, body: any) => {
      const output = await signup.execute(body);
      return output;
    });
    httpServer.register('get', '/accounts/:id', async (params: any, body: any) => {
      const output = await getAccount.execute(params.id);
      return output;
    });
  }
}
