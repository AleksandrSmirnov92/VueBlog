<template>
  <nav class="w-full px-4 bg-black relative z-20 text-white-200">
    <div
      class="conteiner mx-auto max-w-4xl h-16 flex justify-between text-xs md:text-sm"
    >
      <div class="h-full flex item-center">
        <router-link class="flex justify-center items-center" to="">
          <div class="text-white text-2xl"><b>ASV</b></div>
        </router-link>
      </div>
      <div class="h-full flex items-center">
        <ModalMenu />
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import ModalMenu from "./ModalMenu.vue";
</script>

<style scoped></style>
