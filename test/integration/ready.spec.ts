import request from "supertest";
import fastify from "fastify";
import * as App from "../../src/app";
import { FastifyServer } from "../../src/interface/server";
import sinon from "sinon";
import { setupCustomStubs, setupEnvVars, ready } from "../util";

const sandbox = sinon.createSandbox();

describe("POST /ready Integration Tests", () => {
  let server: FastifyServer;

  describe("server.upAndRunning is true", () => {
    beforeAll(async (done) => {
      setupEnvVars();
      server = App.createServer(fastify);
      App.registerPlugins(server);
      App.registerRoutes(server);
      await ready(server, request, done);
    });

    afterAll(() => {
      server.close();
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
