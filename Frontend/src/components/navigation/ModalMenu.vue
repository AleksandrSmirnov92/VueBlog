<template>
  <div>
    <button
      @click="open = !open"
      class="bg-transparent hover:bg-green-400 text-white font-semibold hover:text-white py-1 px-2 hover:border-transparent rounded"
    >
      <i class="fa-solid fa-bars fa-xl"></i>
    </button>
    <div
      v-show="open"
      class="animated slideInDown faster fixed h-full w-full top-0 left-0 flex justify-center backdrop-blur-sm"
    >
      <div class="bg-black absolute w-full h-full opacity-75"></div>
      <div class="my-auto fixed border-white w-80 pt-16">
        <p class="text-2xl text-center text-white text-bold">Меню</p>
        <div class="pt-4 text-center">
          <my-button
            class="w-full text-white text-lg px-7 sm:px-auto"
            btnText="Профиль"
            btnUrl="/account/profile"
            btnColor="green"
          />
        </div>
        <div class="pt-10 sm:mt-4 text-center">
          <my-button
            @click="open = !open"
            class="w-full text-white text-lg px-8 sm:px-auto"
            btnText="Закрыть"
            btnColor="red"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyButton from "../global/MyButton.vue";
import { ref } from "vue";
const open = ref(false);
</script>

<style scoped></style>
