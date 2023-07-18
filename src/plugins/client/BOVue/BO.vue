<template>
  <Sidebar position="left" :showCloseIcon="false" :modal="false" visible>
    <template #header>
      <h3>{{ name }}</h3>
    </template>
    <Drawer :menuItems="props.menuItems"></Drawer>
  </Sidebar>
</template>

<script setup>
const props = defineProps(['menuItems', 'name'])

</script>

<style lang="scss" scoped></style>

