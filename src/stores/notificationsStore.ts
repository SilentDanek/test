import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationsStore = defineStore("notifications", () => {
    const notifications = ref<{ message: string; type: "success" | "error" }[]>([]);

    function addNotification(message: string, type: "success" | "error") {
        notifications.value.push({ message, type });
        // Удаляем уведомление через 5 секунд
        setTimeout(() => {
            notifications.value.shift();
        }, 5000);
    }

    return {
        notifications,
        addNotification,
    };
});
