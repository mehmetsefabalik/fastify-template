import Manager from "./manager";
import { UserModel } from "./model";
import { container } from "tsyringe";

function registerDependencies() {
  container.register<typeof UserModel>("UserModel", { useValue: UserModel });
}

export default { Manager, registerDependencies };
