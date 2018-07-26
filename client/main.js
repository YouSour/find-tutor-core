// Libs
import { Meteor } from "meteor/meteor";
import Vue from "vue";
import routerFactory from "/imports/routes";

import "../imports/plugins";

// App layout
import AppLayout from "/imports/ui/layouts/AppLayout.vue";
import App from "/imports/ui/App.vue";
// App start
Meteor.startup(() => {
  // Start the router
  const router = routerFactory.create();
  new Vue({
    router,
    render: h => h(App)
  }).$mount("app");
});
