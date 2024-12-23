<script setup lang="ts">


</script>

<template>
  <button @click="$emit('click')" class="button">
    Add project
  </button>
</template>

<style scoped>
.button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
}
</style>