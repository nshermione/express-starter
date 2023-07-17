import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore('AppStore', () => {
  const name = ref('SPA App')
  const menuItems = ref([
    { code: 'dashboard', name: 'Dashboard', icon: 'pi pi-home', group: '' },
    {
      code: 'user', name: 'User', icon: 'pi pi-user', group: 'User', items: [
        { code: 'report', name: 'Report', icon: 'pi pi-table' }
      ]
    }
  ]);
  const selectedMenu = ref(menuItems.value.find(item => item.code === 'dashboard'));

  return { name, menuItems, selectedMenu }
})