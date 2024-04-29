<script setup lang="ts">
import { defineProps } from "vue";
const { close } = defineProps<{
  close: Function;
}>();

const handleClose = () => {
  console.log("close");
  close();
};
</script>

<template>
  <div
    class="w-full h-full bg-white opacity-55 fixed top-0 right-0 z-40"
    @click="handleClose"
  ></div>

  <div
    class="w-1/2 bg-slate-800 rounded-lg shadow-lg p-8 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
