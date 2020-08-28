/* istanbul ignore next */
export const setupEnvVars = () => {
  process.env.NODE_ENV = "test";
};

/* istanbul ignore next */
export const setupCustomStubs = (sandbox: any) => {
  sandbox.stub(console, "log");
  sandbox.stub(console, "warn");
  sandbox.stub(console, "error");
};

/* istanbul ignore next */
export const ready = async (server: any, request: any, done: any) => {
  await request(server.server)
    .get(`/ready`)
    .then(async (response: any) => {
      if (response.status === 200) {
        done();
      } else {
        await ready(server, request, done);
      }
    });
};
