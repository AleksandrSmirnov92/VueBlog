<script setup></script>
<template>
  <div class="container-personal">
    <div class="px-4 md:w-3/4 lg:w-2/3 mx-auto text-center">
      <h1
        class="text-4xl sm:text-5xl md:text-5xl leading-tight text-center text-gray-100 mb-3"
      >
        Мой блог
      </h1>
      <p class="pt-2 text-xl text-center text-gray-300">
        Авторизируйся или зарегестрируйся
      </p>
      <p class="py-4 text-xl text-center text-gray-300">
        Здесь описание моего проекта
      </p>
    </div>
    <div class="mt-8"></div>
    <div class="flex justify-center">
      <div class="flex justify-between w-2/6 justify-items-center">
        <router-link
          to="/SignIn"
          class="w-full text-center mr-1 py-2 px-4 bg-green-600 text-white front-semibold text-2xl shadow-md hover:bg-green-500 cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Войти </router-link
        ><router-link
          class="w-full text-center mr-1 py-2 px-4 bg-blue-600 text-white front-semibold text-2xl shadow-md hover:bg-blue-500 cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          to="/SignUp"
          >Зарегестрироваться</router-link
        >
      </div>
    </div>
  </div>
  <div class="videoDarkOverlay"></div>
  <video autoplay muted loop id="myVideo">
    <source src="../video/abstract_line5.mp4" type="video/mp4" />
  </video>
</template>
<style scoped>
.container-personal {
  width: 100%;
  position: absolute;
  top: 30%;
  z-index: 1;
}
#myVideo {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
}
</style>
