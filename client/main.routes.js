export default [
  {
    path: "/",
    name: "home",
    component: "/imports/ui/Home.vue",
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
    component: "/imports/ui/pages/Users.vue",
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
    component: "/imports/ui/Page1.vue",
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
    component: "/imports/ui/Page2.vue",
    meta: {
      pageTitle: "Page 2",
      breadcrumb: {
        title: "Page 2",
        parent: "home"
      }
    }
  }
];
