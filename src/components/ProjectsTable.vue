<script lang="ts" setup>
import type {Project} from "@/api/projectsAPI.ts";

defineProps<{ projects: Project }>()

import "devextreme/dist/css/dx.material.blue.dark.css";
import {DxDataGrid, DxColumn} from "devextreme-vue/data-grid";
import {useProjectsStore} from "@/stores/useProjectsStore";
import {useRouter} from "vue-router";

const projectsStore = useProjectsStore();
const router = useRouter();

// Параметры редактирования
const editingOptions = {
  mode: "popup",
  allowUpdating: true,
  allowDeleting: true,
};

// Lookup для статусов
const statusLookup = {
  dataSource: [
    {value: "Started", text: "Started"},
    {value: "In Progress", text: "In Progress"},
    {value: "Completed", text: "Completed"},
  ],
  displayExpr: "text",
  valueExpr: "value",
};

// Обработка сохранения изменений
function onSaving(e: any) {
  const changes = e.changes;

  changes.forEach((change: any) => {
    switch (change.type) {
      case "update":
        projectsStore.updateProject({...change.key, ...change.data});
        break;
      case "remove":
        projectsStore.deleteProject(change.key.id);
        break;
    }
  });

  // Отключаем локальное управление DevExtreme
  e.cancel = true;
}

// Обработка клика по строке
function onRowClick(e: any) {
  const projectId = e.data.id; // Получение ID проекта
  router.push(`/project/${projectId}`); // Редирект на страницу проекта
}
</script>


<template>
  <DxDataGrid
      class="custom-data-grid"
      :data-source.sync="projects"
      :allow-column-resizing="true"
      :editing="editingOptions"
      show-borders
      @saving="onSaving"
      @row-click="onRowClick"
      :hover-state-enabled="true"
  >
    <DxColumn
        data-field="id"
        caption="ID"
        :form-item="{ visible: false }"
    />
    <DxColumn
        data-field="name"
        caption="Project name"/>
    <DxColumn
        data-field="taskCount"
        caption="Task Count"
        data-type="number"
        :form-item="{ visible: false }"/>
    <DxColumn
        data-field="status"
        caption="Status"
        :lookup="statusLookup"
    />
    <DxColumn
        data-field="createdAt"
        caption="Creation date"
        data-type="date"
    />
  </DxDataGrid>
</template>


<style>
.dx-row.dx-data-row.dx-row-lines {
  cursor: pointer;
}
</style>