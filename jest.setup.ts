import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "node:util";

Object.assign(global, { TextDecoder, TextEncoder });

if (!global.crypto.randomUUID) {
  Object.defineProperty(global.crypto, "randomUUID", {
    value: () => `test-uuid-${Math.random()}`,
    writable: true,
  });
}
