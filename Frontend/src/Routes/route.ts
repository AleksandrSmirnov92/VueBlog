import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import Personal from "../components/Personal.vue";
const routes = [
  {
    path: "/",

    component: Personal,
  },
  {
    path: "/SignUp",
    component: SignUp,
  },
  {
    path: "/SignIn",
    name: "SignIn",
    component: SignIn,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
