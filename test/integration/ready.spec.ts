import request from "supertest";
import { FastifyServer } from "../../src/interface/server";
import sinon from "sinon";
import { setupCustomStubs, setupEnvVars, ready } from "../util";
import { getServer, start } from "../../src/app";

const sandbox = sinon.createSandbox();

describe("POST /ready Integration Tests", () => {
  let server: FastifyServer;

  describe("server.upAndRunning is true", () => {
    beforeAll(async (done) => {
      setupEnvVars();
      server = getServer();
      await start(server);
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
