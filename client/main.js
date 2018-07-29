// Libs
import { Meteor } from "meteor/meteor";
import Vue from "vue";

// Create router
import router from "../imports/routes";

import "../imports/plugins";

// Store
import store from "/imports/vuex/store";

// App layout
import AppLayout from "/imports/ui/layouts/AppLayout.vue";
import App from "/imports/ui/App.vue";

// App start
Meteor.startup(() => {
  // Start the vue app
  new Vue({
    router,
    store,
    ...App
  }).$mount("app");
});
