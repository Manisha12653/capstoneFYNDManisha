import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Toaster from "@meforma/vue-toaster";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Toaster, {
    position: "top",
  })
  .mount("#app");
