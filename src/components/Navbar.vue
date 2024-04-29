<script setup lang="ts">
import { authStore } from "../store/authStore";
const authContext = authStore();
</script>

<template>
  <nav class="flex justify-between py-3 px-5 items-center">
    <router-link to="/dashboard" class="text-slate-300 hover:underline"
      >Inicio</router-link
    >
    <div class="flex gap-3 items-center">
      <div class="block">
        {{
          authContext.user
            ? `Bienvenido, ${authContext.user.name} 👋`
            : "Inicia sesión"
        }}
      </div>
      <button
        v-if="authContext.user"
        @click="authContext.logout"
        class="text-slate -300 hover:underline"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<style scoped></style>
