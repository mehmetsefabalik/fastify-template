import { lorem, random } from "faker";

/* istanbul ignore next */
export const setupEnvVars = () => {
  process.env.TEST = "true";
  process.env.USER_API = `http://${lorem.word()}.com`;
  process.env.AUTHENTICATION_API = `http://${lorem.word()}.com`;
  process.env.CONTRACT_API = `http://${lorem.word()}.com`;
  process.env.FORGOT_PASSWORD_API = `http://${lorem.word()}.com`;
  process.env.FORGOT_PASSWORD_API_ENABLED = "false";
  process.env.API_CLIENT_ID = lorem.word();
  process.env.COOKIE_DOMAIN = `http://${lorem.word()}.com`;
  process.env.MWEB_COOKIE_DOMAIN_TR = lorem.word();
  process.env.MWEB_COOKIE_DOMAIN_DE = lorem.word();
  process.env.MWEB_COOKIE_DOMAIN_GLOBAL = lorem.word();
  process.env.ALLOW_ORIGIN = lorem.word();
  process.env.GRAYLOG_FACILITY = "AuthenticationGateway";
  process.env.GRAYLOG_HOST = lorem.word();
  process.env.GRAYLOG_HOSTNAME = "AuthenticationGateway";
  process.env.GRAYLOG_PORT = random.number.toString();
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
