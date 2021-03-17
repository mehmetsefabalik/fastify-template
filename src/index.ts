import "reflect-metadata";
import fastify from "fastify";
import { Application } from "./application";
import { createServer } from "./server";

(async function () {
  const application = new Application(createServer(fastify));
  await application.init();
  await application.run();
})();
