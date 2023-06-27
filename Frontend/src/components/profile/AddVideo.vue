<template>
  <div id="AddYoutubeVideo" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Добавить видео</div>
    <div class="bg-green-500 w-full h-1 mb-4"></div>

    <TextInput
      class="mb-6"
      label="Заголовок"
      placeholder="Заголовок для видео"
      v-model:input="title"
      inputType="text"
      :error="errorTitle"
    />

    <TextInput
      class="mb-2"
      label="Видео URL"
      placeholder="2VnYXKwneUQ"
      v-model:input="videoCode"
      inputType="text"
      error=""
    />

    <SubmitFormButton btnText="Добавить видео" @submit="addYoutubeVideoLink" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import TextInput from "../global/TextInput.vue";
import SubmitFormButton from "../global/SubmitFormButton.vue";
import axios from "axios";
import { useUserStore } from "../../store/user-store";
import { useVideoStore } from "../../store/video-store";
const userStore = useUserStore();
const videoStore = useVideoStore();
const router = useRouter();
let title = ref(null);
let videoCode = ref(null);
let errorTitle = ref(null);
const addYoutubeVideoLink = async () => {
  errorTitle.value = null;
  try {
    let res = await axios.post("/youtube", {
      user_id: userStore.id,
      title: title.value,
      url: videoCode.value,
    });
    if (res.data.status === "SUCCESS") {
      router.push("/account/profile/" + userStore.id);
    }
  } catch (err) {
    console.log(err.response.data.message);
    if (err.response.data.status === "ERROR_TITLE") {
      errorTitle.value = err.response.data.message;
    }
  }
};
</script>

<style scoped></style>
