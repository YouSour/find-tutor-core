import store from "../imports/vuex/store";

const requiredUserFn = (to, from, next) => {
  if (store.state.auth.user) {
    return next();
  }
  return next("/");
};

const hasPermission = routeName => {
  let isPermitted = false;
  const { roles } = store.state.auth.user;
  if (!!roles) {
    switch (routeName) {
      case "login":
        isPermitted = false;
        break;
      case "notFound":
        isPermitted = false;
        break;
      case "users":
        isPermitted = !!roles.find(element => {
          return element === "super" || element === "admin";
        });
        break;
      case "profile":
        isPermitted = false;
        break;
      case "setting":
        isPermitted = false;
        break;
      default:
        isPermitted = true;
        break;
    }
  }
  return isPermitted;
};

const routes = [
  // Not Found
  {
    path: "*",
    name: "notFound",
    component: () => import("../imports/ui/pages/NotFound"),
    meta: {
      pageTitle: "Not Found",
      breadcrumb: {
        title: "Not Found",
        ignore: true
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("notFound"),
    icon: "fa fa-tachometer-alt"
  },
  // Login
  {
    path: "/login",
    name: "login",
    component: () => import("../imports/ui/auth/Login"),
    meta: {
      layout: "login",
      notRequiresAuth: true,
      pageTitle: "Login"
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("login"),
    icon: "fa fa-tachometer-alt"
  },
  // Home
  {
    path: "",
    name: "home",
    component: () => import("../imports/ui/pages/Home"),
    meta: {
      pageTitle: "Dashboard",
      breadcrumb: {
        title: "Dashboard",
        icon: "fas fa-tachometer-alt"
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("home"),
    icon: "fa fa-tachometer-alt"
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../imports/ui/pages/Users"),
    meta: {
      pageTitle: "Users",
      breadcrumb: {
        title: "Users",
        parent: "home"
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("users"),
    icon: "fa fa-tachometer-alt"
  },
  {
    path: "/page1",
    name: "page1",
    component: () => import("../imports/ui/pages/Page1"),
    meta: {
      pageTitle: "Page 1",
      breadcrumb: {
        title: "Page 1",
        parent: "home"
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("page1"),
    icon: "fa fa-tachometer-alt"
    // Nested routes
    // children: [
    //   {
    //     path: "a",
    //     name: "page1a",
    //     component: "/imports/ui/Page1A.vue"
    //   },
    //   {
    //     path: "b",
    //     name: "page1b",
    //     component: "/imports/ui/Page1B.vue"
    //   }
    // ]
  },
  {
    path: "/page2",
    name: "page2",
    component: () => import("../imports/ui/pages/Page2"),
    meta: {
      pageTitle: "Page 2",
      breadcrumb: {
        title: "Page 2",
        parent: "home"
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("page2"),
    icon: "fa fa-tachometer-alt"
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../imports/ui/pages/Profile.vue"),
    meta: {
      pageTitle: "Profile",
      breadcrumb: {
        title: "Profile",
        parent: "home"
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("profile"),
    icon: "fa fa-tachometer-alt"
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../imports/ui/pages/Setting.vue"),
    meta: {
      pageTitle: "Setting",
      breadcrumb: {
        title: "Setting",
        parent: "home"
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("setting"),
    icon: "fa fa-tachometer-alt"
  },
  {
    path: "/subject",
    name: "subject",
    component: () => import("../imports/ui/pages/Subject.vue"),
    meta: {
      pageTitle: "Subject",
      breadcrumb: {
        title: "Subject",
        parent: "home"
      }
    },
    // beforeEnter: requiredUserFn,
    sideBar: () => hasPermission("subject"),
    icon: "fa fa-tachometer-alt"
  }
];
export default routes;
