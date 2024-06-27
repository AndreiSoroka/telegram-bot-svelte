import { h } from "snabbdom";

export function buttonComponent(
  text: string,
  onClick: (e: MouseEvent) => void,
) {
  return h(
    "button",
    {
      on: {
        click: onClick,
      },
    },
    text,
  );
}
