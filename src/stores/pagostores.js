import { defineStore } from "pinia";
import { ref } from "vue";

export const useSubscriptionStore = defineStore("subscriptionStore", () => {
  const datos = ref();


  const add = (dato) => {
      datos.value = dato;
  };

  return {
    datos,
    add,
  };
});