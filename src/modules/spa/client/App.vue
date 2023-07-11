<template>
  <div>
    <!-- <Header></Header>
    <router-link to="/">Home page</router-link>
    <router-link to="/about">About page</router-link> -->
    
    <BO :menu-items="appStore.menuItems">
      <template #content>
        <router-view></router-view>
      </template>
    </BO>
  </div>
</template>

<script setup>


import Header from './Header.vue';
import { useAppStore } from './stores/AppStore';

const appStore = useAppStore();

</script>

<style lang="scss">
  html {
    font-size: 14 px;
  }
</style>