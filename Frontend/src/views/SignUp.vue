<template>
  <div id="SignUp" class="flex justify-center items-centr min-w-min">
    <div
      class="w-full sm:w-auto bg-gray-100 mt-0 sm:mt-6 sm:mb-6 shadow rounded"
    >
      <h1 class="mb-6 mt-6 text-lg text-gray-900 font-bold text-center">
        Регистрация
      </h1>
      <div class="mb-4 flex flex-col p-8">
        <TextInput
          label="Имя"
          :labelColor="false"
          placeholder="Введите имя"
          v-model:input="firstName"
          inputType="text"
          :error="errorFirstName"
        />
        <TextInput
          label="Фамилия"
          :labelColor="false"
          placeholder="Введите Фамилию"
          v-model:input="lastName"
          inputType="text"
          :error="errorLastName"
        />
        <TextInput
          label="Пароль"
          :labelColor="false"
          placeholder="Введите пароль"
          v-model:input="password"
          inputType="password"
          :error="errorPassword"
        />

        <TextInput
          label="Повторите пароль"
          :labelColor="false"
          placeholder="Повторите пароль"
          v-model:input="repeatPassword"
          inputType="password"
          :error="errorRepeatPassword"
        />
        <TextInput
          label="Электронная почта"
          :labelColor="false"
          placeholder="Введите электронную почту"
          v-model:input="email"
          inputType="Email"
          :error="errorEmail"
        />
        <button
          class="block bg-green-500 w-full text-white py-2 font-bold mt-6 cursor-pointer hover:bg-green-700 rounded-lg"
          type="submit"
          @click="register"
        >
          Зарегестрироваться
        </button>
      </div>
      <p
        class="mb-6 text-center flex flex-col text-gray-900 text-sm text-base font-bold"
      >
        Уже есть учетная запись ?
        <router-link class="text-blue-400 hover:underline" to="/SignIn"
          >Войти</router-link
        >
      </p>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import TextInput from "../components/global/TextInput.vue";
import { useUserStore } from "../store/user-store";
import { useProfileStore } from "../store/profile-store";
import { useSongStore } from "../store/song-store";
import { usePostStore } from "../store/post-store";
import { useVideoStore } from "../store/video-store";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const postStore = usePostStore();
const videoStore = useVideoStore();
const firstName = ref(null);
const lastName = ref(null);
const password = ref(null);
const repeatPassword = ref(null);
const email = ref(null);
const errorFirstName = ref(null);
const errorLastName = ref(null);
const errorPassword = ref(null);
const errorRepeatPassword = ref(null);
const errorEmail = ref(null);
const register = async () => {
  try {
    const res = await axios.post("/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
      email: email.value,
    });
    // const user = JSON.parse(window.localStorage.getItem("user"));
    // axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    userStore.setUserDetails(res);
    profileStore.fetchProfile(userStore.id);
    songStore.fetchSongsByUserId(userStore.id);
    postStore.fetchPosts(userStore.id);
    videoStore.fetchVideo(userStore.id);
    router.push("/account/profile/" + userStore.id);
  } catch (error) {
    if (error.response.data.message === "ERROR_FIRST_NAME") {
      errorFirstName.value = error.response.data.error;
      setTimeout(() => {
        errorFirstName.value = "";
      }, 2000);
    }
    if (error.response.data.message === "ERROR_LAST_NAME") {
      errorLastName.value = error.response.data.error;
      setTimeout(() => {
        errorLastName.value = "";
      }, 2000);
    }
    if (error.response.data.message === "ERROR_PASSWORD") {
      errorPassword.value = error.response.data.error;
      setTimeout(() => {
        errorPassword.value = "";
      }, 2000);
    }
    if (error.response.data.message === "ERROR_REPEAT_PASSWORD") {
      errorRepeatPassword.value = error.response.data.error;
      setTimeout(() => {
        errorRepeatPassword.value = "";
      }, 2000);
    }
    if (error.response.data.message === "ERROR_EMAIL") {
      errorEmail.value = error.response.data.error;
      setTimeout(() => {
        errorEmail.value = "";
      }, 2000);
    }
  }
};
</script>
<style scoped></style>
