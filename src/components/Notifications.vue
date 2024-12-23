<template>
  <div class="notifications">
    <div
        v-for="(notification, index) in notifications"
        :key="index"
        :class="['notification', notification.type]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationsStore } from "@/stores/notificationsStore";

const notificationsStore = useNotificationsStore();
const notifications = notificationsStore.notifications;
</script>

<style scoped>
.notifications {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  padding: 15px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fade-in-out 10s;
}

.notification.success {
  background-color: #4caf50;
}

.notification.error {
  background-color: #f44336;
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateY(200px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(200px);
  }
}
</style>
