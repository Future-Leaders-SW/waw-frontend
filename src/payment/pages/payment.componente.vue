<script setup>
import { Router } from "@/router";
import { onBeforeMount, onMounted, ref } from "vue";
import {useSubscriptionStore} from "@/stores/pagostores";
import { storeToRefs } from "pinia";

import { usePayment } from "@/payment/services/payment.service";
import { useAuth } from "@/accounts/services/auth.service.js";
import {useBilling} from "@/billing/services/billing.service";

const router = Router;
const service = usePayment();
const auth = useAuth();
const serviceBilling = useBilling();
const users = ref([]);
const billing = ref([]);
const user = ref(auth.user)

const jobs = ref([]);
const auxUsers = ref();
const  useSubscription = useSubscriptionStore();

const { datos } = storeToRefs(useSubscription);
user.value = auth.user;
console.log(user.value)
const aux1 = ref(0);

console.log(datos);
const subscription =datos;
console.log(subscription.value)

let subscriptionId = ref(1)
const userId = ref("Pro")
const startDate = ref(30)
const endDate = ref(25)
const payedAmount = ref("asdsfsd")
const payedDate = ref(1)



const cardName = ref("");
const tarjeta = ref();
const fechaVen = ref();
const cvc = ref();
const precioPro = ref(25);
const precioMaster = ref(40);
const message = ref(0);



//para ver is esta logeado
onBeforeMount(() => {
  if (!auth.loggedIn) {
    router.push("/account/signin");
  }
});

ref(0);
const processPay = async () => {
  if (!cardName.value || !tarjeta.value || !fechaVen.value || !cvc.value) {
    message.value = 1;
  }
  const allUsers = await auth.getAll();
  users.value = allUsers.data;
  console.log(users.value)



    let res = null;
    const response = await service.getAll();
    jobs.value = response.data;
    console.log(jobs.value)
   console.log(subscription.value)
  if(subscription.value +1 === jobs.value[1].id){
    console.log(jobs.value[1].item)
    aux1.value = 1;
  }
  else if(subscription.value +1 === jobs.value[2].id){
    console.log(jobs.value[2].item);
    aux1.value = 2;
  }

    try{
        res = await serviceBilling.create(
          {
            subscriptionId : aux1.value,
            userId : user,
            startDate: "",
            endDate:"",
            payedAmount : jobs.value[aux1.value].cost,
            payedDate:""
          }
        );


      console.log(res.data)
      router.push("/");
    }catch (e){
      console.log("error al cargar informacion")
    }finally {

      console.log("la compra fue correcta");
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
            <div v-if="subscription === 0" class="pt-4">
              <h1 class="block font-medium mb-2">Resumen de Pedido</h1>

              <br />
              <h2 class="text-gray-500">Plan Pro $ {{ precioPro }}</h2>
              <h4 class="text-gray-500 text-sm m-4">
                el plan es facturado mensualmente
              </h4>
              <hr class="m-2 border-2 border border-black" />

              <div class="my-4 text-gray-500">
                <div class="text-sm m-4 flex justify-between">
                  <p>SubTotal</p>
                  <p>$ {{ precioPro }}.00</p>
                </div>
                <div class="text-sm m-4 flex justify-between">
                  <p class="text-sm">IGV</p>
                  <p class="text-sm">$ 0.00</p>
                </div>
                <div class="text-sm m-4 flex justify-between">
                  <h3 class="block text-md">Precio Total</h3>
                  <h3 class="block text-md">{{ precioPro }}.00</h3>
                </div>
              </div>

            </div>

            <div v-if="subscription === 1" class="pt-4">
              <h1 class="block font-medium mb-2">Resumen de Pedido</h1>
              <br />

              <h2 class="text-gray-500">Plan Pro Master $ {{ precioMaster }}</h2>
              <br />
              <h4 class="text-gray-500 text-sm m-4">
                el plan es facturado mensualmente
              </h4>
              <hr class="m-2 border-2 border border-black" />

              <div class="my-4 text-gray-500">
                <div class="text-sm m-4 flex justify-between">
                  <p>SubTotal</p>
                  <p>$ {{ precioMaster }}.00</p>
                </div>
                <div class="text-sm m-4 flex justify-between">
                  <p class="text-sm">IGV</p>
                  <p class="text-sm">$ 0.00</p>
                </div>
                <div class="text-sm m-4 flex justify-between">
                  <h3 class="block text-md">Precio Total</h3>
                  <h3 class="block text-md">{{ precioMaster }}.00</h3>
                </div>
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
