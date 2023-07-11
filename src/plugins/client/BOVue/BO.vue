<template>
  <Sidebar position="left" :showCloseIcon="false" :modal="false" visible >
    <template #header>
      <h3>Admin</h3> 
    </template>
    <Listbox v-model="selectedPage" :options="menuItems" class="w-full sidebar-list" optionLabel="name">
      <template #option="slotProps">
        <div class="flex align-items-center">
            <i :class="slotProps.option.icon" class="mr-4" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
    </Listbox>
  </Sidebar>
  <div>hehe</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  menuItems: []
})

const menuItems = ref(props.menuItems);
const selectedPage = ref(menuItems.value.find(item => item.code === 'new'))

</script>

<style lang="scss" scoped>
  
</style>

<style lang="scss">
  html {
    font-size: 14px;
    background-color: var(--surface-ground);
  } 

  .sidebar-list {
    border: none;
  }
  
  h3 {
    margin: 0;
  }
</style>