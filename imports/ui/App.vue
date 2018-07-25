<template>
  <div>
    <applayout></applayout>
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
  }
};
</script>