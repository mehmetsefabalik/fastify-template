import { FastifyServer } from "./interface/server";

export function createServer(fastify: any): FastifyServer {
  const config: any = { logger: true };
  return fastify(config);
}
