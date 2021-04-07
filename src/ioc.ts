import { FastifyServer } from "./interface/server";
import { container } from "tsyringe";

import { sanitize } from "./util/sanitize";

import * as Ad from "./domain/user";

const modules: Array<{
  registerManager: (decorate: any) => void;
}> = [Ad];

export async function decorateManagers(server: FastifyServer) {
  container.register<typeof server.log>("Logger", { useValue: server.log });
  container.register<(value: string) => string>("sanitize", {
    useValue: sanitize,
  });

  for (const module of modules) {
    module.registerManager((name: string, manager: any) => {
      server.decorate(name, container.resolve(manager));
    });
  }
}
