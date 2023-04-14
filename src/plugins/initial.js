import router from "@/router";
import store from "@/store";
import { VueAxios } from "./axios";
import { formatPlugin } from "./format";
import { IntersectionObserver } from "./Vdirectives/IntersectionObserver";
import initVeeValidateRules from "./VeeValidate";
import i18n from "./I18n";

export const APP_INITIAL = (app) => {
  // import.meta.globEager("@/assets/*.svg")
  app.use(i18n);
  app.use(router);
  app.use(store);
  app.use(VueAxios);
  app.use(formatPlugin);
  app.directive("insectOb", IntersectionObserver);
  app.config.globalProperties.console = console;
  initVeeValidateRules();

  return app;
};
