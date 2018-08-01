const routes = [
  // Not Found
  {
    path: "*",
    component: () => import('./pages/NotFound'),
    meta: {
      pageTitle: "Not Found",
      breadcrumb: {
        title: "Not Found",
        ignore: true
      }
    }
  },
  // Login
  {
    path: "/login",
    name: "login",
    component: () => import('./auth/Login'),
    meta: {
      layout: "login",
      notRequiresAuth: true,
      pageTitle: "Login"
    }
  },
  // Home
  {
    path: "",
    name: "home",
    component: () => import('./pages/Home'),
    meta: {
      pageTitle: "Dashboard",
      breadcrumb: {
        title: "Dashboard",
        icon: "fas fa-tachometer-alt"
      }
    }
  },
  {
    path: "/users",
    name: "users",
    component: () => import('./pages/Users'),
    meta: {
      pageTitle: "Users",
      breadcrumb: {
        title: "Users",
        parent: "home"
      }
    }
  },
  {
    path: "/page1",
    name: "page1",
    component: () => import('./pages/Page1'),
    meta: {
      pageTitle: "Page 1",
      breadcrumb: {
        title: "Page 1",
        parent: "home"
      }
    }
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
    component: () => import('./pages/Page2'),
    meta: {
      pageTitle: "Page 2",
      breadcrumb: {
        title: "Page 2",
        parent: "home"
      }
    }
  }
];
export default routes;
