<script setup>
import { reactive, computed, ref } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const state = reactive({
  companyName: "",
  jobTitle: "",
  jobDescription: "",
  requirements: "",
  benefits: "",
  location: "",
});

const rules = computed(() => ({
  companyName: { required },
  jobTitle: { required },
  jobDescription: { required },
  requirements: { required },
  benefits: { required },
  location: { required },
}));

// Aquí inicializamos Vuelidate.
const v$ = useVuelidate(rules, state);

const handleRegister = async () => {
  console.log('handle')
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }

  const success = await auth.requestJobCreation(state);

};
</script>

<template>
  <div class="flex justify-center items-center">
    <form class="flex flex-col container max-w-md items-center mt-8 space-y-4" @submit.prevent="handleRegister">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Request Job Creation</span>
      </div>

      <div class="w-full flex flex-col">
        <label for="signup_companyName" class="mb-2 !bg-slate-100 text-sm">
          Company Name
        </label>
        <input id="signup_companyName" v-model="state.companyName" type="text" 
          class="rounded w-full !bg-transparent h-10" 
          :class="{ 'p-invalid': v$.companyName.$invalid && state.submitted }" />
        <span v-if="v$.companyName.$error && state.submitted">
          <span v-for="(error, index) of v$.companyName.$errors" id="signup_companyName-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full flex flex-col">
        <label for="signup_jobTitle" class="mb-2 !bg-slate-100 text-sm">
          Job Title
        </label>
        <input id="signup_jobTitle" v-model="state.jobTitle" type="text" 
          class="rounded w-full !bg-transparent h-10" 
          :class="{ 'p-invalid': v$.jobTitle.$invalid && state.submitted }" />
        <span v-if="v$.jobTitle.$error && state.submitted">
          <span v-for="(error, index) of v$.jobTitle.$errors" id="signup_jobTitle-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full flex flex-col">
        <label for="signup_jobDescription" class="mb-2 !bg-slate-100 text-sm">
          Job Description
        </label>
        <input id="signup_jobDescription" v-model="state.jobDescription" type="text" 
          class="rounded w-full !bg-transparent h-10" 
          :class="{ 'p-invalid': v$.jobDescription.$invalid && state.submitted }" />
        <span v-if="v$.jobDescription.$error && state.submitted">
          <span v-for="(error, index) of v$.jobDescription.$errors" id="signup_jobDescription-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full flex flex-col">
        <label for="signup_requirements" class="mb-2 !bg-slate-100 text-sm">
          Requirements
        </label>
        <input id="signup_requirements" v-model="state.requirements" type="text" 
          class="rounded w-full !bg-transparent h-10" 
          :class="{ 'p-invalid': v$.requirements.$invalid && state.submitted }" />
        <span v-if="v$.requirements.$error && state.submitted">
          <span v-for="(error, index) of v$.requirements.$errors" id="signup_requirements-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full flex flex-col">
        <label for="signup_benefits" class="mb-2 !bg-slate-100 text-sm">
          Benefits
        </label>
        <input id="signup_benefits" v-model="state.benefits" type="text" 
          class="rounded w-full !bg-transparent h-10" 
          :class="{ 'p-invalid': v$.benefits.$invalid && state.submitted }" />
        <span v-if="v$.benefits.$error && state.submitted">
          <span v-for="(error, index) of v$.benefits.$errors" id="signup_benefits-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full flex flex-col">
        <label for="signup_location" class="mb-2 !bg-slate-100 text-sm">
          Location
        </label>
        <input id="signup_location" v-model="state.location" type="text" 
          class="rounded w-full !bg-transparent h-10" 
          :class="{ 'p-invalid': v$.location.$invalid && state.submitted }" />
        <span v-if="v$.location.$error && state.submitted">
          <span v-for="(error, index) of v$.location.$errors" id="signup_location-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="my-2 w-full">
        <button type="submit"
          class="w-full py-2 px-3 rounded transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold">
          Send Request
        </button>
      </div>

    </form>
  </div>
</template>

<style>
.custom-input {
  /* Estilos personalizados */
  border: 1px solid #ccc;
  padding: 8px;
  /* Otros estilos que desees aplicar */
}

.custom-button {
  /* Estilos generales del botón */
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: rgb(100, 116, 139);
  color: #ffffff;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.custom-button:hover {
  /* Estilos al pasar el cursor sobre el botón */
  background-color: #e0e0e0;
  color: #222;
}

.custom-button:disabled {
  /* Estilos cuando el botón está desactivado */
  opacity: 0.6;
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>



