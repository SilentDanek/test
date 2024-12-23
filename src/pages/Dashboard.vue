
<script setup lang="ts">
import TaskChart from "@/components/TaskChart.vue";
import {onMounted} from "vue";
import {useProjectsStore} from "@/stores/useDashboardStore.js";
const store = useProjectsStore();

onMounted(() => {
  store.fetchProjects();
})
</script>

<template>
  <div>
    <h1>Task Status Chart</h1>
    <TaskChart v-if="store.statistics" :data="store.statistics" :width="600" :height="400" />
  </div>
</template>
