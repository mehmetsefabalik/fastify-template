import request from "supertest";
import fastify from "fastify";
import { FastifyServer } from "../../src/interface/server";
import sinon from "sinon";
import { setupCustomStubs, setupEnvVars, ready } from "../util";
import { createServer } from "../../src/server";
import { Application } from "../../src/application";

const sandbox = sinon.createSandbox();

describe("POST /ready Integration Tests", () => {
  let application: Application;
  let server: FastifyServer;

  describe("server.upAndRunning is true", () => {
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
      setupCustomStubs(sandbox);
    });

    afterEach(() => {
      sandbox.verifyAndRestore();
    });

    it("should return 200", async () => {
      await request(server.server).get("/ready").expect(200);
    });

    it("should return 400", async () => {
      server.upAndRunning = false;
      await request(server.server).get("/ready").expect(400);
    });
  });
});
