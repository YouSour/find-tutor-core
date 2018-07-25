<template>
  <div>
    <div v-if="user">
      <el-container class="">
        <!--Side-->
        <el-aside
          width="260px"
          class="aside"
        >
          <div class="logo">
            <img
              src="/img/meteor.png"
              class="logo-img"
            >
          </div>
          <!-- Menu -->
          <sidebar-menu></sidebar-menu>
          </el-aside>
          <el-container>
            <!--Header-->
            <el-header class="header header-menu-layout">
              <span class="page-title">Header</span>
              <!--Left-->
              <span class="menu-left">
              </span>
              <!--Right-->
              <span class="menu-right">
                <header-menu></header-menu>
              </span>
            </el-header>

            <el-main class="content main-content">
              <!-- Breadcrumb -->
              <div class="breadcrumb">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item>
                    <!-- <span v-if="bc.icon">
                    <i :class="bc.icon"></i>
                  </span> -->
                    Breadcrumb
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>

              <!-- Content -->
              <div class="router-view">
                <!-- route outlet -->
                <router-view></router-view>
              </div>
              <!-- Footer -->
              <div class="footer">
                <span>Copyright © 2018
                  <a href="https://colorlib.com">Find Tutors</a>. All rights reserved.
                </span>
              </div>
              <!-- <div class="footer">
            {{ copyright }}
          </div> -->
            </el-main>
          </el-container>
      </el-container>
    </div>

    <div
      class="auth"
      v-if="!user"
    >
      <login></login>
  </div>
  </div>
</template>

<script>
import SidebarMenu from "/imports/ui/layouts/SidebarMenu.vue";
import HeaderMenu from "/imports/ui/layouts/Header.vue";
// import AppFooter from "/imports/ui/AppFooter.vue";

import Login from "/imports/ui/auth/Login.vue";

export default {
  components: {
    SidebarMenu,
    HeaderMenu,
    login: Login
    // AppFooter
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      copyright: `
                  © 2018-}
                  Find Tutor
                  (V 1.0)
                  `
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~imports/ui/styles/main.scss";
@import "~imports/ui/styles/aside-menu.scss";
@import "~imports/ui/styles/header-menu.scss";
.auth {
  background-color: #e5e5e5;
  height: 100vh;
}
</style>
