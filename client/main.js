import { Meteor } from "meteor/meteor";
import Vue from "vue";
import VueRouter from "vue-router";

import "../imports/plugins";
import store from "/imports/vuex/store";
import App from "/imports/ui/App.vue";
import routes from "./routes";

const router = new VueRouter({
  mode: "history",
  routes: routes
});

Meteor.startup(() => {
  new Vue({
    router,
    store,
    ...App
  }).$mount("app");
});
