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
          v-model:description="description"
          error="тестовая ошибка"
        />
      </div>
      <div class="flex flex-wrap w-full mt-4 mb-6">
        <div class="w-full px-3">
          <SubmitFormButton @click="udateProfil" btnText="Обновить профиль" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../store/user-store";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import TextInput from "../global/TextInput.vue";
import TextArea from "../global/TextArea.vue";
import CropperButton from "../global/CropperButton.vue";
import SubmitFormButton from "../global/SubmitFormButton.vue";
import CropperModal from "../global/CropperModal.vue";
import CropperImage from "../global/CropperImage.vue";
const router = useRouter();
const userStore = useUserStore();
const errors = ref([]);
let firstName = ref(null);
let lastName = ref(null);
let location = ref(null);
let description = ref(null);
let showModal = ref(false);
let imageData = null;
let image = ref(null);

onMounted(() => {
  userStore.fetchUser();
  firstName.value = userStore.firstName || null;
  lastName.value = userStore.lastName || null;
  location.value = userStore.location || null;
  description.value = userStore.description || null;
  image.value = userStore.image || null;
});
const setCroppedImageData = (data) => {
  imageData = data;
  image.value = data.imageUrl;
};
const udateProfil = async () => {
  let data = new FormData();
  data.append("first_name", firstName.value || "");
  data.append("last_name", lastName.value || "");
  data.append("location", location.value || "");
  data.append("description", description.value || "");
  data.append("image", image.value || "");

  if (imageData) {
    data.append("image", imageData.file || "");
    data.append("height", imageData.height || "");
    data.append("width", imageData.width || "");
    data.append("left", imageData.left || "");
    data.append("top", imageData.top || "");
  }

  try {
    await axios.post("users/" + userStore.id + "?_method=PUT", data);
    await userStore.fetchUser();
    router.push("/account/profile");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
