<template>
  <router-link
    class="text-center bg-transparent font-semi-bold hover:text-white py-2 px-4 border hover:border-transparent rounded hover:bg-green-500 border-green-500"
    :to="btnUrl"
    :class="[
      btnColor ? `hover:bg-${btnColor}-500 border-${btnColor}-500` : '',
      textColor ? `text-${textColor}` : '',
    ]"
    >{{ btnText }}
  </router-link>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
const props = defineProps({
  btnText: String,
  btnUrl: { type: String, default: "" },
  btnColor: String,
  textColor: String,
});
const { btnText, btnUrl, btnColor, textColor } = toRefs(props);
</script>
