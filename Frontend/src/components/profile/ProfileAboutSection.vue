<template>
  <div v-if="description !== ''" class="py-2 text-center sm:text-left">
    <p class="text-gray-900 text-lg">
      <b>Обо мне</b>
    </p>
    <p class="text-gray-600 text-md md:text-lg leading-normal">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { useUserStore } from "../../store/user-store";
const userStore = useUserStore();
import { ref } from "vue";
const description = ref(userStore.description);
</script>

<style lang="scss" scoped></style>
