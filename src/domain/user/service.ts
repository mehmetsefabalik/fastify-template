import { injectable } from "tsyringe";
import { UserModel } from "./model";
import { Service } from "../../service";

@injectable()
export class UserService extends Service {
  constructor() {
    super(UserModel);
  }
}
