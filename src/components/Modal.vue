<template>
  <teleport to="#modals">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <header class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </header>
        <main class="modal-body">
          <slot/> <!-- Содержимое модального окна -->
        </main>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>

defineProps<{
  title: string;
  isVisible: boolean;
}>();

const emits = defineEmits(["close"]);

function closeModal() {
  emits("close");
}
</script>

<style>
/* Общий фон модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out; /* Анимация появления */

  /* Контент модального окна */
  .modal-content {
    background: #fff;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-out; /* Анимация появления */
  }

  /* Шапка модального окна */
  .modal-header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2e2e2e;
    color: #fff;
  }

  /* Кнопка закрытия */
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
  }

  .close-button:hover {
    color: #ff5f5f;
  }

  /* Тело модального окна */
  .modal-body {
    padding: 40px;
    font-size: 1rem;
    color: #333;

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;

      div {
        display: flex;
        flex-direction: column;

        label {
          font-weight: bold;
          margin-bottom: 8px;
        }
      }

      input {
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
      }

      button {
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

      select {
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
        cursor: pointer;

        &:focus {
          border-color: #ccc;
          outline: none;
        }
      }

      option {
        font-size: 1rem;
        padding: 10px;

        &:hover {
          background-color: #f2f2f2;
        }
      }
    }
  }

  /* Анимации */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0);
    }
  }
}
</style>