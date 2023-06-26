import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { Router } from "./router";
import PrimeVue from "primevue/config";
import { Vue3Mq } from "vue3-mq";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import { AuthServiceKey, JobsServiceKey,PayServiceKey,BillingServiceKey,scoreoffersServiceKey } from "./core/utils/keys";
import { AuthService } from "./accounts/services/auth.service";
import "@/assets/base.css";
import { JobsService } from "./jobs/services/jobs.service";
import { PaymentService } from "@/payment/services/payment.service";
import {BillingService} from "@/billing/services/billing.service";

const app = createApp(App);

app.use(Router);
app.use(PrimeVue);
app.use(Vue3Mq, { preset: "tailwind" });
app.use(ConfirmationService);
app.use(ToastService);
app.use(createPinia());

app.provide(AuthServiceKey, new AuthService());
app.provide(JobsServiceKey, new JobsService());
app.provide(PayServiceKey,  new PaymentService());
app.provide(BillingServiceKey,  new BillingService());
app.provide(BillingServiceKey,  new BillingService());
app.mount("#app");
