//theme
import "primevue/resources/themes/soho-dark/theme.css";     
//core
import "primevue/resources/primevue.min.css";

import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import BOVue from "./BO.vue";

export const BOPlugin = {
  install(app, options) {
    app.use(PrimeVue)
    app.component('Button', Button);
    app.component('BO', BOVue)
  }
}