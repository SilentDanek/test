import { instance } from "@/api/api";

export interface Task {
    id: number;
    name: string;
    worker: string;
    status: string;
    deadline: string;
}

export const tasksAPI = {
    // Получение всех задач для конкретного проекта
    getTasksByProjectId: async (projectId: string): Promise<Task[]> => {
        try {
            const response = await instance.get(`/tasks/${projectId}`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении задач для проекта с ID ${projectId}:`, error);
            throw error;
        }
    },

    // Создание новой задачи
    createTask: async (task: Omit<Task, "id">, projectId: string): Promise<Task> => {
        try {
            const response = await instance.post(`/tasks/${projectId}`, task);
            return response.data;
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
            throw error;
        }
    },

    // Обновление задачи
    updateTask: async (task: Task, projectId: string): Promise<Task> => {
        try {
            const response = await instance.put(`/tasks/${projectId}`, task);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении задачи с ID ${task.id}:`, error);
            throw error;
        }
    },

    // Удаление задачи
    deleteTask: async (taskId: number, projectId: string): Promise<void> => {
        try {
            await instance.delete(`/tasks/${projectId}/${taskId}`);
        } catch (error) {
            console.error(`Ошибка при удалении задачи с ID ${taskId}:`, error);
            throw error;
        }
    },
};
