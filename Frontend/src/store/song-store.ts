import { defineStore } from "pinia";
import axios from "axios";
export const useSongStore = defineStore("song", {
  state: () => ({
    songs: null,
  }),
  actions: {
    async fetchSongsByUserId(userId: string) {
      const res = await axios.get("songs/" + userId);
      this.$state.songs = res.data.songs;
    },
    async clearSongs() {
      this.$state.songs = null;
    },
  },
  persist: true,
});
