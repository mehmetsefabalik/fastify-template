import request from "supertest";
import { FastifyServer } from "../../src/interface/server";
import sinon from "sinon";
import { setupCustomStubs, setupEnvVars, ready } from "../util";
import { getServer, start } from "../../src/app";

const sandbox = sinon.createSandbox();

describe("POST /health Integration Tests", () => {
  let server: FastifyServer;

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
    await request(server.server).get("/health").expect(200);
  });
});
