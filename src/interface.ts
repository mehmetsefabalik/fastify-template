import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

export interface ServerConfig {

}

export interface FastifyServer
  extends FastifyInstance<Server, IncomingMessage, ServerResponse> {
  config: ServerConfig;
  upAndRunning: boolean;
}
