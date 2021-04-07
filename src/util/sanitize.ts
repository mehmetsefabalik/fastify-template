export function sanitize(value: string) {
  return value.replace("$", "").replace(".", "");
}

export type Sanitize = typeof sanitize;
