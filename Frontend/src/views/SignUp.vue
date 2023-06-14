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
          error="Тестовая ошибка"
        />
        <TextInput
          label="Фамилия"
          :labelColor="false"
          placeholder="Введите Фамилию"
          v-model:input="lastName"
          inputType="text"
          error="Тестовая ошибка"
        />
        <TextInput
          label="Пароль"
          :labelColor="false"
          placeholder="Введите пароль"
          v-model:input="password"
          inputType="password"
          error="Тестовая ошибка"
        />

        <TextInput
          label="Повторите пароль"
          :labelColor="false"
          placeholder="Повторите пароль"
          v-model:input="repeatPassword"
          inputType="password"
          error="Тестовая ошибка"
        />
        <TextInput
          label="Электронная почта"
          :labelColor="false"
          placeholder="Введите электронную почту"
          v-model:input="email"
          inputType="Email"
          error="Тестовая ошибка"
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
import { ref } from "vue";
const userStore = useUserStore();
const errors = ref([]);
const firstName = ref(null);
const lastName = ref(null);
const password = ref(null);
const repeatPassword = ref(null);
const email = ref(null);
const register = async () => {
  try {
    const res = await axios.post("http://localhost:9999/register", {
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      email: email.value,
    });
    console.log(res);
    userStore.setUserDetails(res);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped></style>
