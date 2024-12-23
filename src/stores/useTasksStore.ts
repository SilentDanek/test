import { defineStore } from "pinia";
import {computed, ref} from "vue";
import { tasksAPI } from "@/api/tasksAPI";
import {useNotificationsStore} from "@/stores/notificationsStore.ts";

export interface Task {
    id: number;
    name: string;
    worker: string;
    status: string;
    deadline: string;
}

export const useTasksStore = defineStore("tasks", () => {
    const notificationsStore = useNotificationsStore();

    const tasks = ref<Task[]>([]);
    const error = ref<string | null>(null);

    // Инициализация фильтров из localStorage
    const savedFilters = localStorage.getItem("tasksFilters");
    const filters = ref({
        name: "",
        status: "",
        ...JSON.parse(savedFilters || "{}"), // Загружаем фильтры из localStorage
    });

    function setFilters(newFilters: { name: string; status: string }) {
        filters.value = newFilters;
        localStorage.setItem("tasksFilters", JSON.stringify(newFilters));
    }

    // Отфильтрованные проекты
    const filteredTasks = computed(() => {
        return tasks.value.filter((task) => {
            const matchesName =
                filters.value.name === "" ||
                task.worker?.toLowerCase().includes(filters.value.name.toLowerCase());

            const matchesStatus =
                filters.value.status === "" ||
                task.status === filters.value.status;
            return matchesName && matchesStatus;
        });
    });


    // Получение задач для конкретного проекта
    const fetchTasks = async (projectId: string) => {
        try {
            tasks.value = await tasksAPI.getTasksByProjectId(projectId);
            notificationsStore.addNotification("Задачи успешно загружены", "success");
        } catch (error) {
            handleError("Ошибка при загрузке задач:", error);
        }
    };

    // Добавление новой задачи
    const addTask = async (task: Omit<Task, "id">, projectId: string) => {
        try {
            const newTask = await tasksAPI.createTask(task, projectId);
            tasks.value.push(newTask);
            notificationsStore.addNotification("Задача успешно добавленна", "success");
        } catch (error) {
            handleError("Ошибка при добавлении задачи:", error);
        }
    };

    // Обновление задачи
    const updateTask = async (id: number, updates: Partial<Task>, projectId: string) => {
        try {
            const task = tasks.value.find((t) => t.id === id);
            if (!task) throw new Error(`Задача с ID ${id} не найдена`);
            const updatedTask = await tasksAPI.updateTask({ ...task, ...updates }, projectId);
            Object.assign(task, updatedTask);
            notificationsStore.addNotification("Задача успешно обновлена", "success");
        } catch (error) {
            handleError("Ошибка при обновлении задачи:", error);
        }
    };

    // Удаление задачи
    const deleteTask = async (id: number, projectId: string) => {
        try {
            await tasksAPI.deleteTask(id, projectId);
            tasks.value = tasks.value.filter((task) => task.id !== id);
            notificationsStore.addNotification("Задача успешно удаленна", "success");
        } catch (error) {
            handleError("Ошибка при удалении задачи:", error);
        }
    };

    // Централизованная обработка ошибок
    function handleError(defaultMessage: string, err: any) {
        error.value = err.message || defaultMessage;
        notificationsStore.addNotification(error.value || '', "error");
    }

    return {
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        setFilters,
        filteredTasks,
        filters
    };
});
