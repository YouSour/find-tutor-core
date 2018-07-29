// // Import the router
import VueRouter from "vue-router";

//------ Module -----
import app from "./ui/routes";

const routes = app;

const router = new VueRouter({
  mode: "history",
  routes: routes
});

export default router;
