import { FastifyServer } from "./interface/server";
import { container } from "tsyringe";

import { sanitize } from "./util";

import User from "./domain/user";
import { Manager } from "./manager";

const modules: Array<{
  name: string;
  value: { Manager: any; registerDependencies: () => void };
}> = [
  {
    name: "userManager",
    value: User,
  },
];

export async function decorateManagers(server: FastifyServer) {
  container.register<typeof server.log>("Logger", { useValue: server.log });
  container.register<(value: string) => string>("sanitize", {
    useValue: sanitize,
  });

  for (const module of modules) {
    module.value.registerDependencies();
  }

  for (const module of modules) {
    server.decorate(module.name, container.resolve(module.value.Manager));
  }
}
