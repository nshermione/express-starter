
import 'primeflex/primeflex.css';

// //theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
// //core
import "primevue/resources/primevue.min.css";

import 'primeicons/primeicons.css';


// Library
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Menu from 'primevue/menu';
import Sidebar from "primevue/sidebar";
import Listbox from 'primevue/listbox';
// BO 
import BOVue from "./BO.vue";

export const BOVuePlugin = {
  install(app, options) {
    app.use(PrimeVue)
    
    // @ts-ignore
    import("./BOStyle.scss");

    app.component('Button', Button);
    app.component('Menu', Menu);
    app.component('Sidebar', Sidebar);
    app.component('Listbox', Listbox);
    app.component('BO', BOVue)
  }
}