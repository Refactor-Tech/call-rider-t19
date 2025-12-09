import pgp from 'pg-promise';

export interface DatabaseConnection {
  query(query: string, params: any): Promise<any>;
  close(): Promise<void>;
}

export class PgPromiseAdapter implements DatabaseConnection {
  connection: any;

  constructor() {
    this.connection = pgp()('postgres://admin:123456@localhost:5432/call_rider');
  }

  query(query: string, params: any): Promise<any> {
    return this.connection.query(query, params);
  }

  close(): Promise<void> {
    return this.connection.$pool.end();
  }
}
