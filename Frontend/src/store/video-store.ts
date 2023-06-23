import { defineStore } from "pinia";
import axios from "axios";
export const useVideoStore = defineStore("video", {
  state: () => ({
    videos: null,
  }),
  actions: {
    async fetchVideo(user_id: string) {
      const res = await axios.get("/youtube/" + user_id);
      this.$state.videos = res.data.videos;
    },
    clearVideos() {
      this.$state.videos = null;
    },
  },
  persist: true,
});
