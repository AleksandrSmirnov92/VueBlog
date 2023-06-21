<template>
  <div id="EditPost" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <div class="text-gray-900 text-xl">Редактировать пост</div>
    <div class="bg-green-500 w-full h-1"></div>

    <CropperModal
      v-if="showModal"
      :minAspectRatioProp="{ width: 16, height: 9 }"
      :maxAspectRatioProp="{ width: 16, height: 9 }"
      @croppedImageData="setCroppedImageData"
      @showModal="showModal = false"
    />

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Заголовок"
          placeholder="Шикарный пост"
          v-model:input="title"
          inputType="text"
          :error="errors.title ? errors.title[0] : ''"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Локация"
          placeholder="Москва,МО"
          v-model:input="location"
          inputType="text"
          :error="errors.location ? errors.location[0] : ''"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <CropperButton
          label="Отправить изображение"
          btnText="Обновите изображение"
          @showModal="showModal = true"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full px-3">
        <CropperImage label="Обрезаное изображение" :image="image" />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full px-3">
        <TextArea
          label="Описание"
          placeholder="Пожалуйста напишите описание"
          v-model:description="description"
          :error="errors.description ? errors.description[0] : ''"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-8 mb-6">
      <div class="w-full px-3">
        <SubmitFormButton btnText="Обновить пост" @submit="updatePost" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SubmitFormButton from "../global/SubmitFormButton.vue";
import TextArea from "../global/TextArea.vue";
import CropperImage from "../global/CropperImage.vue";
import CropperButton from "../global/CropperButton.vue";
import TextInput from "../global/TextInput.vue";
import CropperModal from "../global/CropperModal.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { usePostStore } from "../../store/post-store";
import { useUserStore } from "../../store/user-store";
const postStore = usePostStore();
const userStore = useUserStore();
let showModal = ref(false);
let errors = ref([]);
let title = ref(null);
let location = ref(null);
let description = ref(null);
let imageData = null;
let image = ref(null);
let imageName = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await getPostById();
});
const setCroppedImageData = (data) => {
  imageData = data;
  image.value = data.imageUrl;
};
const getPostById = async () => {
  try {
    let res = await axios.get("post/" + route.params.id);
    if (res.data.message === "SUCCESS") {
      console.log(res.data.post.image);
      title.value = res.data.post.title;
      location.value = res.data.post.location;
      image.value = res.data.post.image;
      description.value = res.data.post.description;
      imageName.value = res.data.post.imageName;
    }
  } catch (err) {
    // обработать ошибки на title,location,description
    // errors.value = err.response.data.errors;
    console.log(err);
  }
};
const updatePost = async () => {
  let data = new FormData();
  data.append("user_id", userStore.id || "");
  data.append("title", title.value || "");
  data.append("location", location.value || "");
  data.append("description", description.value || "");
  data.append("image", image.value || "");
  data.append("imageName", imageName.value || "");

  if (imageData) {
    data.append("image", imageData.file || "");
    data.append("height", imageData.height || "");
    data.append("width", imageData.width || "");
    data.append("left", imageData.left || 0);
    data.append("top", imageData.top || "");
  }

  try {
    console.log(image.value);
    await axios.post("posts/" + route.params.id + "?_method=PUT", data);
    await postStore.fetchPosts(userStore.id);
    router.push("/account/profile");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
