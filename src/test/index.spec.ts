import sinon from "sinon";
import * as App from "../../src/app";
import { setupCustomStubs, setupEnvVars } from "../../test/util";

const sandbox = sinon.createSandbox();

describe("index Server Unit Tests", () => {
  beforeEach(async () => {
    setupCustomStubs(sandbox);
    setupEnvVars();
  });
  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it("should", () => {
    // Arrange
    const appMock = sandbox.mock(App);
    appMock.expects("createServer");
    appMock.expects("registerRoutes");
    appMock.expects("registerPlugins");
    appMock.expects("run");

    // Act
    require("../../src/index");

    // Assert
  });
});
