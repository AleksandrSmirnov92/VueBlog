<template>
  <div id="AddSong" class="container max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Добавить песню</div>
    <div class="bg-green-500 w-full h-1 mb-4"></div>

    <TextInput
      class="mb-6"
      label="Заголовок"
      placeholder="Напишите заголовок для песни "
      v-model:input="title"
      inputType="text"
      :error="errorsTitle ? errorsTitle : ''"
    />

    <div class="w-full">
      <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        Выбрать песню
      </label>
      <input
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="file"
        id="song"
        ref="file"
        @change="handleFileUpload"
      />
    </div>

    <SubmitFormButton btnText="Add Song" @submit="addSong" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import TextInput from "../global/TextInput.vue";
import SubmitFormButton from "../global/SubmitFormButton.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user-store";
import { useSongStore } from "../../store/song-store";
const userStore = useUserStore();
const songStore = useSongStore();

const router = useRouter();
let title = ref("");
let song = ref(null);
let file = ref(null);
let errorsTitle = ref(null);
const handleFileUpload = () => {
  song.value = file.value.files[0];
};
const addSong = async () => {
  if (!song.value) {
    alert("Песня не добавлена");
    return null;
  }
  try {
    let data = new FormData();
    data.append("user_id", userStore.id);
    data.append("title", title.value || "");
    data.append("song", song.value);
    let res = await axios.post("/songs", data);
    if (res.data.status === "SUCCESS") {
      console.log("тут");
      errorsTitle.value = null;
      await songStore.fetchSongsByUserId(userStore.id);
      router.push("/account/profile/" + userStore.id);
    }
  } catch (err) {
    console.log(err);
    if (err.response.data.message === "Duplicate") {
      alert("Такая песня уже существует");
    }
    if (err.response.data.status === "title") {
      errorsTitle.value = err.response.data.message;
    }
  }
};
</script>
