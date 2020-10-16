import request from "supertest";
import fastify from "fastify";
import * as App from "../../src/app";
import { FastifyServer } from "../../src/interface/server";
import sinon from "sinon";
import { setupCustomStubs, setupEnvVars, ready } from "../util";

const sandbox = sinon.createSandbox();

describe("POST /health Integration Tests", () => {
  let server: FastifyServer;

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
    await request(server.server).get("/health").expect(200);
  });
});
