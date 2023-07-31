import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore('AppStore', () => {
  const name = ref('BO App')
  const menuItems = ref([
    { key: 'dashboard', name: 'Dashboard', icon: 'pi pi-home', path: '/', },
    {
      key: 'user', name: 'User', icon: 'pi pi-user', items: [
        { key: 'report', name: 'Report', icon: 'pi pi-table', path: '/user/report' },
      ]
    },
    {
      key: 'settings', name: 'Settings', icon: 'pi pi-cog', items: [
        { key: 'about', name: 'About', icon: 'pi pi-info', path: '/about' },
      ]
    },

  ]);

  return { name, menuItems  }
})