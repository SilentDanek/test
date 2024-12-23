<template>
  <form @submit.prevent="onSubmit" class="form">
    <div>
      <label for="taskName">Task name:</label>
      <input
          id="taskName"
          name="taskName"
          type="text"
          class="form-input"
          required
      />
    </div>
    <div>
      <label for="taskWorker">Worker:</label>
      <select id="taskWorker" name="taskWorker" required>
        <option v-for="worker in workers" :key="worker" :value="worker">{{worker}}</option>
      </select>
    </div>
    <div>
      <label for="status">Status:</label>
      <select id="status" name="status" required>
        <option v-for="status in statuses" :key="status" :value="status">{{status}}</option>
      </select>
    </div>
    <div>
      <label for="deadline">Deadline:</label>
      <input id="deadline" name="deadline" type="date" required/>
    </div>
    <button type="submit" class="form-submit">Save</button>
  </form>
</template>

<script lang="ts" setup>

defineProps<{
  workers: string[];
  statuses: string[];
}>();

const emits = defineEmits(["submit"]);

function onSubmit(event:any) {
  const form = event.target;

  const formData= {
    name: form.taskName.value,
    worker: form.taskWorker.value,
    status: form.status.value,
    deadline: form.deadline.value,
  };

  emits("submit", formData);
}

</script>

<style lang="scss" scoped>

</style>