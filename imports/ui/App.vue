<template>
  <div>
    <applayout></applayout>
    <vue-ins-progress-bar></vue-ins-progress-bar>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import store from "/imports/vuex/store";

import AppLayout from "/imports/ui/layouts/AppLayout.vue";

export default {
  name: "app",
  store,
  components: {
    applayout: AppLayout
  },
  meteor: {
    meteorUser() {
      this.$store.commit("updateUser", Meteor.user());
    }
  },
  mounted() {
    this.$insProgress.finish();
  },
  created() {
    this.$insProgress.start();
    this.$router.beforeEach((to, from, next) => {
      this.$insProgress.start();
      next();
    });
    this.$router.afterEach((to, from) => {
      this.$insProgress.finish();
    });
  }
};
</script>