import fastifyEnv from "fastify-env";
import Mongoose from "mongoose";
import fastifyStatic from "fastify-static";
import path from "path";
import glob from "glob";
import { getOptions } from "./config";
import { FastifyServer } from "./interface/server";
import { Route } from "./interface/route";
import { decorateManagers } from "./ioc";

import { healthCheck } from "./routes/health-check";
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

async function getDomainRoutes(): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    glob(path.join(__dirname, "./domain/*/route.*"), {}, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
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

  private async registerRoutes() {
    const domainPaths = await getDomainRoutes();
    const domainRoutes: Array<Route> = [];
    for (let i = 0; i < domainPaths.length; i++) {
      domainRoutes.push((await import(domainPaths[i])).default);
    }
    const routes: Array<Route> = [healthCheck, staticRoutes, ...domainRoutes];
    routes.forEach((route) => route(this.server));
  }

  private async connect(): Promise<typeof Mongoose> {
    const dbUrl = this.server.config.DB_URL;

    return new Promise((resolve) => {
      return connect(dbUrl, resolve as () => void, connect);
    });
  }

  public async disconnect() {
    await Mongoose.disconnect();
  }

  public async init() {
    await this.registerRoutes();
    this.server.log.info("registered routes");
    this.registerPlugins();
    this.server.log.info("registered plugins");
    this.registerDecorators();
    this.server.log.info("registered decorators");
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
