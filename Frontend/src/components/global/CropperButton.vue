<template>
  <div>
    <label
      class="mt-4 block uppercase tracking-white text-gray-900 text-xs font-bold"
    >
      {{ label }}
    </label>
    <button
      class="mt-2 inline-block bg-green-500 hover:bg-green-700 text-white font-bold no-underline px-4 py-3"
      @click="$emit('showModal', true)"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
const props = defineProps({
  btnText: String,
  label: String,
});
const { btnText, label } = toRefs(props);
</script>

<style scoped></style>
