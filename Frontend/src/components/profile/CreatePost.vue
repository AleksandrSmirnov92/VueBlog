<template>
  <div id="CreatePost" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <div class="text-gray-900 text-xl">Создать Пост</div>
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
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Локация"
          placeholder="Москва,МО"
          v-model:input="location"
          inputType="text"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <CropperButton
          label="Отправить фотографию"
          btnText="Добавить фотографию"
          @showModal="showModal = true"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full px-3">
        <CroppedImage label="Обрезаная фотография" :image="image" />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full px-3">
        <TextArea
          label="Описание"
          placeholder="Пожалуйста напишите информацию здесь"
          v-model:description="description"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-8 mb-6">
      <div class="w-full px-3">
        <SubmitFormButton btnText="Создать пост" @submit="createPost" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TextArea from "../global/TextArea.vue";
import SubmitFormButton from "../global/SubmitFormButton.vue";
import CroppedImage from "../global/CropperImage.vue";
import CropperButton from "../global/CropperButton.vue";
import TextInput from "../global/TextInput.vue";
import CropperModal from "../global/CropperModal.vue";
import { ref } from "vue";
let showModal = ref(false);
let title = ref(null);
let location = ref(null);
let description = ref(null);
// let imageData = null;
// let image = ref(null);
// let errors = ref([]);

// import { useUserStore } from "../../store/user-store";
// import { usePostStore } from "../../store/post-store";
// import { useRouter } from "vue-router";
// import axios from "axios";
// import Swal from "../../sweetalert2";
// const userStore = useUserStore();
// const postStore = usePostStore();
// const router = useRouter();

// const setCroppedImageData = (data) => {
//   imageData = data;
//   image.value = data.imageUrl;
// };
// const createPost = async () => {
//   errors.value = [];
//   if (imageData === null) {
//     Swal.fire(
//       "No cropped image found?",
//       "Please crop an image of your choice and complete all other inputs",
//       "warning"
//     );
//     return null;
//   }
//   let data = new FormData();
//   data.append("user_id", userStore.id || "");
//   data.append("title", title.value || "");
//   data.append("location", location.value || "");
//   data.append("description", description.value || "");

//   if (imageData) {
//     data.append("image", imageData.file || "");
//     data.append("height", imageData.height || "");
//     data.append("width", imageData.width || "");
//     data.append("left", imageData.left || "");
//     data.append("top", imageData.top || "");
//   }
//   try {
//     await axios.post("api/posts/", data);
//     Swal.fire(
//       "New post created!",
//       'The post you created was called "' + title.value + '"',
//       "success"
//     );
//     await postStore.fetchPostsByUserId(userStore.id);
//     router.push("/account/profile/" + userStore.id);
//   } catch (err) {
//     errors.value = err.response.data.errors;
//   }
// };
</script>

<style scoped></style>
