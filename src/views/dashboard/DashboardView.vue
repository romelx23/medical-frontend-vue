<script setup lang="ts">
import Navbar from "../../components/Navbar.vue";
import { useRouter } from "vue-router";
import { authStore } from "../../store/authStore";
import { computed } from "vue";
const router = useRouter();
console.log(router.currentRoute.value);

const authContext = authStore();
const user = computed(() => authContext.user);
console.log(user.value);
const isRoleAdmin = user?.value?.role === "admin";

const isRoleAdminOrDoctor =
  user?.value?.role === "admin" || user?.value?.role === "doctor";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <!-- <h1 class="text-2xl">Dashboard</h1> -->
    <!-- <div class="flex border"> -->
    <div class="grid grid-cols-[200px_1fr] boder">
      <div class="flex flex-col border border-yellow-300 min-h-[70vh]">
        <router-link
          :to="{ name: 'DashboardHome' }"
          class="flex gap-4 px-2 py-5 text-slate-500 hover:bg-yellow-400 hover:text-black transition-colors"
          exact-active-class="bg-yellow-300 text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-home"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
          </svg>
          Home
        </router-link>

        <router-link
          :to="{ name: 'DashboardPatientsList' }"
          class="flex gap-4 px-2 py-5 text-slate-500 hover:opacity-60 hover:bg-yellow-400 hover:text-black transition-colors"
          :class="[
            router.currentRoute.value.path.startsWith('/dashboard/pacientes')
              ? 'bg-yellow-300 text-black'
              : '',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-users"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
          Pacientes
        </router-link>

        <router-link
          :to="{ name: 'DashboardDoctorsList' }"
          class="flex gap-4 px-2 py-5 text-slate-500 hover:opacity-60 hover:bg-yellow-400 hover:text-black transition-colors"
          :class="[
            router.currentRoute.value.path.startsWith('/dashboard/doctores')
              ? 'bg-yellow-300 text-black'
              : '',
          ]"
          v-if="isRoleAdminOrDoctor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-stethoscope"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1"
            />
            <path d="M8 15a6 6 0 1 0 12 0v-3" />
            <path d="M11 3v2" />
            <path d="M6 3v2" />
            <path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          </svg>
          Doctores
        </router-link>
        <!-- usuarios -->
        <router-link
          :to="{ name: 'DashboardUsersList' }"
          class="flex gap-4 px-2 py-5 text-slate-300 hover:opacity-60 hover:bg-yellow-400 hover:text-black transition-colors"
          :class="[
            router.currentRoute.value.path.startsWith('/dashboard/usuarios')
              ? 'bg-yellow-300 text-slate-400'
              : '',
          ]"
          v-if="isRoleAdmin"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-database"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" />
            <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
            <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
          </svg>
          Usuarios
        </router-link>
      </div>
      <!-- <div> -->
      <router-view></router-view>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped></style>
