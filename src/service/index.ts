import { Model, Document } from "mongoose";

export class Service {
  constructor(
    protected readonly model: Model<Document>,
    protected readonly sanitize: (value: string) => string
  ) {}

  findByName(query: string, limit = 10) {
    return this.model
      .find({ name: this.sanitize(query) })
      .limit(limit)
      .exec();
  }
}
