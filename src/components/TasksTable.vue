<template>
  <DxDataGrid
      :data-source="filteredTasks"
      :allow-column-resizing="true"
      :height="440"
      show-borders
      @saving="onSaving"
      :editing="editingOptions"
  >
    <DxRowDragging
        :data="status"
        :on-add="onAdd"
        :allow-reordering="true"
        group="tasksGroup"
    />
    <DxScrolling mode="virtual" />
    <DxColumn
        data-field="id"
        caption="ID"
        data-type="number"
        :form-item="{ visible: false }"
        :allow-sorting="false"
    />
    <DxColumn
        data-field="name"
        caption="Название задачи"
        :allow-sorting="false"
    />
    <DxColumn
        data-field="worker"
        caption="Исполнитель"
        :allow-sorting="false"
    />
    <DxColumn
        data-field="status"
        caption="Статус"
    />
    <DxColumn
        data-field="deadline"
        caption="Срок выполнения"
        data-type="date"
    />
  </DxDataGrid>
</template>

<script setup lang="ts">
import {
  DxDataGrid, DxColumn, DxRowDragging, DxScrolling
} from 'devextreme-vue/data-grid';
import { computed } from 'vue';
import type { Task } from '@/stores/useTasksStore';
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';

const props = defineProps<{
  tasks: Task[];
  status: string;
  onSaving: any;
}>();

const emits = defineEmits(['task-updated']);

const editingOptions = {
  mode: "popup",
  allowUpdating: true,
  allowDeleting: true,
};

// Фильтруем задачи по статусу
const filteredTasks = computed(() =>
    props.tasks.filter((task) => task.status === props.status),
);

// Обработка добавления строки
const onAdd = (e: DxDataGridTypes.RowDraggingAddEvent) => {
  const key = e.itemData.id; // Получаем ID задачи
  const newStatus = e.toData; // Новый статус задачи
  emits('task-updated', key, { status: newStatus });
};

//todo

/*const onReorder = (e: DxDataGridTypes.RowDraggingReorderEvent) => {
  const visibleRows = e.component.getVisibleRows();
  const toIndex = props.tasks.findIndex((item) => item.ID === visibleRows[e.toIndex].data.ID);
  const fromIndex = props.tasks.value.findIndex((item) => item.ID === e.itemData.ID);
  const newTasks = [...props.tasks.value];

  newTasks.splice(fromIndex, 1);
  newTasks.splice(toIndex, 0, e.itemData);
on-reorder="onReorder"
  emits('task-updated', key, { status: newStatus });
};*/
</script>
