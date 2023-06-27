<template>
  <button
    class="text-center sm:float-right mt-2 inline-block bg-green-500 hover:bg-green-700 font-bold text-white no-underline px-4 py-3"
    @click="$emit('submit', true)"
  >
    {{ btnText }}
  </button>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
const props = defineProps({
  btnText: String,
});
const { btnText } = toRefs(props);
</script>

<style scoped></style>
