import { defineStore } from "pinia";
import axios from "axios";
export const useSongStore = defineStore("song", {
  state: () => ({
    songs: [],
  }),
  actions: {
    async fetchSongsByUserId(userId: string) {
      const res = await axios.get("songs/" + userId);
      this.$state.songs = res.data.songs;
    },
    clearSongs() {
      this.$state.songs = [];
    },
  },
  persist: true,
});
