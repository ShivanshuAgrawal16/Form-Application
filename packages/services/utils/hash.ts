import { createHmac } from "node:crypto";

export function generateHash(salt: string, password: string): string {
  return createHmac("sha256", salt).update(password).digest("hex");
}
