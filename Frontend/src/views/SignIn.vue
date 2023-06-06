<script setup>
import TextInput from "../components/global/TextInput.vue";
import { ref } from "vue";
const email = ref(null);
const password = ref(null);
</script>
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
        class="text-center mb-6 flex flex-col text-gray-900 text-sm text-base font-bold"
      >
        Еще не зарегестрированы ?
        <router-link class="text-blue-400 px-8 hover:underline" to="/SignUp"
          >Зарегестрируйтесь</router-link
        >
      </p>
    </div>
  </div>
</template>
<style scoped></style>
