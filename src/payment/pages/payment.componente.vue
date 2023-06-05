<script setup>
import { Router } from "@/router";
import { ref } from "vue";

const cardName = ref("");
const tarjeta = ref();
const fechaVen = ref();
const cvc = ref();
const precio = ref();
const message = ref(0);

precio.value = 25;
ref(0);
const processPay = () => {
  if (!cardName.value || !tarjeta.value || !fechaVen.value || !cvc.value) {
    message.value = 1;
  } else {
    console.log("la compra fue correcta");
    Router.push("/");
  }
};
</script>

<template>
  <div
    v-if="message === 1"
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert">
    <strong class="font-bold">Mensaje de Alerta: </strong>
    <span class="block sm:inline"> Llene todos los espacios</span>
  </div>
  <div
    v-if="message === 2"
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert">
    <strong class="font-bold">Mensaje : </strong>
    <span class="block sm:inline"> Se ha realizado el pago correctamente</span>
  </div>

  <div class="container mx-auto">
    <div class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h1
        class="font-bold text-center text-2xl m-2 pb-5 bg-teal-400 text-white p-5 m-0 w-full">
        Actualiza tu plan
      </h1>
      <form @submit.prevent="processPay" class="mt-2">
        <div class="flex flex-row gap-3">
          <div class="w-3/4">
            <div class="mb-4">
              <label class="block font-medium mb-2">Numero de la Tarjeta</label>
              <input
                id="tarjeta"
                v-model="tarjeta"
                type="text"
                class="form-input block w-full rounded-lg" />
            </div>

            <div class="mb-4">
              <label for="cardName" class="block font-medium mb-2"
                >Nombre en la Tarjeta</label
              >
              <input
                id="cardName"
                v-model="cardName"
                type="text"
                class="form-input block w-full rounded-lg" />
            </div>

            <div class="mb-4">
              <label for="fechaVen" class="block font-medium mb-2">
                Vencimiento</label
              >
              <input
                id="fechaVen"
                v-model="fechaVen"
                type="text"
                class="form-input block w-full rounded-lg" />
            </div>

            <div class="mb-4">
              <label for="cardName" class="block font-medium mb-2">CVC</label>
              <input
                id="cvc"
                v-model="cvc"
                type="text"
                class="form-input block w-full rounded-lg" />
            </div>
          </div>

          <div class="gap-4 text-center border-2 bg-gray-100 rounded-lg w-1/4">
            <div v-if="precio === 25" class="pt-4">
              <h1 class="block font-medium mb-2">Resumen de Pedido</h1>

              <br />

              <h2 class="text-gray-500">Plan Pro $ {{ precio }}</h2>
              <h4 class="text-gray-500 text-sm m-4">
                el plan es facturado mensualmente
              </h4>
              <hr class="m-2 border-2 border border-black" />
            </div>

            <div v-if="precio === 40" class="pt-4">
              <h1 class="block font-medium mb-2">Resumen de Pedido</h1>
              <br />

              <h2 class="text-gray-500">Plan Pro Master $ {{ precio }}</h2>
              <br />
              <h4 class="text-gray-500 text-sm m-4">
                el plan es facturado mensualmente
              </h4>
              <hr class="m-2 border-2 border border-black" />
            </div>
            <div class="my-4 text-gray-500">
              <div class="text-sm m-4 flex justify-between">
                <p>SubTotal</p>
                <p>$ {{ precio }}.00</p>
              </div>
              <div class="text-sm m-4 flex justify-between">
                <p class="text-sm">IGV</p>
                <p class="text-sm">$ 0.00</p>
              </div>
              <div class="text-sm m-4 flex justify-between">
                <h3 class="block text-md">Precio Total</h3>
                <h3 class="block text-md">{{ precio }}.00</h3>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Actualizar ahora
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
