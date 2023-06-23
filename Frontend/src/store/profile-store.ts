import axios from "axios";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    location: null,
    image: null as any,
    description: null,
  }),
  actions: {
    async fetchProfile(id: string) {
      try {
        let res = await axios.get("/users/" + id);
        console.log(res);
        this.$state.id = res.data.user.id;
        this.$state.firstName = res.data.user.first_name;
        this.$state.lastName = res.data.user.last_name;
        this.$state.location = res.data.user.location;
        this.$state.description = res.data.user.description;
        this.$state.image =
          res.data.user.image !== null
            ? res.data.user.image
            : "../../images/User-avatar.svg.png";
      } catch (error) {
        this.$state.description = null;
        this.$state.image = "../../images/User-avatar.svg.png";
        this.$state.id = null;
        this.$state.firstName = null;
        this.$state.lastName = null;
        this.$state.location = null;
      }
    },
    clearProfile() {
      this.$state.id = null;
      this.$state.firstName = null;
      this.$state.lastName = null;
      this.$state.email = null;
      this.$state.location = null;
      this.$state.image = null;
      this.$state.description = null;
    },
  },
  persist: true,
});
