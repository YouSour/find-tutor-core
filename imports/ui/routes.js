import NotFound from "./pages/NotFound.vue";
import Login from "./auth/Login.vue";
import Home from "./pages/Home.vue";
import Users from "./pages/Users";
import Page1 from "./pages/Page1.vue";
import Page2 from "./pages/Page2.vue";

const routes = [
  // Not Found
  {
    path: "*",
    component: NotFound,
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
    component: Login,
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
    component: Home,
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
    component: Users,
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
    component: Page1,
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
    component: Page2,
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
