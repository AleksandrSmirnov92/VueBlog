<template>
  <div v-if="description !== ''" class="py-2 text-center sm:text-left">
    <p class="text-gray-900 text-lg">
      <b>Обо мне</b>
    </p>
    <p class="text-gray-600 text-md md:text-lg leading-normal">
      {{ profileStore.description }}
    </p>
  </div>
</template>

<script setup>
import { useProfileStore } from "../../store/profile-store";
const profileStore = useProfileStore();
</script>

<style lang="scss" scoped></style>
