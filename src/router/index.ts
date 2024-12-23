import {createRouter, createWebHistory} from "vue-router";
import ProjectsPage from "@/pages/ProjectsPage.vue";
import TasksPage from "@/pages/TasksPage.vue";
import Dashboard from "@/pages/Dashboard.vue";

const routes = [
    {
        path: "/projects",
        name: "Projects",
        component: ProjectsPage,
    },
    {
        path: "/project/:id", // Динамический маршрут с параметром id
        name: "tasks-page",
        component: TasksPage,
        props: true, // Передаёт параметр id в компонент как проп
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/",
        redirect: "/projects",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;