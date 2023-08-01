<template>
  <div>
    <BO :menu-items="menuItems" :name="appStore.name">
      <template #content>
        <router-view></router-view>
      </template>
    </BO>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "./stores/AppStore.js";

const appStore = useAppStore();

console.log(' app setup ');

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

</script>

<style lang="scss">
  html {
    font-size: 14 px;
  }
</style>