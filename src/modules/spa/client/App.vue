<template>
  <div>
    {{ appStore.name }}
    <Header></Header>
    <router-link to="/">Home page</router-link>
    <router-link to="/about">About page</router-link>
    <router-view></router-view>
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