import { UserService } from "./service";
import { Manager } from "../../manager";
import { injectable } from "tsyringe";

@injectable()
class UserManager extends Manager<UserService> {
  constructor(protected readonly service: UserService) {
    super(service);
  }
}

export default UserManager;
