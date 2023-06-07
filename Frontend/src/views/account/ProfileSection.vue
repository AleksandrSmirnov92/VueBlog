<template>
  <div class="container max-w-4xl mx-auto flex flex-col sm:flex-row mt-10">
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
          <my-button btnText="Редактировать текст" btnUrl="" btnColor="green" />
        </div>
      </div>
      <ProfileInfoSection />
      <ProfileAboutSection />
    </div>
  </div>
  <SongSection />
  <VideoSection />
  <PoastsSection />
</template>

<script setup>
import ProfileInfoSection from "../../components/profile/ProfileInfoSection.vue";
import ProfileAboutSection from "../../components/profile/ProfileAboutSection.vue";
import MyButton from "../../components/global/MyButton.vue";
import SongSection from "../../components/profile/SongSection.vue";
import VideoSection from "../../components/profile/VideoSection.vue";
import PoastsSection from "../../components/profile/PoastsSection.vue";
</script>

<style scoped></style>
