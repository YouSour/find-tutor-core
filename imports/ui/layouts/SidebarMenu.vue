<template>
  <div class="app-sidebar">
    <el-menu
      :default-active="linkActiveClass"
      text-color="#fff"
      @select="handleMenuSelect"
    >
      <el-menu-item index="home">
        <i class="fa fa-tachometer-alt aside-menu-icon"></i>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="users">
        <i class="fa fa-tachometer-alt aside-menu-icon"></i>
        <span>Users</span>
      </el-menu-item>
      <el-menu-item index="page1">
        <i class="fas fa-money-bill-alt aside-menu-icon"></i>
        <span>Page 1</span>
      </el-menu-item>
      <el-menu-item index="page2">
        <i class="fas fa-exchange-alt aside-menu-icon"></i>
        <span>Page 2</span>
      </el-menu-item>
      <el-menu-item index="Employee">
        <i class="far fa-user aside-menu-icon"></i>
        <span>Not Work</span>
      </el-menu-item>
      <el-menu-item index="Report">
        <i class="fas fa-print aside-menu-icon"></i>
        <span>Not Work</span>
      </el-menu-item>
      <el-menu-item index="Setting">
        <i class="fas fa-cogs aside-menu-icon"></i>
        <span>Not Work</span>
      </el-menu-item>
      <!-- END MENU SIDEBAR-->
      </el-menu>
  </div>
</template>
<script>
export default {
  name: "SidebarMenu",
  props: {
    activeMenu: {
      type: String,
      default: ""
    }
  },
  computed: {
    linkActiveClass() {
      const activeLink = this.$route.meta.linkActiveClass
        ? this.$route.meta.linkActiveClass
        : this.$route.name;
      return activeLink;
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
