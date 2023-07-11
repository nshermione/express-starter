import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore('AppStore', () => {
  const name = ref('SPA App')
  const menuItems = ref([
    { code: 'new', name: 'New', icon: 'pi pi-plus'}
  ]);

  return { name, menuItems }
})