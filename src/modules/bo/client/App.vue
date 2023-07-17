import { useAppStore } from "./stores/AppStore.js";
<template>
  <div>
    <BO :menu-items="appStore.menuItems">
      <template #content>
        <router-view></router-view>
      </template>
    </BO>
  </div>
</template>

<script setup>
import { useAppStore } from "./stores/AppStore.js";

const appStore = useAppStore();

</script>

<style lang="scss">
  html {
    font-size: 14 px;
  }
</style>