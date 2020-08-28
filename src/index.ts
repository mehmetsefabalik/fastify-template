import * as App from "./app";
import fastify from "fastify";

const server = App.createServer(fastify);

App.registerPlugins(server);

App.registerRoutes(server);

App.run(server);