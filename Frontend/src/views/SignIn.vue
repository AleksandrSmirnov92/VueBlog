<template>
  <div class="flex justify-center items-centr min-w-min">
    <div
      class="w-full sm:w-auto bg-gray-100 mt-0 sm:mt-6 sm:mb-6 shadow rounded"
    >
      <h1 class="mb-6 mt-6 text-lg text-gray-900 font-bold text-center">
        Авторизация
      </h1>
      <div class="mb-4 flex flex-col p-8">
        <TextInput
          label="Электронная почта"
          :labelColor="false"
          placeholder="Введите электроную почту"
          v-model:input="email"
          inputType="email"
          :error="errorEmail"
        />
        <TextInput
          label="Введите пароль"
          :labelColor="false"
          placeholder="Введите пароль"
          v-model:input="password"
          inputType="password"
          :error="errorPassword"
        />
        <button
          class="block bg-green-500 w-full text-white py-2 font-bold mt-6 cursor-pointer hover:bg-green-700 rounded-lg"
          type="submit"
          @click="login"
          @touchstart="login"
        >
          Войти
        </button>
      </div>
      <p
        class="text-center mb-6 flex flex-col text-gray-900 text-sm text-base font-bold"
      >
        Еще не зарегестрированы ?
        <router-link class="text-blue-400 px-8 hover:underline" to="/SignUp"
          >Зарегистрируйтесь</router-link
        >
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TextInput from "../components/global/TextInput.vue";
import { useUserStore } from "../store/user-store";
import { useProfileStore } from "../store/profile-store";
import { useSongStore } from "../store/song-store";
import { usePostStore } from "../store/post-store";
import { useVideoStore } from "../store/video-store";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const postStore = usePostStore();
const videoStore = useVideoStore();
const email = ref(null);
const password = ref(null);
const errorEmail = ref(null);
const errorPassword = ref(null);
const login = async () => {
  try {
    const res = await axios.post("/login", {
      email: email.value,
      password: password.value,
    });
    userStore.setUserDetails(res);
    // const user = JSON.parse(window.localStorage.getItem("user"));
    // axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;

    await profileStore.fetchProfile(userStore.id);
    await songStore.fetchSongsByUserId(userStore.id);
    await postStore.fetchPosts(userStore.id);
    await videoStore.fetchVideo(userStore.id);
    router.push("/account/profile/" + userStore.id);
  } catch (error) {
    if (error.response.data.message === "ERROR_EMAIL") {
      errorEmail.value = error.response.data.error;
      setTimeout(() => {
        errorEmail.value = "";
      }, 2000);
    }
    if (error.response.data.message === "ERROR_PASSWORD") {
      errorPassword.value = error.response.data.error;
      setTimeout(() => {
        errorPassword.value = "";
      }, 2000);
    }
  }
};
</script>
