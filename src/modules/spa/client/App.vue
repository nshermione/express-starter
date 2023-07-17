<template>
  <div>
    <div>{{ appStore.name }}</div>
    <router-link to="/">Home page</router-link>
    <router-link to="/about">About page</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup>


import { useAppStore } from './stores/AppStore.js';

const appStore = useAppStore();

</script> 

<style lang="scss">
  html {
    font-size: 14 px;
  }
</style>