<template>
  <div>
    <applayout></applayout>
    <!-- <users></users> -->
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import store from "/imports/vuex/store";
// import Auth from "/imports/ui/auth/Auth.vue";
import Users from "/imports/ui/Users.vue";
import AppLayout from "/imports/ui/layouts/AppLayout.vue";

export default {
  name: "app",
  store,
  components: {
    // auth: Auth,
    applayout: AppLayout,
    users: Users
  },
  meteor: {
    meteorUser() {
      this.$store.commit("updateUser", Meteor.user());
    }
  }
};
</script>