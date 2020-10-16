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

  it("should call start and function with parameter getServer", () => {
    const mock = sandbox.mock(App);
    mock.expects("start");
    mock.expects("getServer");

    require("../index");
  });
});
