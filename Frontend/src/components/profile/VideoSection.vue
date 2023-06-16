<template>
  <div>
    <div class="mx-auto py-4">
      <div
        class="flex flex-wrap justify-center sm:justify-start font-bold text-gray-100"
      >
        <div class="text-gray-900 text-xl">Видео с YouTube</div>
        <div class="bg-green-500 w-full h-1"></div>
        <div class="flex justify-around sm:justify-end w-full mt-4">
          <my-button
            btnText="Удалить видео"
            btnUrl="/account/delete-video"
            btnColor="red"
          />
          <my-button
            class="ml-2"
            btnText="Добавить видео"
            btnUrl="/account/add-video"
            btnColor="green"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap mb-4">
      <div class="my-1 px-1 w-full md:w-1/2 lg:w-1/2 text-center">
        <div class="text-xl text-gray-900">Заголовок Видео</div>
        <iframe
          class="w-full h-60"
          src="https://www.youtube.com/embed/OFvXuyITwBI?autoplay=0"
        ></iframe>
        {{ videoStore }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import MyButton from "../global/MyButton.vue";
import { useVideoStore } from "../../store/video-store";
import { useUserStore } from "../../store/user-store";
const videoStore = useVideoStore();
const userStore = useUserStore();
onMounted(() => {
  videoStore.fetchVideo(userStore.id);
});
</script>

<style scoped></style>
