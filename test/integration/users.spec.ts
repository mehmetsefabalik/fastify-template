import request from "supertest";
import fastify from "fastify";
import { Application } from "../../src/application";
import { FastifyServer } from "../../src/interface/server";
import sinon from "sinon";
import faker from "faker";
import { setupCustomStubs, setupEnvVars, ready } from "../util";
import { createUsers, deleteUsers } from "../helper/user-service";
import { createServer } from "../../src/server";

const sandbox = sinon.createSandbox();

async function sideEffects(name: string) {
  await createUsers([name]);
}

async function clearSideEffects(name: string) {
  await deleteUsers([name]);
}

describe("GET /users?name={name} Unit Tests", () => {
  let application: Application;
  let server: FastifyServer;
  let name: string;

  beforeAll(async (done) => {
    setupEnvVars();
    server = createServer(fastify);
    application = new Application(server);
    await application.init();

    name = `${faker.lorem.word()}${faker.lorem.words(1)}`;

    await sideEffects(name);
    await ready(server, request, done);
  });

  afterAll(async () => {
    await clearSideEffects(name);
    server.close();
    await application.disconnect();
  });

  beforeEach(() => {
    setupCustomStubs(sandbox);
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it("should return 400 without query param", async () => {
    await request(server.server).get(`/users`).expect(400);
  });

  it("should return 200", async () => {
    const res = await request(server.server)
      .get(`/users?name=${name}`)
      .expect(200);
    expect(res.body.success).toBe(true);
  });

  it("should return 404", async () => {
    await request(server.server).get(`/users?name=nosuchthing`).expect(404);
  });

  it("should return 500", async () => {
    const temp = server.userManager.findByName;
    server.userManager.findByName = sandbox.stub().throws();

    await request(server.server).get(`/users?name=${name}`).expect(500);

    server.userManager.findByName = temp;
  });
});
