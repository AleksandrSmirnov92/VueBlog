<template>
  <div class="w-full flex justify-center sm:justify-start">
    <div
      class="w-52 sm:w-1/2 font-bold text-gray-100 mt-4 rounded text-center bg-green-500 py-2 px-4 sm:p-2 sm:py-1"
    >
      Количество песен {{ songStore.songs.length }}
    </div>
  </div>
</template>

<script setup>
import { useSongStore } from "../../store/song-store";
const songStore = useSongStore();
</script>

<style scoped></style>
