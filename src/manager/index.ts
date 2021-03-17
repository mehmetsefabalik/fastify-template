import { Logger } from "../interface/logger";
import { Service } from "../service";

export class Manager<T extends Service> {
  constructor(
    protected readonly service: T,
    protected readonly logger: Logger
  ) {}

  findByName(query: string) {
    return this.service.findByName(query);
  }
}
