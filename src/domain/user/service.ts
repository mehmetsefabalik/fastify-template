import { inject, injectable } from "tsyringe";
import { UserModel } from "./model";
import { Service } from "../../service";

@injectable()
export class UserService extends Service {
  constructor(
    @inject("UserModel") model: typeof UserModel,
    @inject("sanitize") sanitize: (value: string) => string
  ) {
    super(model, sanitize);
  }
}
