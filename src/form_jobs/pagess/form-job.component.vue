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
          <label for="signup_companyName" class="mb-2 !bg-slate-100 text-sm" :class="{ 'p-error': v$.companyName.$invalid && submitted }">
            Company Name
          </label>
          <InputText id="signup_companyName" v-model="v$.companyName.$model" type="text" class="rounded w-full !bg-transparent h-10"
            :class="{ 'p-invalid': v$.companyName.$invalid && submitted }" aria-describedby="signup_companyName-error" />
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



