import { defineStore } from "pinia";
import { projectsAPI } from "@/api/projectsAPI";
import type { Project } from "@/api/projectsAPI";
import { ref, computed} from "vue";
import {useNotificationsStore} from "@/stores/notificationsStore.ts";

export const useProjectsStore = defineStore("projects", () => {
    const notificationsStore = useNotificationsStore();

    const projects = ref<Project[]>([]);

    // Загружаем фильтры из localStorage или используем значения по умолчанию
    const savedFilters = localStorage.getItem("projectsFilters");
    const filters = ref({
        name: "",
        status: "",
        ...JSON.parse(savedFilters || "{}"), // Объединяем с сохраненными фильтрами
    });

    const sortKey = ref<keyof Project>("id");
    const sortOrder = ref<"asc" | "desc">("asc");
    const error = ref<string | null>(null);

    // Загруженные проекты
    async function fetchProjects() {
        try {
            projects.value = await projectsAPI.getAllProjects();
            error.value = null;
            notificationsStore.addNotification("Проекты успешно загружены", "success");
        } catch (err: any) {
            handleError(err, "Ошибка загрузки проектов");
        }
    }

    // Добавление нового проекта
    async function addProject(newProject: Omit<Project, "id">) {
        try {
            const createdProject = await projectsAPI.createProject(newProject);
            projects.value.push(createdProject);
            error.value = null;
            notificationsStore.addNotification("Проект успешно добавлен", "success");
        } catch (err: any) {
            handleError(err, "Ошибка создания проекта");
        }
    }

    // Обновление проекта
    async function updateProject(updatedProject: Project) {
        try {
            const updated = await projectsAPI.updateProject(updatedProject);
            const index = projects.value.findIndex((p) => p.id === updated.id);
            if (index !== -1) {
                projects.value[index] = updated;
            }
            error.value = null;
            notificationsStore.addNotification("Проект успешно обновлён", "success");
        } catch (err: any) {
            handleError(err, "Ошибка обновления проекта");
        }
    }

    // Удаление проекта
    async function deleteProject(projectId: number) {
        try {
            await projectsAPI.deleteProject(projectId);
            projects.value = projects.value.filter((p) => p.id !== projectId);
            error.value = null;
            notificationsStore.addNotification("Проект успешно удалён", "success");
        } catch (err: any) {
            handleError(err, "Ошибка удаления проекта");
        }
    }

    // Установить фильтры
    function setFilters(newFilters: { name: string; status: string }) {
        filters.value = newFilters;
        localStorage.setItem("projectsFilters", JSON.stringify(newFilters));
    }

    // Отфильтрованные проекты
    const filteredProjects = computed(() => {
        return projects.value.filter((project) => {
            const matchesName =
                filters.value.name === "" ||
                project.name.toLowerCase().includes(filters.value.name.toLowerCase());
            const matchesStatus =
                filters.value.status === "" || project.status === filters.value.status;
            return matchesName && matchesStatus;
        });
    });

    // Централизованная обработка ошибок
    function handleError(err: any, defaultMessage: string) {
        error.value = err.message || defaultMessage;
        console.error(error.value);
        notificationsStore.addNotification(error.value || '', "error");
    }


    return {
        projects,
        filters,
        sortKey,
        sortOrder,
        error,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
        setFilters,
        filteredProjects,
    };
});
