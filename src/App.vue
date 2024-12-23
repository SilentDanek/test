<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Notifications />
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
import Notifications from "@components/Notifications.vue";
</script>

<style scoped>
main {
  max-width: 1200px;
  margin: auto;
}
</style>