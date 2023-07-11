import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore('AppStore', () => {
  // const count = ref(0)
  const name = ref('SPA App')
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  const menuItems = ref([
    { code: 'new', name: 'New', icon: 'pi pi-plus'}
  ]);

  return { name, menuItems }
})