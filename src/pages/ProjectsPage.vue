<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useProjectsStore} from "@/stores/useProjectsStore";
import Modal from "@/components/Modal.vue";
import ProjectsTable from "@/components/ProjectsTable.vue";
import AddProjectForm from "@/components/AddProjectForm.vue";
import Controls from "@components/Controls.vue";

const projectsStore = useProjectsStore();
const showModal = ref(false);
const newProject = ref({
  name: "",
  description: "",
});

function addProject(project: { name: string; description: string }) {
  const newProject = {
    ...project,
    taskCount: 0,
    status: "Started",
    createdAt: new Date().toISOString(),
  };
  projectsStore.addProject(newProject);
  showModal.value = false;
}

const filterOptions = [
  "Started",
  "In Progress",
  "Completed",
]

onMounted(() => {
  projectsStore.fetchProjects();
});
</script>

<template>
  <div>
    <header>
      <h1>Управление проектами</h1>
    </header>
    <Controls
        :filters="projectsStore.filters"
        @update:filters="projectsStore.setFilters"
        filter-placeholder="project name"
        :filterOptions="filterOptions"
        :click="() => showModal = true"
    />
    <ProjectsTable
        :projects="projectsStore.filteredProjects"
    />
    <Modal
        v-if="showModal"
        title="Add project"
        :isVisible="showModal"
        @close="showModal = false"
    >
      <AddProjectForm
          :project="newProject"
          @submit="addProject"
      />
    </Modal>
  </div>
</template>