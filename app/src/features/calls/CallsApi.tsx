// import { setTimeout } from "timers/promises";

export function getEntry(): Promise<ReturnType<typeof Date['now']>> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Date.now()), 1000)
  });
}
