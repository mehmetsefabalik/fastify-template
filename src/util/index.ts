export function sanitize(value: string) {
  return value.replace("$", "").replace(".", "");
}
