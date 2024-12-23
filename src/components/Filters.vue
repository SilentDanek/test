<template>
  <div class="filters">
    <input
        type="text"
        v-model="localFilters.name"
        :placeholder="'Filter by ' + filterPlaceholder"
        class="filter-input"
        @input="updateFilters"
    />
    <select
        v-model="localFilters.status"
        class="filter-select"
        @change="updateFilters"
    >
      <option value="">All status</option>
      <option v-for="filter in filterOptions" :value="filter"> {{filter}}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const props = defineProps<FiltersProps>();

const emits = defineEmits(["update:filters"]);
const localFilters = reactive({ ...props.filters });

function updateFilters() {
  emits("update:filters", { ...localFilters });
}

export type FiltersProps = {
  filters: { name: string; status: string};
  filterPlaceholder: string
  filterOptions: string[]
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: 10px;

  .filter-input,
  .filter-select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>


