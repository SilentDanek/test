import {instance} from "@/api/api";


export const dashboardAPI = {
    getStatistics: async (): Promise<any> => {
        try {
            const response = await instance.get("/dashboard");
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении всех проектов:", error);
            throw error;
        }
    },
};
