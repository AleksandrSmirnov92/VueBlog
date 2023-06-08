import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import Personal from "../components/Personal.vue";
import Account from "../views/Account.vue";
import ProfileSection from "../views/account/ProfileSection.vue";
import EditProfile from "../components/profile/EditProfile.vue";
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
  {
    path: "/account",
    component: Account,
    children: [
      {
        path: "profile",
        name: "profile",
        component: ProfileSection,
      },
      {
        path: "edit-profile",
        name: "EditProfile",
        component: EditProfile,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
