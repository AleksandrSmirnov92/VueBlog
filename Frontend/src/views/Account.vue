<template>
  <TopNavigation />
  <div id="AccountVue" class="max-w-4xl mx-auto">
    <RouterView />
  </div>
  <FooterMenu />
</template>

<script lang="ts" setup>
import TopNavigation from "../components/navigation/TopNavigation.vue";
import FooterMenu from "../components/navigation/FooterMenu.vue";
</script>

<style scoped>
#AccountVue {
  min-height: 70vh;
}
</style>
