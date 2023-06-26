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
import { useAuth } from "@/accounts/services/auth.service.js";


const auth = useAuth();
const user = ref(auth.user)

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

const optimizarJobs= async (item)=>{
  const response = await service.findByUserId(item);
  jobs.value = response.data;
}

onMounted(async () => {
  const response = await service.getAll();
  jobs.value = response.data;
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
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 class="mb-2 md:m-0 p-as-md-center text-xl">Available Job Offers</h2>
        <div>
          <span class="p-input-icon-left">
            <i :class="PrimeIcons.SEARCH"></i>
            <InputText
              v-model="filters['global'].value"
              class="rounded"
              type="text"
              placeholder="Search..." />
          </span>
          <button
            @click="optimizarJobs(user)"
            class="ml-auto border-2 border-teal-300 p-2 rounded-md bg-teal-300 text-black ">
            🤖 Optimizar con IA

          </button>
        </div>

      </div>
    </template>
    <template #empty>No offers were found.</template>

    <template #loading>Loading...</template>

    <Column field="title" header="Title" :sortable="true" />
    <Column
        field="image"
        header=""
        header-class="w-40"
        class="px-6 py-3 text-xs">
        <template #body="{ data }">
          <img :src="data.image" class="w-full" />
        </template>
      </Column>
    <Column field="description" header="Description" :sortable="true" class="px-6 py-3 text-xs w-128" />
    <Column ref="salaryRange"
            field="salaryRange"
            header="Salary Range"
            class="px-6 py-3 text-s w-64"
            :sortable="true"
            >
      <template #body="{ data }">
        {{ formatCurrency(data.minSalary) }} - {{ formatCurrency(data.maxSalary) }}
      </template>
    </Column>
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
