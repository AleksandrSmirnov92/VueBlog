<script setup></script>
<template>
  <div id="SignUp" class="w-full p-6 flex justify-center items-center">
    <div class="bg-gray-100 p-8 shadow rounded mb-6">
      <h1 class="mb-6 text-lg text-gray-900 font-bold text-center">
        Регистрация
      </h1>
      <div class="mb-4 flex flex-col">
        <label for="" class="text-gray-700 pb-4 pt-4 text-base font-bold"
          >Имя</label
        >
        <input
          class="appearance-none block w-full bg-white text-gray-700 border border-fray-400 rounded px-4 py-1 focus:outline-none focus:bg-gray-200 focus:border-gray-500"
          type="text"
        />
        <span class="text-red-600">Здесь будет сообщение об ошибке</span>
        <label for="" class="text-gray-700 pb-4 pt-4 text-base font-bold"
          >Фамилия</label
        >
        <input
          class="appearance-none block w-full bg-white text-gray-700 border border-fray-400 rounded px-4 py-1 focus:outline-none focus:bg-gray-200 focus:border-gray-500"
          type="text"
        />
        <span class="text-red-600">Здесь будет сообщение об ошибке</span>
        <label for="" class="text-gray-700 pb-4 pt-4 text-base font-bold"
          >Пароль</label
        >
        <input
          class="appearance-none block w-full bg-white text-gray-700 border border-fray-400 rounded px-4 py-1 focus:outline-none focus:bg-gray-200 focus:border-gray-500"
          type="text"
        />
        <span class="text-red-600">Здесь будет сообщение об ошибке</span>
        <label for="" class="text-gray-700 pb-4 pt-4 text-base font-bold"
          >Повторите пароль</label
        >
        <input
          class="appearance-none block w-full bg-white text-gray-700 border border-fray-400 rounded px-4 py-1 focus:outline-none focus:bg-gray-200 focus:border-gray-500"
          type="text"
        />
        <span class="text-red-600">Здесь будет сообщение об ошибке</span>
        <label for="" class="text-gray-700 pb-4 pt-4 text-base font-bold"
          >Электронная почта</label
        >
        <input
          class="appearance-none block w-full bg-white text-gray-700 border border-fray-400 rounded px-4 py-1 focus:outline-none focus:bg-gray-200 focus:border-gray-500"
          type="text"
        />
        <span class="text-red-600">Здесь будет сообщение об ошибке</span>
        <button
          class="block bg-green-500 w-full text-white py-2 font-bold mt-6 cursor-pointer hover:bg-green-700 rounded-lg"
          type="submit"
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
