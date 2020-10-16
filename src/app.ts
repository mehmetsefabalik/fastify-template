import fastifyEnv from "fastify-env";
import fastifyStatic from "fastify-static";
import path from "path";
import { getOptions } from "./config";
import { FastifyServer } from "./interface/server";
import { Route } from "./interface/route";

import { healthCheck } from "./routes/health-check";
import fastify from "fastify";

const createServer = (fastify: any): FastifyServer => {
  const config: any = {};
  if (process.env.NODE_ENV !== "test") {
    config.logger = true;
  }
  return fastify(config);
};

const registerPlugins = async (server: FastifyServer) => {
  await server.register(fastifyEnv, getOptions());
  await server.register(fastifyStatic, {
    root: path.join(__dirname, "../client"),
    serve: false,
  });
};

const registerRoutes = (server: FastifyServer) => {
  const routes: Array<Route> = [healthCheck];
  routes.forEach((route) => route(server));
};

const run = (server: FastifyServer) => {
  server.listen(3003, "0.0.0.0", (err: any) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
};

export function getServer() {
  return createServer(fastify);
}

export async function start(server: FastifyServer) {
  registerRoutes(server);

  await registerPlugins(server);

  server.decorate("upAndRunning", true);

  await server.ready();

  if (process.env.NODE_ENV !== "test") {
    run(server);
  }
}
