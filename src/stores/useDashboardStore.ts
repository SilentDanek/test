import { defineStore } from "pinia";
import { projectsAPI } from "@/api/projectsAPI";
import type { Project } from "@/api/projectsAPI";
import { ref } from "vue";
import {dashboardAPI} from "@/api/dashboardAPI.ts";

export const useProjectsStore = defineStore("projects", () => {

    const statistics = ref<Project[]>([]);
    // Загруженные проекты
    async function fetchProjects() {
        try {
            statistics.value = await dashboardAPI.getStatistics()
        } catch (err: any) {
            console.error(err, "Ошибка загрузки проектов");
        }
    }




    return {
        statistics,
        fetchProjects,
    };
});
