
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
import Menu from 'primevue/menu';
import Sidebar from "primevue/sidebar";
import Listbox from 'primevue/listbox';
import ScrollPanel from 'primevue/scrollpanel';
// BO 
import BOVue from './BO.vue';
import DrawerVue from './Drawer.vue';


export const BOVuePlugin = {
  install(app, options) {
    app.use(PrimeVue)

    const components = {
      Button,
      Sidebar,
      ScrollPanel,
      BO: BOVue,
      Drawer: DrawerVue
    }
    const names = Object.keys(components);
    for (const name of names) {
      app.component(name, components[name]);
    }
  }
}