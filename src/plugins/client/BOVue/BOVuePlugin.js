
import 'primeflex/primeflex.css';

// //core
import "primevue/resources/primevue.min.css";

// //theme
import "primevue/resources/themes/lara-light-indigo/theme.css";

import 'primeicons/primeicons.css';
import "./BOStyle.scss";

// Library
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import ScrollPanel from 'primevue/scrollpanel';
// BO 
import DrawerVue from './Drawer.vue';
import BOVue from './BO.vue';


export const BOVuePlugin = {
  install(app, options) {
    app.use(PrimeVue)

    const components = {
      Button,
      Sidebar,
      ScrollPanel,
      Drawer: DrawerVue,
      BO: BOVue,
    }
    const names = Object.keys(components);
    for (const name of names) {
      app.component(name, components[name]);
    }
  }
}