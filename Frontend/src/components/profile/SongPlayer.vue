<template>
  <div class="bg-green-500 rounded">
    <div id="aplayer"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
onMounted(() => {
  thePlayer();
});
const thePlayer = () => {
  new APlayer({
    container: document.getElementById("aplayer"),
    audio: [
      {
        name: "FirstSong",
        artist: "artist",
        url: "/music/dzharahov-the-hatters-v-pitere-mp3.mp3",
        cover: "cover.jpg",
      },
      {
        name: "SecondSong",
        artist: "artist",
        url: "/music/gudzon-mariya-mp3.mp3",
        cover: "cover.jpg",
      },
    ],
  });
};
</script>

<style scoped></style>
