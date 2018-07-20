// Libs
import { Meteor } from "meteor/meteor";
import Vue from "vue";
import routerFactory from "/imports/routes";

import "../imports/plugins.js";

// App layout
import AppLayout from "/imports/ui/layouts/AppLayout.vue";

// App start
Meteor.startup(() => {
  // Start the router
  const router = routerFactory.create();
  new Vue({
    router,
    render: h => h(AppLayout)
  }).$mount("app");
});
