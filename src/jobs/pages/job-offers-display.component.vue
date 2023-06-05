<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { useJobs } from "../services/jobs.service";
import { ref, onMounted } from "vue";
import { PrimeIcons } from "primevue/api";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const service = useJobs();
const jobs = ref([]);

const confirm = useConfirm();
const toast = useToast();

const handleConfirmation = () => {
  confirm.require({
    header: "Confirmation",
    message: "Are you sure you want to apply for this job?",
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    accept: () => {
      toast.add({
        severity: "success",
        summary: "Confirmed",
        detail: "You have successfully applied for the job",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Cancelled",
        detail: "You have cancelled the application for the job",
        life: 3000,
      });
      close();
    },
  });
};

onMounted(async () => {
  const response = await service.getAll();
  jobs.value = response.data;
});
</script>

<template>
  <ConfirmDialog />
  <DataTable
    :value="jobs"
    data-key="id"
    :paginator="true"
    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rows="10"
    :rows-per-page-options="[5, 10, 15]"
    current-page-report-template="Showing {first} to {last} of {totalRecords} job offers"
    responsive-layout="scroll"
    class="rounded overflow-hidden">
    <template #header>
      <div
        class="table-header flex flex-column md:flex-row md:justify-content-between">
        <h2 class="mb-2 md:m-0 p-as-md-center text-xl">Available job offers</h2>
        <button
          class="ml-auto border-2 border-teal-300 p-2 rounded-md bg-teal-300 text-black">
          🤖 Optimizar con IA
        </button>
      </div>
    </template>
    <Column field="title" header="Title" :sortable="true" />
    <Column
        field="image"
        header="Image"
        header-class="w-40"
        class="px-6 py-3 text-xs">
        <template #body="{ data }">
          <img :src="data.image" class="w-full" />
        </template>
      </Column>
    <Column field="description" header="Description" :sortable="true" />
    <Column field="salaryRange" header="Salary Range" :sortable="true" />
    <Column header="Action">
      <template #body>
        <Button
          label="Apply"
          class="p-button-primary p-button-text"
          @click="handleConfirmation()">
        </Button>
      </template>
    </Column>
  </DataTable>
</template>
