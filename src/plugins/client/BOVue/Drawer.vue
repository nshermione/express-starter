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
      <div class="flex flex-column overflow-hidden relative child"
        :style="{ height: item.height }" v-if="item.items" ref="expandBlocks" :data-key="item.key">
        <div v-for="child of item.items" class="flex align-items-center pl-6 py-3 cursor-pointer hover:bg-cyan-100" @click="onMenuClick(child)">
          <i :class="child.icon" class="mr-4" />
          <div>{{ child.name }}</div>
        </div>
      </div>
    </div>
  </ScrollPanel>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(['menuItems'])
const menuItems = ref(props.menuItems);
const router = useRouter();

for (const item of menuItems.value) {
  item.height = 0;
}
const expandBlocks = ref([])

router.beforeEach(async (to, from) => {
  for (const item of menuItems.value) {
    if (!item.items) continue;
    let founded = false;

    for (const child of item.items) {
      if (child.path && child.path === to.path) {
        expand(item);
        founded = true;
        break;
      }
    }

    if (founded) break;
  }
})


/** METHODS */

function onMenuClick(item) {
  if (item.items) {
    item.expanded = !item.expanded;
    if (item.expanded) {
      expand(item);
    } else {
      item.height = 0;
    }
  }
  if (item.path) {
    router.push(item.path);
  }
}

function expand(item) {
  item.expanded = true;
  for (const block of expandBlocks.value) {
    if (block.getAttribute('data-key') === item.key) {
      item.height = `${block.scrollHeight}px`;
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