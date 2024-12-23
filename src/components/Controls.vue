<script setup lang="ts">
import Filters, {type FiltersProps} from "@components/Filters.vue";
import Button from "@components/Button.vue";

defineProps<ControlsType>();

type ControlsType = FiltersProps & {
  click: () => void;
}
</script>

<template>
  <div class="controls">
    <Filters
        :filters="filters"
        @update:filters="$emit('update:filters', $event)"
        :filter-placeholder="filterPlaceholder"
        :filterOptions="filterOptions"
    />
    <Button @click="click">Add new task</Button>
  </div>
</template>

<style scoped>

.controls {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px 0;
}
</style>