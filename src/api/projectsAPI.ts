import {instance} from "@/api/api";

export interface Project {
    id: number;
    name: string;
    description: string;
    taskCount: number;
    status: string;
    createdAt: string;
}

export const projectsAPI = {
    getAllProjects: async (): Promise<Project[]> => {
        try {
            const response = await instance.get("/projects");
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении всех проектов:", error);
            throw error;
        }
    },

    createProject: async (project: Omit<Project, "id">): Promise<Project> => {
        try {
            const response = await instance.post("/projects", project);
            return response.data;
        } catch (error) {
            console.error("Ошибка при создании проекта:", error);
            throw error;
        }
    },

    updateProject: async (project: Project): Promise<Project> => {
        try {
            const response = await instance.put(`/projects/${project.id}`, project);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении проекта с ID ${project.id}:`, error);
            throw error;
        }
    },

        deleteProject: async (id: number): Promise<void> => {
        try {
            console.log(id)
            await instance.delete(`/projects/${id}`);
        } catch (error) {
            console.error(`Ошибка при удалении проекта с ID ${id}:`, error);
            throw error;
        }
    },
};
