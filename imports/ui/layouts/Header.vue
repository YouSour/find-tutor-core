<template>
  <span>
    <!-- <el-dropdown
      trigger="click"
      class="header-item"
    >
      <el-button type="text">
        <i class="far fa-envelope"></i>
        App Header
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Message 1</el-dropdown-item>
        <el-dropdown-item>Message 2</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown> -->

    <!-- Icon -->
    <div class="avatar-container header-icon">
      <i class="fa fa-envelope"></i>
    </div>
    <!-- User -->
    <el-dropdown
      trigger="click"
      class="avatar-container right-menu-item"
      @command="handleCommand"
    >
      <div class="avatar-wrapper">
        <img
          class="user-avatar"
          src="/images/icon/avatar-01.jpg"
        >
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          disabled
          class="dropdown-border"
        >
          <div class="info clearfix">
            <div class="image">
              <a href="#">
                <img
                  src="images/icon/avatar-01.jpg"
                  alt="John Doe"
                >
              </a>
            </div>
            <div class="content">
              <div class="name">
                {{user.username}}
              </div>
              <span class="email">{{user.emails[0].address}}</span>
            </div>
          </div>
          </el-dropdown-item>
          <el-dropdown-item command="profile">
            <i class="fa fa-user-circle"></i> Profile
          </el-dropdown-item>
          <el-dropdown-item command="setting">
            <i class="fa fa-cog"></i> Setting
          </el-dropdown-item>
          <el-dropdown-item
            command="logout"
            class="logout"
          >
            <i class="fas fa-sign-out-alt"></i> Logout
            </el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
  </span>
</template>

<script>
// import "../../public/js/main.js";
export default {
  name: "HeaderMenu",
  computed: {
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        this.$store.dispatch("logout");
      }
      if (command == "profile") {
        this.$router.push("profile");
      }
      if (command == "setting") {
        this.$router.push("setting");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~imports/ui/styles/header-menu.scss";
.override-padding {
  padding: 0px 0px 0px 7px;
}

.avatar-container {
  height: 55px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 7px;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
.avatar-wrapper {
  cursor: pointer;
  margin-top: 7px;
  position: relative;
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50px;
  }
  .el-icon-caret-bottom {
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}
.el-dropdown-menu {
  width: 280px;
}
.header-icon {
  font-size: 20px !important;
  cursor: pointer;
  vertical-align: 12px !important;
  margin-right: 30px;
  display: inline-block;
}

.account-dropdown {
  min-width: 305px;
  position: absolute;
  top: 58px;
  right: 0;
  background: #fff;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  -webkit-transform-origin: right top;
  -moz-transform-origin: right top;
  -ms-transform-origin: right top;
  -o-transform-origin: right top;
  transform-origin: right top;
  z-index: 3;
}
.el-dropdown-menu__item {
  line-height: 27px;
  color: #333;
  padding: 10px 25px;
  font-size: 13px;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #fff;
  background: #07a7e3;
  background: -moz-linear-gradient(-45deg, #07a7e3 0%, #32dac3 100%);
  background: -webkit-linear-gradient(-45deg, #07a7e3 0%, #32dac3 100%);
  background: linear-gradient(135deg, #07a7e3 0%, #32dac3 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$qp-color-1, endColorstr=$qp-color-2,GradientType=1 );
  -webkit-transition: opacity 0.2s ease-out;
  -moz-transition: opacity 0.2s ease-out;
  -o-transition: opacity 0.2s ease-out;
  transition: opacity 0.2s ease-out;
  -webkit-transition: width 0.3s ease-in-out;
  -moz-transition: width 0.3s ease-in-out;
  -o-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
}
.dropdown-border {
  border-bottom: 1px solid #f2f2f2;
}
.info .image {
  float: left;
  overflow: hidden;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  img {
    height: 65px;
    width: 65px;
  }
}
.info .content {
  margin-left: 65px;
  padding: 5px 0;
  padding-left: 12px;
}
.info .content .name {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
}
.info .content .email {
  font-size: 13px;
  color: #999;
  line-height: -webkit-calc(20/13);
  line-height: -moz-calc(20/13);
  line-height: calc(20 / 13);
}
</style>
