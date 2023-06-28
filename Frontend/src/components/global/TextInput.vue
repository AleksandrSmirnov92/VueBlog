<template>
  <div>
    <label
      for=""
      class="text-gray-700 pb-4 pt-4 text-base font-bold"
      :class="labelColor ? 'text-gray-900' : 'text-gray-100'"
      >{{ label }}</label
    >
    <input
      :placeholder="placeholder"
      class="appearance-none block w-full bg-white text-gray-700 border border-fray-400 rounded px-4 py-1 focus:outline-none focus:bg-gray-200 focus:border-gray-500"
      :type="inputType"
      v-model="inputComputed"
    />
    <span v-if="error" class="text-red-600">{{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from "vue";
const props = defineProps({
  label: String,
  labelColor: { type: Boolean, default: true },
  input: String,
  placeholder: { type: String, default: true },
  inputType: String,
  error: String,
});

const emit = defineEmits(["update:input"]);
const { label, labelColor, input, placeholder, inputType, error } =
  toRefs(props);
const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val),
});
</script>
