<script setup>
import Card from "primevue/card";
import Button from 'primevue/button';
import Toolbar from "primevue/toolbar";

</script>

<template>
  <div>
    <Toolbar class="p-4 flex flex-auto">
      <template #start>
        <h1 class="text-xl font-semibold">Available Plans</h1>
      </template>

      <template #end>
        <div class="space-x-1 mr-4">
        </div>
      </template>
    </Toolbar>
  </div>
  <div class="card-container">
    <Card>
      <template #header>
        <img class="pv-image-holder"
             imageClass="pv-image-circle"
             alt="Plan Basic Image"
             src="../../assets/image-plans/basic.png"
             width="275"
             height="275"
             preview/>
      </template>
      <template #title>
        <i class="pi pi-check"> Apply to 10 offers/month</i>
        <br>
        <i class="pi pi-check"> Email support</i>
        <br>
        <i class="pi pi-check"> Knowledge Base access</i>
        <br>
        <i class="pi pi-check"> Basic AI Job Offer recommendations</i>
      </template>
      <template #footer>
        <Button class="custom-button" type="button" label="Upgrade"/>
      </template>
    </Card>
    <Card>
      <template #header>
        <img class="pv-image-holder"
             imageClass="pv-image-circle"
             alt="Plan Basic Image"
             src="../../assets/image-plans/pro.png"
             width="275"
             height="275"
             preview/>
      </template>
      <template #title>
        <i class="pi pi-check">Everything in Basic</i>
        <br>
        <i class="pi pi-check">Apply to 30 offers/month</i>
        <br>
        <i class="pi pi-check">Personalized job offer recommendations based on your job preferences, experience and education background.</i>
        <br>
        <i class="pi pi-check">Receive alerts for new job recommendations based on your preferences.</i>
        <br>
        <i class="pi pi-check">Priority email support</i>
      </template>
      <template #footer>
        <Button class="custom-button" type="button" label="Upgrade"/>
      </template>
    </Card>
    <Card>
      <template #header>
        <img class="pv-image-holder"
             imageClass="pv-image-circle"
             alt="Plan Basic Image"
             src="../../assets/image-plans/pro-master.png"
             width="275"
             height="275"
             preview/>
      </template>
      <template #title>
        <i class="pi pi-check">Everything in Pro</i>
        <br>
        <i class="pi pi-check">Apply to unlimited offers/month</i>
        <br>
        <i class="pi pi-check">Early access to our latest features</i>
        <br>
        <i class="pi pi-check">Team management, candidate tracking, and customizable job offer recommendations</i>
        <br>
        <i class="pi pi-check">Phone and email priority support</i>
      </template>
      <template #footer>
        <Button class="custom-button" type="button" label="Upgrade"/>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
}

.card-container > * {
  flex: 1;
  margin-right: 60px;
}

.card-container > *:last-child {
  margin-right: 0;
}

.custom-button {
  width: 100%;
  padding: 10px;
  background-color: #4286f4;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>