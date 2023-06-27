import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store/user-store";

import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import Personal from "../components/Personal.vue";
import Account from "../views/Account.vue";
import ProfileSection from "../views/account/ProfileSection.vue";
import EditProfile from "../components/profile/EditProfile.vue";
import AddSongVue from "../components/profile/AddSong.vue";
import DeleteSong from "../components/profile/DeleteSong.vue";
import AddVideo from "../components/profile/AddVideo.vue";
import DeleteVideo from "../components/profile/DeleteVideo.vue";
import CreatePost from "../components/profile/CreatePost.vue";
import EditPost from "../components/profile/EditPost.vue";
import PostsPage from "../components/profile/PostsPage.vue";
import PostById from "../components/profile/PostById.vue";
const routes: any = [
  {
    path: "/",

    component: Personal,
  },
  {
    path: "/SignUp",
    beforeEnter: (to: any, from: any, next: any) => {
      useUserStore().id
        ? next("/account/profile/" + useUserStore().id)
        : next();
    },
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/SignIn",
    beforeEnter: (to: any, from: any, next: any) => {
      useUserStore().id
        ? next("/account/profile/" + useUserStore().id)
        : next();
    },
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/account",
    beforeEnter: (to: any, from: any, next: any) => {
      useUserStore().id ? next() : next("/SignIn");
    },
    component: Account,
    children: [
      {
        path: "profile/:id",
        name: "profile",
        component: ProfileSection,
      },
      {
        path: "edit-profile",
        name: "EditProfile",
        component: EditProfile,
      },
      {
        path: "add-song",
        name: "AddSong",
        component: AddSongVue,
      },
      {
        path: "delete-song",
        name: "DeleteSong",
        component: DeleteSong,
      },
      {
        path: "add-video",
        name: "AddVideo",
        component: AddVideo,
      },
      {
        path: "delete-video",
        name: "DeleteVideo",
        component: DeleteVideo,
      },
      {
        path: "create-post",
        name: "CreatePost",
        component: CreatePost,
      },
      {
        path: "edit-post/:id",
        name: "EditPost",
        component: EditPost,
      },
      {
        path: "posts-page/:id",
        name: "PostsPage",
        component: PostsPage,
      },
      {
        path: "post-by-id/:id",
        name: "PostById",
        component: PostById,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
