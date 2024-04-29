<script setup lang="ts">
import { computed } from "vue";

interface ILink {
  name: string;
  to: string;
  routeName: string;
  params: Record<string, string>;
}

interface ILinkProps {
  link: ILink;
}

const props = defineProps<ILinkProps>();

const externalLink = computed(() => {
  return props.link.to.startsWith("http");
});
</script>

<template>
  <a v-if="externalLink" :href="link.to" target="_blank" class="link">{{
    link.name
  }}</a>
  <router-link
    v-if="!externalLink"
    :to="{ name: link.routeName, params: { id: 4 } }"
    class="link"
    v-slot="{ isActive }"
  >
    <!-- href,isActive -->
    <a :class="isActive ? 'is-active ' : 'normal-link'">{{ link.name }}</a>
  </router-link>
</template>

<style scoped>
.is-active {
  color: rgb(39, 246, 50);
}

.normal-link {
  color: rgb(225, 38, 38);
}
</style>
