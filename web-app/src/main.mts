import { h, init, propsModule, eventListenersModule } from "snabbdom";
import { WebApp } from "@grammyjs/web-app";
import { greetingComponent } from "./components/greetingComponent.mjs";
import { linkToTheBotComponent } from "./components/linkToTheBotComponent.mjs";
import { buttonComponent } from "./components/buttonComponent.mjs";
const patch = init([propsModule, eventListenersModule]);

const $app = document.getElementById("app");
if (!$app) {
  throw new Error("Element with id 'app' not found");
}

const isTelegram = !!WebApp.initData;
const { user } = WebApp.initDataUnsafe;
const name = user?.first_name || user?.last_name || "stranger";

if (isTelegram) {
  patch(
    $app,
    h("div", {}, [
      greetingComponent(name),
      buttonComponent("Close Web-App", () => {
        WebApp.close();
      }),
    ]),
  );
} else {
  patch($app, linkToTheBotComponent(process.env.TELEGRAM_BOT_NAME));
}

WebApp.ready();
console.log("https://github.com/AndreiSoroka/telegram-bot-web-app");
