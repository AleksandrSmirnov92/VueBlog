<template>
  <div v-if="image !== '../../images/User-avatar.svg.png'">
    <label
      class="block mt-4 uppercase tracking-wide text-xs font-bold mb-2 text-gray-900"
    >
      {{ label }}
    </label>

    <div class="w-60 h-auto">
      <img
        class="rounded w-full border-solid border-4 border-green-500"
        :src="image !== '../../images/User-avatar.svg.png' ? image : ''"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from "vue";
const props = defineProps({ label: String, image: String });
const { label, image } = toRefs(props);
</script>
