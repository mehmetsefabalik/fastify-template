import { Model, Document } from "mongoose";
import { autoInjectable, inject } from "tsyringe";
import { Sanitize } from "../util/sanitize";

@autoInjectable()
export class Service {
  constructor(
    protected readonly model: Model<Document>,
    @inject("sanitize") private readonly sanitize?: Sanitize
  ) {}

  findByName(query: string, limit = 10) {
    return this.model
      .find({ name: this.sanitize!(query) })
      .limit(limit)
      .exec();
  }
}
