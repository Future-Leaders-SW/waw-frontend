<script setup>
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import ToggleButton from "primevue/togglebutton";
import useVuelidate from "@vuelidate/core";

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { required, email, sameAs, helpers } from "@vuelidate/validators";
import { PrimeIcons, ToastSeverity } from "primevue/api";
import { reactive, computed, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useToast } from "primevue/usetoast";
import { http } from "@/core/services/http-common";
import axios from "axios";


import { useAuth } from "../services/auth.service";

const auth = useAuth();
const router = useRouter();
const toastService = useToast();

const submitted = ref(false);
let visibleDialog = ref(false);
let cvFile = ref(null);
let cvpdf = ref(null);
const pdfUploaded = ref(false);
const state = reactive({
  fullName: "",
  preferredName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthdate: new Date(),
  biography: "",
  checked: false,
  picture: {
    href: "",
  },
});


const rules = computed(() => ({
  fullName: { required },
  preferredName: { required },
  email: { required, email },
  password: { required },
  confirmPassword: { sameAs: sameAs(state.password, "password") },
  birthdate: {
    required,
    age: helpers.withMessage(
      "You must have 18+ years to register an account",
      value => {
        const birthdate = new Date(value);
        const timeNow = new Date();
        return timeNow.getFullYear() - birthdate.getFullYear() >= 18;
      },
    ),
  },
  checked: {
    required,
    truthy: helpers.withMessage(
      "You must agree to the terms and conditions",
      value => Boolean(value),
    ),
  },
  pdfUploaded: {
    truthy: helpers.withMessage(
      "You must upload a CV",
      () => pdfUploaded.value,
    ),
  },

}));

const v$ = useVuelidate(rules, state);

const handleRegister = async () => {
  // Set this value to allow the template to show the errors
  submitted.value = true;

  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  //visibleDialog.value = true;
  // Create a copy so that we can delete props later
  const user = { ...state };
  // We don't need the checked state on the server
  delete user.confirmPassword;
  delete user.checked;
  console.log(user);
  let respuestaCV = await sendCV();

  if (respuestaCV > -1) {
    user.cvId = respuestaCV;
    const success = await auth.register(user);
    if (success) {

      router.push("/account/signin");
      // Registation complete
      toastService.add({
        severity: ToastSeverity.SUCCESS,
        summary: "Registration success",
        detail: "Registered successfully. Please login to access your account.",
      });
      return;
    }
    toastService.add({
      severity: ToastSeverity.ERROR,
      summary: "Registration failed",
      detail:
        "An error occurred while trying to register. Please try again later.",
    });

  }


  // Unable to complete registration
  toastService.add({
    severity: ToastSeverity.ERROR,
    summary: "Registration failed",
    detail:
      "An error occurred while trying to register. Please try again later.",
  });

};

const sendCV = async () => {
  if (cvpdf.value) {
    const formData = new FormData();
    formData.append("file", cvpdf.value);

    try {
      const response = await fetch("https://pdf-ocr-6zcqyqd5qa-ue.a.run.app/uploadpdf/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      let envio = await createCV(data);
      return envio;

    } catch (error) {
      console.error("There was a problem with the fetch operation: " + error.message);
      return -1;
    }
  } else {
    console.log("No file to send");
    return -1;
  }
};

const createCV = async (cvResponse) => {
  if (cvpdf.value) {
    const formData = new FormData();
    formData.append("data", cvpdf.value);
    formData.append("title", cvResponse.filename);
    formData.append("extract", cvResponse.content);

    try {
      const response = await axios.post("https://staging-dot-wawapi.uc.r.appspot.com/api/v1/cv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      //const respuestaCV = await response.json()
      if (response.status != 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;
      console.log(data);
      return data.id;
    } catch (error) {
      console.error(error);
      return -1;
    }
  } else {
    console.log("No file to send");
    return -1;
  }
};

const readFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const uploadCV = async (event) => {
  const file = event.target.files[0];
  if (file) {
    cvFile.value = await readFile(file);
    cvpdf.value = file;
    pdfUploaded.value = true;
  } else {
    pdfUploaded.value = false;
  }
};

const handleButtonClick = async () => {
  // Create a copy so that we can delete props later
  const user = { ...state };
  // We don't need the checked state on the server
  delete user.confirmPassword;
  delete user.checked;

  const success = await auth.register(user);
  if (success) {
    router.push("/account/signin");
    // Registation complete
    toastService.add({
      severity: ToastSeverity.SUCCESS,
      summary: "Registration success",
      detail: "Registered successfully. Please login to access your account.",
    });
    return;
  }

  // Unable to complete registration
  toastService.add({
    severity: ToastSeverity.ERROR,
    summary: "Registration failed",
    detail:
      "An error occurred while trying to register. Please try again later.",
  });
};

</script>

<template>
  <div class="flex justify-center items-center">
    <form class="flex flex-col container max-w-md items-center mt-8 space-y-4" @submit.prevent="handleRegister">
      <div class="mb-6">
        <span class="text-2xl font-semibold">Create an account</span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText id="signup_fullName" v-model="v$.fullName.$model" type="text" class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.fullName.$invalid && submitted }" aria-describedby="signup_fullName-error" />
          <label for="signup_fullName" class="!bg-slate-100" :class="{ 'p-error': v$.fullName.$invalid && submitted }">
            Full Name
          </label>
        </span>
        <span v-if="v$.fullName.$error && submitted">
          <span v-for="(error, index) of v$.fullName.$errors" id="signup_fullName-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText id="signup_preferredName" v-model="v$.preferredName.$model" type="text"
            class="rounded w-full !bg-transparent" :class="{ 'p-invalid': v$.preferredName.$invalid && submitted }"
            aria-describedby="signup_preferredName-error" />
          <label for="signup_preferredName" class="!bg-slate-100"
            :class="{ 'p-error': v$.preferredName.$invalid && submitted }">
            How should we call you?
          </label>
        </span>
        <span v-if="v$.preferredName.$error && submitted">
          <span v-for="(error, index) of v$.preferredName.$errors" id="signup_preferredName-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>




      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText id="signup_email" v-model="v$.email.$model" type="email" class="rounded w-full !bg-transparent"
            :class="{ 'p-invalid': v$.email.$invalid && submitted }" aria-describedby="signup_email-error" />
          <label for="signup_email" class="!bg-slate-100" :class="{ 'p-error': v$.email.$invalid && submitted }">
            Email
          </label>
        </span>
        <span v-if="v$.email.$error && submitted">
          <span v-for="(error, index) of v$.email.$errors" id="signup_email-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>


      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText id="signup_password" v-model="v$.password.$model" type="password"
            class="rounded w-full !bg-transparent" :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            aria-describedby="signup_password-error" />
          <label for="signup_password" class="!bg-slate-100" :class="{ 'p-error': v$.password.$invalid && submitted }">
            Password
          </label>
        </span>
        <span v-if="v$.password.$error && submitted">
          <span v-for="(error, index) of v$.password.$errors" id="signup_password-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText id="signup_confirmPassword" v-model="v$.confirmPassword.$model" type="password"
            class="rounded w-full !bg-transparent" :class="{ 'p-invalid': v$.confirmPassword.$invalid && submitted }"
            aria-describedby="signup_confirmPassword-error" />
          <label for="signup_confirmPassword" class="!bg-slate-100"
            :class="{ 'p-error': v$.confirmPassword.$invalid && submitted }">
            Confirm Password
          </label>
        </span>
        <span v-if="v$.confirmPassword.$error && submitted">
          <span v-for="(error, index) of v$.confirmPassword.$errors" id="signup_confirmPassword-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <Calendar id="signup_birthdate" v-model="v$.birthdate.$model" selection-mode="single"
            input-class="rounded w-full !bg-transparent" class="w-full"
            :class="{ 'p-invalid': v$.birthdate.$invalid && submitted }" aria-describedby="signup_birthdate-error" />
          <label for="signup_birthdate" class="!bg-slate-100" :class="{ 'p-error': v$.birthdate.$invalid && submitted }">
            Select Bithday
          </label>
        </span>
        <span v-if="v$.birthdate.$error && submitted">
          <span v-for="(error, index) of v$.birthdate.$errors" id="signup_birthdate-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full">
        <span class="p-float-label w-full">
          <InputText id="signup_pictureHref" v-model="v$.picture?.href.$model" type="text"
            class="rounded w-full !bg-transparent" :class="{ 'p-invalid': v$.picture?.href.$invalid && submitted }"
            aria-describedby="signup_pictureHref-error" />
          <label for="signup_pictureHref" class="!bg-slate-100"
            :class="{ 'p-error': v$.picture?.href.$invalid && submitted }">
            Profile Image URL
          </label>
        </span>
        <span v-if="v$.picture?.href.$error && submitted">
          <span v-for="(error, index) of v$.picture?.href.$errors" id="signup_pictureHref-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="w-full" style="display: flex; flex-direction: column; align-items: center;">
        <label for="uploadCV" class="!bg-slate-100">
          Carga tu CV
        </label>
        <span class="p-float-label w-full">
          <input id="uploadCV" ref="fileInput" type="file" accept=".pdf" style="border: 1px solid #ccc; padding: 8px;"
            @change="uploadCV" class="rounded w-full !bg-transparent" />
        </span>
        <span v-if="v$.pdfUploaded.$error && submitted">
          <small class="p-error">Debes subir un CV</small>
        </span>
        <p>
          Sube tu CV para obtener ofertas personalizadas.
        </p>
      </div>





      <div class="my-4">
        <ToggleButton v-model="v$.checked.$model" on-label="I agree with terms and conditions"
          off-label="I disagree with terms and conditions" :on-icon="PrimeIcons.CHECK" :off-icon="PrimeIcons.TIMES"
          aria-describedby="signup_checked-error" />
        <span v-if="v$.checked.$error && submitted" class="block text-center mt-1">
          <span v-for="(error, index) of v$.checked.$errors" id="signup_checked-error" :key="index">
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
      </div>

      <div class="my-2 w-full">
        <button type="submit"
          class="w-full py-2 px-3 rounded transition-colors text-white bg-slate-500 hover:bg-slate-700 font-semibold">
          Sign Up
        </button>
      </div>


      <div class="my-2">
        <span>Already on WAW? </span>
        <RouterLink to="/account/signin" class="font-semibold">
          Sign In
        </RouterLink>
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


