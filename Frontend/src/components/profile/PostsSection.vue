<template>
  <div>
    <div>
      <div class="mx-auto py-4">
        <div
          class="flex flex-wrap justify-center sm:justify-start font-bold text-gray-100"
        >
          <div class="text-gray-900 text-xl">Мои посты</div>
          <div class="bg-green-500 w-full h-1"></div>
          <div
            class="flex justify-around sm:justify-end sm:w-full mt-4 mb-2 sm:my-4"
            v-if="userStore.id == route.params.id"
          >
            <my-button
              btnText="Создать пост"
              btnUrl="/account/create-post"
              btnColor="green"
              textColor="gray-900"
            />
          </div>
        </div>
        <div class="flex flex-wrap mb-4">
          <div
            v-for="post in postStore.posts"
            :key="post"
            class="my-1 px-1 w-full md:w-1/2 lg:w-1/2 text-center"
          >
            <div class="bg-white sm:border">
              <div class="flex justify-center items-center py-2">
                <router-link
                  :to="'/account/post-by-id/' + post.id"
                  class="rounded-full w-full sm:w-auto"
                  width="50"
                >
                  <img
                    class="border rounded-lg h-auto sm:h-28 w-full"
                    :src="post.image"
                    alt=""
                  />
                </router-link>
              </div>
              <div class="p-2 md:p-4">
                <div class="text-lg">
                  <router-link
                    class="underline text-blue-500 hover:text-blue-600"
                    :to="'/account/post-by-id/' + post.id"
                    >{{ post.title }}</router-link
                  >
                </div>
                <p class="py-2">Локация:{{ post.location }}</p>
                <p class="text-gray-darker text-md">{{ post.description }}</p>
                <div
                  v-if="userStore.id == route.params.id"
                  class="mt-2 flex item-center justify-around sm:justify-end"
                >
                  <router-link
                    class="mr-2 border border-green-500 border-solid sm:border-none bg-white sm:bg-blue-500 hover:bg-blue-700 text-gray-900 sm:text-white text-sm font-bold py-2 px-4 sm:rounded-full cursor-pointer"
                    :to="'/account/edit-post/' + post.id"
                    >Редактировать</router-link
                  >
                  <button
                    class="border border-red-500 border-solid sm:border-none bg-white sm:bg-red-500 hover:bg-red-700 text-gray-900 sm:text-white text-sm font-bold py-2 px-4 sm:rounded-full cursor-pointer"
                    @click="deletePost(post)"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import MyButton from "../global/MyButton.vue";
import { usePostStore } from "../../store/post-store";
import { useUserStore } from "../../store/user-store";
import axios from "axios";
import { onMounted, watch } from "vue";
const route: any = useRoute();

const postStore = usePostStore();
const userStore = useUserStore();
onMounted(async () => {
  const host = window.location.host;
  console.log(host);
  await postStore.fetchPosts(route.params.id);
});
const deletePost = async (post) => {
  let res = await axios.delete("/posts/" + userStore.id, { data: post });
  await postStore.fetchPosts(userStore.id);
  alert("Пост успешно удален");
};
watch(
  () => route.fullPath,
  () => {
    location.reload();
  }
);
</script>
