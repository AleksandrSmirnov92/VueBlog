<template>
  <div>
    <div class="mx-auto py-4">
      <div
        class="flex flex-wrap justify-center sm:justify-start font-bold text-gray-100"
      >
        <div class="text-gray-900 text-xl">Песни</div>
        <div class="bg-green-500 w-full h-1"></div>
        <div class="flex justify-around sm:justify-end w-full mt-4">
          <my-button
            btnText="Удалить песню"
            btnUrl="account/delete-song"
            btnColor="red"
          />
          <my-button
            class="ml-2"
            btnText="Добавить песню"
            btnUrl="account/add-song"
            btnColor="green"
          />
        </div>
      </div>
    </div>
    <div class="pb-4"><SongPlayer /></div>
  </div>
</template>

<script setup>
import MyButton from "../global/MyButton.vue";
import SongPlayer from "../profile/SongPlayer.vue";
</script>

<style scoped></style>
