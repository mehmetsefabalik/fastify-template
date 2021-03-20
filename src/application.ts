import fastifyEnv from "fastify-env";
import Mongoose from "mongoose";
import fastifyStatic from "fastify-static";
import path from "path";
import { getOptions } from "./config";
import { FastifyServer } from "./interface/server";
import { Route } from "./interface/route";
import { decorateManagers } from "./ioc";

import { healthCheck } from "./routes/health-check";
import { userRoutes } from "./routes/user";
import { staticRoutes } from "./routes/static";

function connect(
  dbUrl: string,
  onSuccess: () => void,
  onError: (dbUrl: string, onSuccess: () => void, onError: any) => void
) {
  return Mongoose.connect(
    dbUrl,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    function (err) {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 5 sec",
          err
        );
        setTimeout(() => onError(dbUrl, onSuccess, onError), 5000);
      } else {
        onSuccess();
      }
    }
  );
}

export class Application {
  constructor(private readonly server: FastifyServer) {}

  private registerDecorators() {
    decorateManagers(this.server);
    this.server.decorate("upAndRunning", true);
  }

  private registerPlugins() {
    this.server.register(fastifyEnv, getOptions()).ready((err) => {
      if (err) {
        console.error(`Error while registering fastifyEnv: ${err}`);
        process.exit(1);
      }
      console.log("Configuration: ", this.server.config);
    });
    this.server.register(fastifyStatic, {
      root: path.join(__dirname, "../public"),
      serve: false,
    });
  }

  private registerRoutes() {
    const routes: Array<Route> = [healthCheck, userRoutes, staticRoutes];
    routes.forEach((route) => route(this.server));
  }

  private async connect(): Promise<typeof Mongoose> {
    const dbUrl = this.server.config.DB_URL;

    return new Promise((resolve) => {
      return connect(dbUrl, resolve, connect);
    });
  }

  public async disconnect() {
    await Mongoose.disconnect();
  }

  public async init() {
    this.registerPlugins();
    this.server.log.info("waiting server to be ready");
    this.registerDecorators();
    this.server.log.info("registered decorators");
    this.registerRoutes();
    this.server.log.info("registered routes");
    await this.server.ready();
    await this.connect();
    this.server.log.info("connected to db");
  }

  public run() {
    this.server.listen(5050, "0.0.0.0", async (err: Error) => {
      if (err) {
        await this.disconnect();
        console.error(err);
        process.exit(1);
      }
    });
  }
}
