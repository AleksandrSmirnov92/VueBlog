<template>
  <router-link
    class="text-center sm:float-right bg-transparent text-gray-900 font-semi-bold hover:text-white py-2 px-4 border hover:border-transparent rounded hover:bg-green-500 border-green-500"
    :to="btnUrl"
    :class="[btnColor ? `hover:bg-${btnColor}-500 border-${btnColor}-500` : '']"
    >{{ btnText }}
  </router-link>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  btnText: String,
  btnUrl: { type: String, default: "" },
  btnColor: String,
});
const { btnText, btnUrl, btnColor } = toRefs(props);
</script>

<style scoped></style>
