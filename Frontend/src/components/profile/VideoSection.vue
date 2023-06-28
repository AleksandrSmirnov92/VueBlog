<template>
  <div>
    <div class="mx-auto py-4">
      <div
        class="flex flex-wrap justify-center sm:justify-start font-bold text-gray-100"
      >
        <div class="text-gray-900 text-xl">Видео с YouTube</div>
        <div class="bg-green-500 w-full h-1"></div>
        <div
          class="flex justify-around sm:justify-end w-full mt-4"
          v-if="userStore.id == route.params.id"
        >
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
    <div class="flex flex-col sm:flex-row sm:flex-wrap mb-4">
      <div v-for="video of videoStore.videos" class="pr-1 pl-1 w-full md:w-1/2">
        <div class="my-1 px-1 w-full md:w-full text-center">
          <div class="text-xl text-gray-900">{{ video.title }}</div>
          <iframe class="w-full h-60" :src="video.url"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import MyButton from "../global/MyButton.vue";
import { useVideoStore } from "../../store/video-store";
import { useUserStore } from "../../store/user-store";
const videoStore = useVideoStore();
const userStore = useUserStore();
const route: any = useRoute();
onMounted(async () => {
  await videoStore.fetchVideo(route.params.id);
});
</script>
