import { init, propsModule } from "snabbdom";
import { WebApp } from "@grammyjs/web-app";
import { greetingComponent } from "./components/greetingComponent.mjs";
import { linkToTheBotComponent } from "./components/linkToTheBotComponent.mjs";
const patch = init([propsModule]);

const isTelegram = !!WebApp.initData;
const { user } = WebApp.initDataUnsafe;
const name = user?.first_name || user?.last_name || "stranger";

if (isTelegram) {
  patch(document.body, greetingComponent(name));
} else {
  patch(document.body, linkToTheBotComponent("TestAssignmentBot"));
}
