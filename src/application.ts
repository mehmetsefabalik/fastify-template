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

export class Application {
  private db: typeof Mongoose | null = null;
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

  private async connect() {
    const db = await Mongoose.connect(this.server.config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    this.db = db;
  }

  public async disconnect() {
    if (this.db) {
      await this.db.disconnect();
    } else {
      this.server.log.warn(
        "called application.disconnect but db connection is not established"
      );
    }
  }

  public async init() {
    this.registerPlugins();
    this.server.log.info("waiting server to be ready");
    this.registerDecorators();
    this.server.log.info("registered decorators");
    this.registerRoutes();
    this.server.log.info("registered routes");
    await this.server.ready();
    try {
      await this.connect();
    } catch (e) {
      this.server.log.error("Error while connecting to db, ", e);
      throw new Error();
    }
    this.server.log.info("connected to db");
  }

  public run() {
    this.server.listen(5047, "0.0.0.0", async (err: Error) => {
      if (err) {
        await this.disconnect();
        console.error(err);
        process.exit(1);
      }
    });
  }
}
