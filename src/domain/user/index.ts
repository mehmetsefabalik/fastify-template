import Manager from "./manager";

export function registerManager(
  decorator: (name: string, manager: any) => void
) {
  decorator("userManager", Manager);
}
