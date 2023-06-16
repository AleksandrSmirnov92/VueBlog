<template>
  <div id="AddSong" class="container mx-auto max-w-4xl pt-20 px-6">
    <div class="text-gray-900 text-xl">Удалить песню</div>
    <div class="bg-red-500 w-full h-1 mb-4"></div>

    <div class="bg-white rounded px-8 pt-6 pb-8">
      <div
        v-for="(song, index) in songStore.songs"
        :key="song"
        class="flex flex-wrap"
      >
        <div class="w-3/4 mr-auto mt-2 text-lg p-1 text-gray-900">
          {{ ++index }} {{ song.title }}
        </div>

        <div class="w-1/4 ml-auto p-1">
          <button
            @click="deleteSong(song)"
            class="float-right bg-transparent hover:bg-red-500 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

import { useSongStore } from "../../store/song-store";
import { useUserStore } from "../../store/user-store";
const userStore = useUserStore();
const songStore = useSongStore();
const deleteSong = async (song) => {
  try {
    await axios.delete("songs/" + userStore.id, { data: song });
    await songStore.fetchSongsByUserId(userStore.id);
    alert("Песня успешно удаленна");
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped></style>
