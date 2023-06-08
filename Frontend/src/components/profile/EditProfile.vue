<template>
  <div
    id="EditProfile"
    class="flex flex-wrap justify-center sm:justify-start font-bold pt-20 pb-20 px-6"
  >
    <div class="text-gray-900 text-xl text-center">Редактировать профиль</div>
    <div class="bg-green-500 w-full h-1"></div>
    <CropperModal
      v-if="showModal"
      :minAspectRatioProp="{ width: 8, height: 8 }"
      :maxAspectRatioProp="{ width: 8, height: 8 }"
      @croppedImageData="setCroppedImageData"
      @showModal="showModal = false"
    />

    <div class="flex flex-wrap w-full mt-4 mb-6">
      <div class="w-full px-3 md:w-1/2">
        <TextInput
          label="Введите имя"
          placeholder="Введите имя"
          v-model:input="firstName"
          inputType="text"
          error="Тестовая ошибка"
        />
      </div>
      <div class="w-full px-3 md:w-1/2">
        <TextInput
          label="Введите фамилию"
          placeholder="Введите фамилию"
          v-model:input="lastName"
          inputType="text"
          error="Тестовая ошибка"
        />
      </div>
    </div>
    <div class="flex flex-wrap w-full mt-4 mb-6">
      <div class="w-full px-3 md:w-1/2">
        <TextInput
          label="Введите город"
          placeholder="Москва"
          v-model:input="location"
          inputType="text"
          error="Тестовая ошибка"
        />
        <CropperButton
          label="Фотография профиля"
          btnText="Обновите фотографию"
          @showModal="showModal = true"
        />
        <CropperImage label="Обрезаное изображение" :image="image" />
        <TextArea
          label="Описание"
          placeholder="Введите сюда информацию"
          v-model="description"
          error="тестовая ошибка"
        />
      </div>
      <div class="flex flex-wrap w-full mt-4 mb-6">
        <div class="w-full px-3">
          <SubmitFormButton btnText="Обновить профиль" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TextInput from "../global/TextInput.vue";
import TextArea from "../global/TextArea.vue";
import CropperButton from "../global/CropperButton.vue";
import SubmitFormButton from "../global/SubmitFormButton.vue";
import CropperModal from "../global/CropperModal.vue";
import CropperImage from "../global/CropperImage.vue";
import { ref } from "vue";
let firstName = ref(null);
let lastName = ref(null);
let location = ref(null);
let description = ref(null);
let showModal = ref(false);
// let imageData = ref();
let image = ref(null);
const setCroppedImageData = (data) => {
  // imageData = data;
  image.value = data.imageUrl;
};
</script>

<style scoped></style>
