
<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="form-group">
      <label for="taskName">Название проекта:</label>
      <input
          id="projectName"
          v-model="localProject.name"
          type="text"
          class="form-input"
          required
      />
    </div>
    <div class="form-group">
      <label for="projectDescription">Описание проекта:</label>
      <textarea
          id="projectDescription"
          v-model="localProject.description"
          class="form-textarea"
      ></textarea>
    </div>
    <button type="submit" class="form-submit">Сохранить</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const props = defineProps<{  project: { name: string; description: string; } }>();
const emits = defineEmits(["submit"]);

const localProject = reactive({ ...props.project });

function onSubmit() {
  emits("submit", { ...localProject });
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .form-group {
    display: flex;
    flex-direction: column;

    label {
      font-weight: bold;
      margin-bottom: 8px;
    }
  }

  .form-input,
  .form-textarea {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
  }

  .form-textarea {
    resize: none;
    height: 100px;
  }

  .form-submit {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
