<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { useJobs } from "../services/jobs.service";
import { usePayment } from "@/payment/services/payment.service";
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator, PrimeIcons } from "primevue/api";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";

const service = useJobs();
const jobs = ref([]);

const confirm = useConfirm();
const toast = useToast();



const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  salaryRange: {
    value: null,
    filterFunction: (value, filter) => {
      const [min, max] = filter.split('-');
      const salary = parseFloat(value.replace(/[^0-9.-]+/g, ''));
      return salary >= parseFloat(min) && salary <= parseFloat(max);
    },
  }
});
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
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

onMounted(async () => {
  const response = await service.getAll();
  jobs.value = response.data.filter(job => job.published === true);
});
</script>

<template>
  <ConfirmDialog />
  <DataTable
    v-model:filters="filters"
    :global-filter-fields="['title','description']"
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
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Available Job Offers</h2>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <InputText
              v-model="filters['global'].value"
              class="rounded"
              type="text"
              placeholder="Search..."
              :icon="PrimeIcons.SEARCH"
            />
          </div>
          <Button
            class="border-2 border-teal-300 p-2 rounded-md bg-teal-300 text-black"
          >
            🤖 Optimizar con IA
          </Button>
        </div>
      </div>
    </template>

    <template #empty>
      <div class="text-gray-500">No offers were found.</div>
    </template>

    <template #loading>Loading...</template>

    <Column field="title" header="Title" :sortable="true" />

    <Column
      field="image"
      header=""
      header-class="w-40"
      class="px-6 py-3 text-xs"
    >
      <template #body="{ data }">
        <img :src="data.image" class="w-full" alt="Job Image" />
      </template>
    </Column>

    <Column
      field="description"
      header="Description"
      :sortable="true"
      class="px-6 py-3 text-xs w-128"
    />

    <Column
      ref="salaryRange"
      field="salaryRange"
      header="Salary Range"
      class="px-6 py-3 text-s w-64"
      :sortable="true"
      :filter-match-mode="FilterMatchMode.BETWEEN"
      :filter-function="filters.salaryRange.filterFunction"
    >
      <template #body="{ data }">
        <div class="text-sm">
          <span>{{ formatCurrency(data.minSalary) }}</span>
          <span class="mx-1">-</span>
          <span>{{ formatCurrency(data.maxSalary) }}</span>
        </div>
      </template>
    </Column>

    <Column header="Action">
      <template #body="{ data }">
        <Button
          label="Apply"
          class="p-button-primary p-button-text"
          @click="handleConfirmation(data)"
        ></Button>
      </template>
    </Column>

  </DataTable>
</template>
