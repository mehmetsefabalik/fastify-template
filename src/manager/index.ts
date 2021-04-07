import { Service } from "../service";

export class Manager<T extends Service> {
  constructor(protected readonly service: T) {}

  findByName(query: string) {
    return this.service.findByName(query);
  }
}
