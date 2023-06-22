<template>
  <div>
    <button
      @click="open = !open"
      class="bg-transparent hover:bg-green-400 text-white font-semibold hover:text-white py-1 px-2 hover:border-transparent rounded"
    >
      <i class="fa-solid fa-bars fa-xl"></i>
    </button>
    <div
      v-show="open"
      class="animated slideInDown faster fixed h-full w-full top-0 left-0 flex justify-center backdrop-blur-sm"
    >
      <div class="bg-black absolute w-full h-full opacity-75"></div>
      <div class="my-auto fixed border-white w-80 pt-16">
        <p class="text-2xl text-center text-white text-bold">Меню</p>
        <div class="pt-4 text-center">
          <my-button
            v-if="userStore.id"
            @click="open = !open"
            class="w-full text-white text-lg px-7 sm:px-auto mb-2"
            btnText="Профиль"
            :btnUrl="`/account/profile/` + userStore.id"
            btnColor="green"
          />
          <my-button
            v-if="userStore.id"
            @click="open = !open"
            class="w-full text-white text-lg px-7 sm:px-auto mb-2"
            btnText="Посты"
            :btnUrl="'/account/posts-page/' + userStore.id"
            btnColor="green"
          />
        </div>
        <div class="pt-10 sm:mt-4 text-center">
          <my-button
            v-if="!userStore.id"
            @click="open = !open"
            class="w-full text-white text-lg px-7 sm:px-auto mb-2"
            btnText="Войти"
            btnUrl="/SignIn"
            btnColor="green"
          />
          <my-button
            v-if="!userStore.id"
            @click="open = !open"
            class="w-full text-white text-lg px-7 sm:px-auto mb-2"
            btnText="Регистрация"
            btnUrl="/SignUp"
            btnColor="green"
          />
          <my-button
            v-if="userStore.id"
            @click="logout"
            class="w-full text-white text-lg px-7 sm:px-auto mb-2"
            btnText="Выйти"
            btnColor="green"
          />
        </div>
        <div class="pt-10 sm:mt-4 text-center">
          <my-button
            @click="open = !open"
            class="w-full text-white text-lg px-8 sm:px-auto"
            btnText="Закрыть"
            btnColor="red"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyButton from "../global/MyButton.vue";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user-store";
import { useProfileStore } from "../../store/profile-store";
import { useSongStore } from "../../store/song-store";
import { usePostStore } from "../../store/post-store";
import { useVideoStore } from "../../store/video-store";
const router = useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const postStore = usePostStore();
const videoStore = useVideoStore();
const open = ref(false);

const logout = async () => {
  try {
    let res = await axios.post("logout", {
      user_id: userStore.id,
    });
    await userStore.clearUser();
    await profileStore.clearProfile();
    await songStore.clearSongs();
    videoStore.clearVideos();
    postStore.clearPosts();

    router.push("/");
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped></style>
