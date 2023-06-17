<template>
  <div>
    Single page app
    <Header></Header>
    <img :src="'/img/cat.jpg'" />
    <div class="bgImg"></div>
  </div>
</template>

<script setup>
import Header from './Header.vue';

</script>

<style lang="scss" scoped>
  .bgImg {
    background: url('/img/cat.jpg');
  }
</style>