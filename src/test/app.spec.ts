import sinon, { SinonStub } from "sinon";
import { getServer, start } from "../app";
import { setupCustomStubs, setupEnvVars } from "../../test/util";
import { FastifyServer } from "../interface/server";

const sandbox = sinon.createSandbox();

describe("server Index Unit Tests", () => {
  let mockServer: FastifyServer;

  beforeEach(async () => {
    mockServer = {
      ...getServer(),
      decorate: sandbox.stub(),
      register: sandbox.stub(),
      listen: sandbox.stub() as any,
    };
    setupCustomStubs(sandbox);
    setupEnvVars();
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it("should get server", () => {
    // Arrange

    // Act
    getServer();
  });

  it("should start", async () => {
    // Arrange

    // Act
    await start(mockServer);

    // Assert
    expect((mockServer.decorate as SinonStub).called).toBe(true);
    expect((mockServer.register as SinonStub).called).toBe(true);
  });

  it("should call App.run when NODE_ENV is not test", async () => {
    // Arrange
    process.env.NODE_ENV = "production";

    // Act
    await start(mockServer);

    // Assert
    expect((mockServer.listen as SinonStub).called).toBe(true);

    process.env.NODE_ENV = "test";
  });
});
