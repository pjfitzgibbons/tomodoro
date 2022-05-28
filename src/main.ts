import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/views/App.vue";
import router from "./router";
import '@/main.css'

// @ts-ignore
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
