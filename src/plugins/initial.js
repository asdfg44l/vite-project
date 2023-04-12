import router from "@/router";
import store from "@/store";
import { VueAxios } from "./axios";
import { formatPlugin } from "./format";
import { IntersectionObserver } from "./IntersectionObserver";

import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';


export const APP_INITIAL = (app) => {
  
  // import.meta.globEager("@/assets/*.svg")
  app.use(router);
  app.use(store);
  app.use(VueAxios);
  app.use(formatPlugin);
  app.directive("insectOb", IntersectionObserver);
  app.config.globalProperties.console = console;

  //vee-validate rules
  Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
  });

  return app;
};
