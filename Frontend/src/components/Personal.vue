<script lang="ts" setup></script>
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
        Здесь может быть описание твоего проекта
      </p>
    </div>
    <div class="mt-8"></div>
    <div class="flex justify-center">
      <div class="flex flex-col sm:flex-row sm:justify-center sm:w-full">
        <router-link
          to="/SignIn"
          class="w-full sm:mx-4 sm:w-1/6 sm:min-w-min text-center my-2 px-2 py-2 bg-green-600 text-white front-semibold text-2xl shadow-md hover:bg-green-500 cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <span class="sm:mx-24">Войти</span> </router-link
        ><router-link
          class="w-full sm:mx-4 sm:w-1/6 sm:min-w-min text-center my-2 px-2 py-2 bg-blue-600 text-white front-semibold text-2xl shadow-md hover:bg-blue-500 cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          to="/SignUp"
        >
          <span class="sm:mx-7">Зарегестрироваться</span>
        </router-link>
      </div>
    </div>
  </div>
  <div class="videoDarkOverlay"></div>
  <video autoplay muted loop id="myVideo">
    <!-- <source
      src="../video/abstract_line.ogv"
      type="video/ogg"
      codecs="theora,
    vorbis"
    /> -->
    <source
      src="../video/abstract_line.mp4"
      type="video/mp4"
      codecs="avc1.42E01E, mp4a.40.2"
    />
    <source
      src="../video/abstract_line.webm"
      type="video/webm"
      codecs="vp8, vorbis"
    />
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
