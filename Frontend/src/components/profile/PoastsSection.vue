<template>
  <div>
    <div>
      <div class="mx-auto py-4">
        <div
          class="flex flex-wrap justify-center sm:justify-start font-bold text-gray-100"
        >
          <div class="text-gray-900 text-xl">Создать пост</div>
          <div class="bg-green-500 w-full h-1"></div>
          <div class="flex justify-around sm:justify-end w-full mt-4">
            <my-button
              btnText="Создать пост"
              btnUrl="account/create-post"
              btnColor="green"
            />
          </div>
        </div>
        <div class="flex flex-wrap mb-4">
          <div class="my-1 px-1 w-full md:w-1/2 lg:w-1/2 text-center">
            <div class="bg-white sm:border">
              <div class="w-full flex justify-center sm:justify-start">
                <a href="#" class="pt-4 sm:pl-4 w-16">
                  <img
                    class="border rounded-lg h-auto w-16"
                    src="../../../images/ImPhoto.jpeg"
                    alt=""
                  />
                </a>
              </div>

              <div class="p-2 md:p-4">
                <div class="text-lg">
                  <router-link
                    class="underline text-blue-500 hover:text-blue-600"
                    to=""
                    >Название теста</router-link
                  >
                </div>
                <p class="py-2">место для тестирования</p>
                <p class="text-gray-darker text-md">Фиктивный текст</p>
                <div
                  class="mt-2 flex item-center justify-around sm:justify-end"
                >
                  <router-link
                    class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded-full"
                    to="#"
                    >Редактировать</router-link
                  >
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded-full cursor-pointer"
                    to=""
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

<script setup>
import MyButton from "../global/MyButton.vue";
</script>

<style scoped></style>
