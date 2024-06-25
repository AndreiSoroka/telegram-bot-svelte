import { h } from "snabbdom";

export function linkToTheBotComponent(botName?: string) {
  if (!botName) {
    return h(
      "div",
      {},
      "The bot name is not specified. Check the environment variables.",
    );
  }
  return h("div", {}, [
    "The web app only works in Telegram. ",
    "Open it in the Telegram app by clicking the link: ",
    h("a", { props: { href: `https://t.me/${botName}` } }, `@${botName}`),
  ]);
}
