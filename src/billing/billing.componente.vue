<template>
  <div class="container mx-auto">
    <div class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl ml-12">Boletas</h1>
        <div class="bg-teal-300 w-3/4 p-0"></div>
      </div>

      <br />
      <div>
        <div v-if="subscription === 0 || subscription === 1">
          <div v-if="subscription === 0" class="gap-4" >

            <div class="bg-white shadow-lg rounded-lg p-6 w-full my-4">
              <h3 class="text-xl font-bold mb-4">Boleta 1</h3>
              <div class="flex justify-between">
                <p class="text-gray-600 block">Plan Pro</p>
              </div>
              <div class="flex justify-between">
                <p class="text-gray-600">Fecha</p>
                <p class="text-gray-600">05/05/23</p>
              </div>
              <div class="flex justify-between">
                <p class="text-gray-600">Total</p>
                <p class="text-gray-600">$ 25.00</p>
              </div>
            </div>
          </div>
          <div v-if="subscription === 1 " class="gap-4" >

            <div class="bg-white shadow-lg rounded-lg p-6 w-full my-4">
              <h3 class="text-xl font-bold mb-4">Boleta 1</h3>
              <div class="flex justify-between">
                <p class="text-gray-600 block">Plan Master</p>
              </div>
              <div class="flex justify-between">
                <p class="text-gray-600">Fecha</p>
                <p class="text-gray-600">05/05/23</p>
              </div>
              <div class="flex justify-between">
                <p class="text-gray-600">Total</p>
                <p class="text-gray-600">$ 40.00</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1 class="font-bold text-3xl ml-12">No hay Boletas</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
import { ref } from "vue";
const factura = ref([]);
 */

import {useSubscriptionStore} from "@/stores/pagostores";
import { storeToRefs } from "pinia";
import { ref } from "vue";


const  useSubscription = useSubscriptionStore();

const { datos } = storeToRefs(useSubscription);

let list1 = ref([]);
console.log(datos)
const subscription =datos;
console.log(subscription.value)




</script>
