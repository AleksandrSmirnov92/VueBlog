<script setup>
import TextInput from "../components/global/TextInput.vue";
import { ref } from "vue";
const email = ref(null);
const password = ref(null);
</script>
<template>
  <div class="w-full p-6 flex justify-center items-centr">
    <div class="bg-gray-100 p-8 shadow rounded mb-6">
      <h1 class="mb-6 text-lg text-gray-900 font-bold text-center">
        Авторизация
      </h1>
      <div class="mb-4 flex flex-col">
        <TextInput
          label="Электронная почта"
          :labelColor="false"
          placeholder="Введите электроную почту"
          v-model:input="email"
          inputType="email"
          error="Тестовая ошибка"
        />
        <TextInput
          label="Введите пароль"
          :labelColor="false"
          placeholder="Введите пароль"
          v-model:input="password"
          inputType="password"
          error="Тестовая ошибка"
        />
        <button
          class="block bg-green-500 w-full text-white py-2 font-bold mt-6 cursor-pointer hover:bg-green-700 rounded-lg"
          type="submit"
        >
          Войти
        </button>
      </div>
      <p
        class="text-center flex flex-col text-gray-900 text-sm text-base font-bold"
      >
        Еще не зарегестрированы ?
        <router-link class="text-blue-400 hover:underline" to="/SignUp"
          >Зарегестрируйтесь</router-link
        >
      </p>
    </div>
  </div>
</template>
<style scoped></style>
