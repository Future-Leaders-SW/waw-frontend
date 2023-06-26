<script setup>
import {useSubscriptionStore} from "@/stores/pagostores";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import {useBilling} from "@/billing/services/billing.service";
import { useAuth } from "@/accounts/services/auth.service.js";

const  useSubscription = useSubscriptionStore();
const auth = useAuth();
const user = ref(auth.user)
const usuarioActivo = ref();
usuarioActivo.value = user.value.id;
const { datos } = storeToRefs(useSubscription);


let list1 = ref([]);
console.log(datos)
const subscription =datos;
const service = useBilling();
const billing = ref([]);




console.log(subscription.value)

const ProcessInit = async ( )=>{
  try {
    const res = await service.getAll();
    billing.value = res.data;
    console.log(billing.value);
  }catch (e){
    console.log("error en el cofigo, revisarlo XD")
  }
}


onMounted(()=>{
  ProcessInit();
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("es-ES", options);
};


</script>

<template>
  <div class="container mx-auto">
    <div class="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <div class="flex justify-between">
        <h1 class="font-bold text-3xl ml-12">Boletas</h1>
        <div class="bg-teal-300 w-3/4 p-0"></div>
      </div>

      <br />
    <ul>
      <li
         v-for="item in billing"
        :key="item.id"

      >
       <div v-if="item.userId===usuarioActivo"  class="bg-gray-200 p-4 mb-2">
         <div>
           <h2>Boleta </h2>

         </div>
         <div v-if="item.payedAmount === 25">
           <p>Plan Pro</p>
         </div>
         <div v-if="item.payedAmount === 40">
           <p>Plan Master</p>
         </div>
         <div class="grid grid-cols-2  justify-items-center">
           <div>
             <p>Fecha de Inicio</p>
             <p>Fecha de Fin</p>
             <p>Total</p>
           </div>
           <div>
             <p>{{ formatDate(item.startDate) }}</p>
             <p>{{ formatDate(item.endDate) }}</p>
             <p>${{ item.payedAmount }}</p>
           </div>
         </div>
       </div>


      </li>
    </ul>

    </div>
  </div>
</template>


