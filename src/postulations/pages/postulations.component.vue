<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { usePostulations } from "../services/postulations.service";
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator, PrimeIcons } from "primevue/api";
import InputText from "primevue/inputtext";

const service = usePostulations();
const postulations = ref([]);


const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

onMounted(async () => {
  const response = await service.getAll();
  postulations.value = response.data;
});
</script>

<template>
  <DataTable
    v-model:filters="filters"
    :global-filter-fields="['title','description']"
    :value="postulations"
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
        <h2 class="mb-2 md:m-0 p-as-md-center text-xl">My Postulations</h2>
        <div>
          <span class="p-input-icon-left">
            <i :class="PrimeIcons.SEARCH"></i>
            <InputText
              v-model="filters['global'].value"
              class="rounded"
              type="text"
              placeholder="Search..." />
          </span>
        </div>
      </div>
    </template>
    <template #empty>No postulations were found.</template>

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
  </DataTable>
</template>
