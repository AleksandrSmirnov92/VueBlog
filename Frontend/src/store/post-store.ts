import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: null,
  }),
  actions: {
    async fetchPosts(user_id: string) {
      let res = await axios.get("posts/" + user_id, {
        params: { page: 0 },
      });

      this.$state.posts = res.data.posts;
    },
    clearPosts() {
      this.$state.posts = null;
    },
  },
  persist: true,
});
