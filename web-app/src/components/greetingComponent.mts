import { h } from "snabbdom";

export function greetingComponent(name: string) {
  return h("h1", {}, `Hello, ${name}!`);
}
