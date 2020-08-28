import fastifyEnv from "fastify-env"
import { getOptions } from "./config";
import { FastifyServer } from "./interface";

import { healthCheck } from "./routes/health-check";

export const createServer = (fastify: any): FastifyServer => {
  return fastify({ logger: true });
};

export const registerPlugins = (server: FastifyServer) => {
  server.register(fastifyEnv, getOptions()).ready((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    server.decorate("upAndRunning", true);
    server.log.info("Configuration: ", server.config);
  });
};

export const registerRoutes = (server: FastifyServer) => {
  const routes: Array<Function> = [healthCheck];
  routes.forEach((route) => route(server));
};

export const run = (server: FastifyServer) => {
  server.listen(3002, "0.0.0.0", (err: any) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    const address = server!.server!.address();
  });
};
