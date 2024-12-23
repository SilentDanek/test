<template>
  <header class="header">
    <nav class="navigation">
      <router-link to="/projects" class="nav-link">Проекты</router-link>
      <router-link to="/dashboard" class="nav-link">Дашборд</router-link>
    </nav>
  </header>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.header {
  background-color: #2e2e2e;
  padding: 10px 20px;
}

.navigation {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
}
</style>
