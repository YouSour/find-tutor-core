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
              <span class="page-title">{{ pageTitle }}</span>
              <!--Left-->
              <span class="menu-left">
              </span>
              <!--Right-->
              <span class="menu-right">
                <header-menu></header-menu>
              </span>
            </el-header>

            <el-main class="content main-content">

              <div>
                <!-- Breadcrumb -->
                <div class="breadcrumb">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                      v-for="(bc, index) in breadcrumbMixin"
                      :key="index"
                      :to="bc.route"
                    >
                      <span v-if="bc.icon">
                        <i :class="bc.icon"></i>
                      </span>
                      {{ bc.title }}
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
                    <a href="#">Find Tutors</a>. All rights reserved.
                  </span>
                </div>
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
import _ from "lodash";
import SidebarMenu from "/imports/ui/layouts/SidebarMenu.vue";
import HeaderMenu from "/imports/ui/layouts/Header.vue";
// import AppFooter from "/imports/ui/AppFooter.vue";

// Breadcrum mixin
import BreadcrumsMixin from "../mixins/breadcrumbs";

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
    },
    pageTitle() {
      let title = "No TiTle";
      title = this.$route.meta.pageTitle
        ? this.$route.meta.pageTitle
        : this.$route.name ? _.startCase(this.$route.name) : title;

      return title;
    },
    breadcrumbs() {
      let crumbs = [];

      _.forEach(this.$route.matched, ({ meta, path, name }) => {
        const crumb = meta.breadcrumb;
        if (crumb) {
          // Use `name` for route
          if (name) {
            crumb.to = { name: name };
            // Check params
            if (crumb.params) {
              crumb.to.params = _.pickBy(this.$route.params, (val, key) => {
                return _.includes(crumb.params, key);
              });
            }
            // Check query
            if (crumb.query) {
              crumb.to.query = _.pickBy(this.$route.query, (val, key) => {
                return _.includes(crumb.query, key);
              });
            }
          } else {
            // Use `path` for route
            // Check path is empty
            path = path ? path : "/";
            crumb.to = path;
            // Check params
            if (crumb.params) {
              // Reduce crumb.to
              crumb.to = _.reduce(
                crumb.params,
                (result, val) => {
                  result = _.replace(
                    result ? result : path,
                    val,
                    this.$route.params[val]
                  );
                },
                ""
              );
            }
            // Check query
            if (crumb.query) {
              crumb.to.query = _.pickBy(this.$route.query, (val, key) => {
                return _.includes(crumb.query, key);
              });
            }
          }

          crumbs.push(crumb);
        }
      });

      return crumbs;
    }
  },
  mixins: [BreadcrumsMixin],
  data() {
    return {
      copyright: `
                  © 2018-}
                  Find Tutor
                  (V 1.0)
                  `
    };
  },
  methods: {
    handleHomeSelect(name) {
      this.$router.push({ name });
    }
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
