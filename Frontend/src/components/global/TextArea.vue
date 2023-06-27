<template>
  <div>
    <label
      class="block uppercase tracking-white text-gray-900 text-xs font-bold mt-4"
    >
      {{ label }}
    </label>
    <textarea
      class="mt-4 appearance-none block w-full bg-white text-gray-700 border border-fray-400 rounded px-4 py-1 focus:outline-none focus:bg-gray-200 focus:border-gray-500"
      v-model="descriptionComputed"
      :placeholder="placeholder"
      cols="5"
      rows="5"
    ></textarea>
    <span v-if="error" class="text-red-500">{{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from "vue";
const emit = defineEmits(["update:description"]);
const props = defineProps({
  label: String,
  description: String,
  placeholder: { type: String, default: "" },
  error: String,
});
const { label, description, placeholder, error } = toRefs(props);
const descriptionComputed = computed({
  get: () => description.value,
  set: (val) => emit("update:description", val),
});
</script>

<style scoped></style>
