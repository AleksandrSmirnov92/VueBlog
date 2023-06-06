<template>
  <div class="container max-w-4xl mx-auto flex flex-col sm:flex-row">
    <div class="sm:w-1/3 overflow-hidden mt-4">
      <img
        class="w-full rounded-lg h-auto shadow-lg"
        alt=""
        src="../../../images/ImPhoto.jpeg"
      />
    </div>
    <div class="sm:w-full sm:pl-4 sm:mt-4">
      <div class="flex flex-col justify-center sm:flex-row">
        <div class="w-full text-center md:text-left sm:w-1/2">
          <h1 class="text-2xl test-left md:text-left text-gray-900">
            Александр Смирнов
          </h1>
          <span class="text-md text-gray-700"
            ><i><b>Moscow,Rus</b></i></span
          >
        </div>
        <div class="w-full flex justify-center sm:w-1/2 mt-4 mt-2">
          <router-link
            class="text-center sm:float-right bg-transparent text-gray-900 font-semi-bold hover:text-white py-2 px-4 border hover:border-transparent rounded hover:bg-green-500 border-green-500"
            to=""
            >Редактировать профиль
          </router-link>
        </div>
      </div>
      <ProfileInfoSection />
      <ProfileAboutSection />
    </div>
  </div>
</template>

<script setup>
import ProfileInfoSection from "../../components/profile/ProfileInfoSection.vue";
import ProfileAboutSection from "../../components/profile/ProfileAboutSection.vue";
</script>

<style scoped></style>
