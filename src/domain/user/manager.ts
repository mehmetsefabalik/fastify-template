import { UserService } from "./service";
import { Manager } from "../../manager";
import { Logger } from "../../interface/logger";
import { inject, injectable } from "tsyringe";

@injectable()
class UserManager extends Manager<UserService> {
  constructor(service: UserService, @inject("Logger") logger: Logger) {
    super(service, logger);
  }
}

export default UserManager;
