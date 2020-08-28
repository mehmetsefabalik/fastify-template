import sinon from "sinon";
import faker from "faker";
import { createServer } from "../../src/app";
import { setupCustomStubs, setupEnvVars } from "../util";

const sandbox = sinon.createSandbox();
const {
  lorem: { word },
} = faker;

describe("server Index Unit Tests", () => {
  beforeEach(async () => {
    setupCustomStubs(sandbox);
    setupEnvVars();
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it("should create server", () => {
    // Arrange
    const instance = word();
    const stub = sandbox.stub().returns(instance);

    // Act
    const server = createServer(stub);

    // Assert
    expect(stub.calledWith()).toBe(true);
    expect(server).toBe(instance);
  });
});
