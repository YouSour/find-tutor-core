<template>
  <div class="app-sidebar">
    <el-menu
      :default-active="linkActiveClass"
      text-color="#fff"
      @select="handleMenuSelect"
      v-for="(item, index) in routes"
      :key="index"
    >
      <el-menu-item
        :index="item.name"
        v-show="item.sideBar()"
      >
        <i :class="item.icon +' aside-menu-icon'"></i>
        <span>{{item.name}}</span>
        </el-menu-item>
        </el-menu>
  </div>
</template>
<script>
import routes from "../../../client/routes";

export default {
  name: "SidebarMenu",
  // props: {
  //   activeMenu: {
  //     type: String,
  //     default: "home"
  //   }
  // },
  data() {
    return {
      users: this.$store.state.auth.user,
      routes
    };
  },
  computed: {
    linkActiveClass() {
      return this.$route.meta.linkActiveClass
        ? this.$route.meta.linkActiveClass
        : this.$route.name;
    }
  },
  methods: {
    handleMenuSelect(name) {
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~imports/ui/styles/aside-menu.scss";
</style>
