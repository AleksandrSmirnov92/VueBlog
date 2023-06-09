import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    image: null as any,
    description: null,
  }),
  actions: {
    async setUserDetails(res: any) {
      this.$state.id = res.data.user.id;
      this.$state.token = res.data.jwt;
      this.$state.firstName = res.data.user.first_name;
      this.$state.lastName = res.data.user.last_name;
      this.$state.email = res.data.user.email;
      this.$state.location = res.data.user.location;
      this.$state.image = res.data.user.image;
      this.$state.description = res.description;
    },
    async fetchUser() {
      const res = await axios.get("/users/" + this.$state.id);
      this.$state.id = res.data.user.id;
      this.$state.firstName = res.data.user.first_name;
      this.$state.lastName = res.data.user.last_name;
      this.$state.location = res.data.user.location;
      this.$state.description = res.data.user.description;
      if (res.data.user.image) {
        this.$state.image = res.data.user.image;
      } else {
        this.$state.image =
          "https://hlsivvkunvjmwgegcrzt.supabase.co/storage/v1/object/public/defaultFoto/User.png";
      }
    },
    clearUser() {
      this.$state.id = null;
      this.$state.token = null;
      this.$state.firstName = null;
      this.$state.lastName = null;
      this.$state.email = null;
      this.$state.location = null;
      this.$state.image =
        "https://hlsivvkunvjmwgegcrzt.supabase.co/storage/v1/object/public/defaultFoto/User.png";
      this.$state.description = null;
    },
  },
  persist: true,
});
