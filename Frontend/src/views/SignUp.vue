<script setup>
import TextInput from "../components/global/TextInput.vue";
import { ref } from "vue";
const firstName = ref(null);
const lastName = ref(null);
const password = ref(null);
const repeatPassword = ref(null);
const email = ref(null);
function showFirstName(params) {
  console.log(firstName.value);
}
</script>
<template>
  <div id="SignUp" class="w-full p-6 flex justify-center items-center">
    <div class="bg-gray-100 p-8 shadow rounded mb-6">
      <h1 class="mb-6 text-lg text-gray-900 font-bold text-center">
        Регистрация
      </h1>
      <div class="mb-4 flex flex-col">
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
          @click="showFirstName"
        >
          Зарегестрироваться
        </button>
      </div>
      <p
        class="text-center flex flex-col text-gray-900 text-sm text-base font-bold"
      >
        Уже есть учетная запись ?
        <router-link class="text-blue-400 hover:underline" to="/SignIn"
          >Войти</router-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped></style>
