import express, { Request, Response } from 'express';
import cors from 'cors';
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyCors from '@fastify/cors';

export default interface HttpServer {
  register(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (request: Request, response: Response) {
      try {
        const output = await callback(request.params, request.body);
        response.json(output);
      } catch (e: any) {
        response.status(422).json({ message: e.message });
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}

export class FastifyAdapter implements HttpServer {
  app: FastifyInstance;

  constructor() {
    this.app = fastify();
    this.app.register(fastifyCors, {
      origin: '*',
    });
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method as 'get' | 'post' | 'put' | 'delete'](
      url,
      async function (request: FastifyRequest, reply: FastifyReply) {
        try {
          const output = await callback(request.params, request.body);
          reply.send(output);
        } catch (e: any) {
          reply.status(422).send({ message: e.message });
        }
      }
    );
  }

  listen(port: number): void {
    this.app.listen({ port });
  }
}
