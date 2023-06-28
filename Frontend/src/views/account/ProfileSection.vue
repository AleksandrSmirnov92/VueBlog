<template>
  <div class="container max-w-4xl mx-auto flex flex-col sm:flex-row">
    <div class="w-full sm:w-1/3 flex justify-center mb-4">
      <div class="w-60 sm:w-full overflow-hidden mt-4">
        <img
          class="w-full rounded-lg h-auto shadow-lg"
          alt=""
          :src="profileStore.image"
        />
      </div>
    </div>

    <div class="sm:w-full sm:pl-4 sm:mt-4">
      <div class="flex flex-col justify-center sm:flex-row">
        <div class="w-full text-center md:text-left sm:w-1/2">
          <h1 class="text-2xl test-left md:text-left text-gray-900">
            {{ profileStore.firstName }} {{ profileStore.lastName }}
          </h1>
          <span class="text-md text-gray-700"
            ><i
              ><b>{{ profileStore.location }}</b></i
            ></span
          >
        </div>
        <div
          class="w-full flex justify-center sm:w-1/2 mt-2"
          v-if="userStore.id == route.params.id"
        >
          <my-button
            btnText="Редактировать профиль"
            btnUrl="/account/edit-profile"
            btnColor="green"
          />
        </div>
      </div>
      <ProfileInfoSection />
      <ProfileAboutSection />
    </div>
  </div>
  <SongSection />
  <VideoSection />
  <PostsSection />
</template>

<script lang="ts" setup>
import ProfileInfoSection from "../../components/profile/ProfileInfoSection.vue";
import ProfileAboutSection from "../../components/profile/ProfileAboutSection.vue";
import MyButton from "../../components/global/MyButton.vue";
import SongSection from "../../components/profile/SongSection.vue";
import VideoSection from "../../components/profile/VideoSection.vue";
import PostsSection from "../../components/profile/PostsSection.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "../../store/user-store";
import { useProfileStore } from "../../store/profile-store";
import { useRoute } from "vue-router";
const userStore = useUserStore();
const profileStore = useProfileStore();

const route: any = useRoute();
onMounted(async () => {
  await profileStore.fetchProfile(route.params.id);
  console.log(profileStore.image);
});
</script>
