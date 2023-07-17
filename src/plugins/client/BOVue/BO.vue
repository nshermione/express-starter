<template>
  <Sidebar position="left" :showCloseIcon="false" :modal="false" visible>
    <template #header>
      <h3>Admin</h3>
    </template>
    <ScrollPanel>
      <div v-for="item in props.menuItems">
        <div class="flex justify-content-between cursor-pointer mx-4 my-4">
          <div class="flex align-items-center">
            <i :class="item.icon" class="mr-4" />
            <div>{{ item.name }}</div>
          </div>
          <i class="pi pi-angle-down" v-if="item.items" />
        </div>
        <div v-for="child of item.items" v-if="item.items" class="flex align-items-center mx-4 my-4 cursor-pointer">
          <i :class="child.icon" class="mr-4" />
          <div>{{ child.name }}</div>
        </div>
      </div>
    </ScrollPanel>
    <!-- <Listbox v-model="props.selectedMenu" :options="props.menuItems" optionGroupLabel="group" optionGroupChildren="items" class="w-full sidebar-list" optionLabel="name">
      <template #option="slotProps">
        <div>
         
        </div>
      </template>
    </Listbox> -->
  </Sidebar>
  <div>hehe</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(['menuItems', 'selectedMenu'])

</script>

<style lang="scss" scoped></style>

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