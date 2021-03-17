// istanbul ignore
import { UserModel } from "../../src/domain/user/model";

export async function createUser(name: string, override = {}) {
  return UserModel.create({
    name,
    ...override,
  });
}

export async function deleteUser(name: string) {
  return UserModel.deleteMany({ name });
}

export async function createUsers(names: Array<string>) {
  const result = [];
  for (let i = 0; i < names.length; i++) {
    result.push(await createUser(names[i]));
  }
  return result;
}

export async function createUsersWithOverride(
  names: Array<string>,
  override: Array<any>
) {
  const result = [];
  for (let i = 0; i < names.length; i++) {
    result.push(await createUser(names[i], override[i]));
  }
  return result;
}

export async function deleteUsers(names: Array<string>) {
  for (let i = 0; i < names.length; i++) {
    await deleteUser(names[i]);
  }
}
