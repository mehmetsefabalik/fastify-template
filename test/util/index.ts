/* istanbul ignore next */
export const setupEnvVars = () => {
  process.env.NODE_ENV = "test";
};

/* istanbul ignore next */
export const setupCustomStubs = () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
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
