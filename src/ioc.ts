import { FastifyServer } from "./interface/server";
import { container } from "tsyringe";
import glob from "glob";
import path from "path";
import { sanitize } from "./util/sanitize";

async function getDomains(): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    glob(path.join(__dirname, "./domain/*/index.*"), {}, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

export async function decorateManagers(server: FastifyServer) {
  container.register<typeof server.log>("Logger", { useValue: server.log });
  container.register<(value: string) => string>("sanitize", {
    useValue: sanitize,
  });

  const domainPaths = await getDomains();
  const modules: Array<{
    registerManager: (decorate: any) => void;
  }> = [];
  for (let i = 0; i < domainPaths.length; i++) {
    modules.push(await import(domainPaths[i]));
  }

  for (const module of modules) {
    module.registerManager((name: string, manager: any) => {
      server.decorate(name, container.resolve(manager));
    });
  }
}
