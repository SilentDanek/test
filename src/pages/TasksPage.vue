<script setup lang="ts">
import { useTasksStore } from "@/stores/useTasksStore";
import TasksTable from "@/components/TasksTable.vue";
import {computed, onMounted, ref} from "vue";
import type { Task } from "@/api/tasksAPI.ts";
import {useRoute} from "vue-router";
import Filters from "@components/Filters.vue";
import Modal from "@components/Modal.vue";
import AddTaskForm from "@components/AddTaskForm.vue";
import Controls from "@components/Controls.vue";

// Подключение Pinia Store
const tasksStore = useTasksStore();
const tasks = computed(() => tasksStore.filteredTasks);

const route = useRoute();
const projectId = route.params.id as string;
const showModal = ref(false)

const filterOptions = [
  "To Do",
  "In Progress",
  "Done",
];

// Фильтрация задач по статусу
function filteredTasks(status: string) {
  return tasks.value.filter((task) => task.status === status);
}

// Обновление задачи через Pinia Store
function onTaskUpdated(taskId: number, updates: Partial<Task>) {
  tasksStore.updateTask(taskId, updates, projectId);
}

// Обработка сохранения изменений
function onSaving(e: any) {
  const changes = e.changes;

  changes.forEach((change: any) => {
    switch(change.type){
      case "update":
        tasksStore.updateTask(change.key.id, change.data, projectId);
        break;
      case "remove":
        tasksStore.deleteTask(change.key.id, projectId);
        break;
    }
  });
}

function addTask(task: Omit<Task, "id">) {
  tasksStore.addTask(task, projectId);
  showModal.value = false;
}

onMounted(() => {
  tasksStore.fetchTasks(projectId);
});
</script>

<template>

  <Controls
      filter-placeholder="name"
      :filterOptions="filterOptions"
      :filters="tasksStore.filters"
      :click="() => showModal = true"
      @update:filters="tasksStore.setFilters"
  />
  <div class="tables">
    <!-- Секция To Do -->
    <TasksTable
        :tasks="filteredTasks('To Do')"
        :status="'To Do'"
        :onSaving="onSaving"
        @task-updated="onTaskUpdated"
        class="column"
    />
    <!-- Секция In Progress -->
    <TasksTable
        :tasks="filteredTasks('In Progress')"
        :status="'In Progress'"
        :onSaving="onSaving"
        @task-updated="onTaskUpdated"
        class="column"
    />
    <!-- Секция Done -->
    <TasksTable
        :tasks="filteredTasks('Done')"
        :status="'Done'"
        :onSaving="onSaving"
        @task-updated="onTaskUpdated"
        class="column"
    />
  </div>

  <Modal
      v-if="showModal"
      title="Add task"
      :isVisible="showModal"
      @close="showModal = false"
  >
    <AddTaskForm
        :workers="['Mike', 'Dan', 'Slavik', 'Garry', 'Potter']"
        :statuses="filterOptions"
        @submit="addTask"
    />
  </Modal>
</template>

<style scoped>
.tables {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
