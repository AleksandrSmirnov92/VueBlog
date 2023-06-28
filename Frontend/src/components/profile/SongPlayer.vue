<template>
  <div class="bg-green-500 rounded">
    <div id="aplayer"></div>
  </div>
</template>

<script lang="ts" setup>
import { useSongStore } from "../../store/song-store";
import { useUserStore } from "../../store/user-store";
import { onMounted } from "vue";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
const songStore = useSongStore();
const userStore = useUserStore();
const songList = [];
onMounted(() => {
  setTimeout(() => {
    if (songStore.songs !== null) {
      mapSongs();
    }
    thePlayer();
  }, 1000);
});
const mapSongs = () => {
  let newSongs = songStore.songs.map((song) => {
    return {
      name: song.title,
      artist: song.songName,
      url: song.song,
      cover: "cover.jpg",
    };
  });
  for (let i = 0; i < newSongs.length; i++) {
    songList.push(newSongs[i]);
  }
};
const thePlayer = () => {
  new APlayer({
    container: document.getElementById("aplayer"),
    audio: songList,
  });
};
</script>
