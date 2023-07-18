<template>
  <ScrollPanel class="w-full h-full custom" style="width: 280px;">
    <div v-for="item in menuItems" class="flex flex-column select-none">
      <div class="flex justify-content-between cursor-pointer px-4 py-3 hover:bg-cyan-100" @click="onMenuClick(item)">
        <div class="flex align-items-center">
          <i :class="item.icon" class="mr-4" />
          <div>{{ item.name }}</div>
        </div>
        <i class="pi" :class="{ 'pi-angle-down': item.expanded, 'pi-angle-up': !item.expanded }" v-if="item.items" />
      </div>
      <div class="flex flex-column transition-duration-300 overflow-hidden relative child"
        :style="{ height: item.height }" v-if="item.items" ref="expandBlocks" :data-key="item.key">
        <div v-for="child of item.items" class="flex align-items-center pl-6 py-3 cursor-pointer hover:bg-cyan-100">
          <i :class="child.icon" class="mr-4" />
          <div>{{ child.name }}</div>
        </div>
      </div>
    </div>
  </ScrollPanel>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps(['menuItems'])
const menuItems = ref(props.menuItems);

for (const item of menuItems.value) {
  item.height = 0;
}
const expandBlocks = ref([])

function onMenuClick(item) {
  if (item.items) {
    item.expanded = !item.expanded;
    if (item.expanded) {
      for (const block of expandBlocks.value) {
        if (block.getAttribute('data-key') === item.key) {
          item.height = `${block.scrollHeight}px`;
        }
      }
    } else {
      item.height = 0;
    }
  }
}
</script>

<style lang="scss" scoped>

.child::before {
  content: '';
  width: 1px;
  height: 90%;
  top: 5%;
  left: 20px;
  position: absolute;
  // background: #ddd;
}

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