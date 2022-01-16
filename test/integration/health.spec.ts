import request from "supertest";
import fastify from "fastify";
import { FastifyServer } from "../../src/interface/server";
import { setupCustomStubs, setupEnvVars, ready } from "../util";
import { createServer } from "../../src/server";
import { Application } from "../../src/application";


describe("POST /health Integration Tests", () => {
  let application: Application;
  let server: FastifyServer;

  beforeAll(async (done) => {
    setupEnvVars();
    server = createServer(fastify);
    application = new Application(server);
    await application.init();
    await ready(server, request, done);
  });

  afterAll(async () => {
    server.close();
    await application.disconnect();
  });

  beforeEach(() => {
    setupCustomStubs();
  });

  it("should return 200", async () => {
    await request(server.server).get("/health").expect(200);
  });
});
