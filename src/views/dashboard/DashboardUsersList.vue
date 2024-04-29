<script setup lang="ts">
import { ref, onMounted } from "vue";
import { deletePatient } from "../../config/Patient";
import ModalRegisterDoctor from "../../components/ModalRegisterDoctor.vue";
import { getUsers } from "../../config/Users";
import { IUser } from "../../types/user";

const users = ref<IUser[]>([]);
const search = ref<string>("");
const loading = ref<boolean>(false);
const showModal = ref<boolean>(false);
const closeModal = () => {
  showModal.value = false;
};

const refreshDoctors = async () => {
  loading.value = true;
  const data = await getUsers()
    .then((response) => {
      loading.value = false;
      return response;
    })
    .catch(() => {
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
  users.value = data?.users || [];
};

const searchDoctor = async () => {
  loading.value = true;
  console.log(search.value);
  const data = await getUsers(search.value)
    .then((response) => {
      loading.value = false;
      return response;
    })
    .catch(() => {
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
  users.value = data?.users || [];
};

onMounted(async () => {
  const data = await getUsers()
    .then((response) => {
      loading.value = false;
      return response;
    })
    .catch(() => {
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
  users.value = data?.users || [];
});
</script>

<template>
  <div
    class="flex flex-col items-center w-full h-full min-h-screen py-4 px-5 overflow-x-auto"
  >
    <h1 class="text-3xl">Listado de Usuarios</h1>
    <form class="flex flex-wrap" @submit.prevent="searchDoctor">
      <input
        class="px-3"
        type="text"
        placeholder="Buscar paciente"
        v-model="search"
      />
      <button>buscar</button>
    </form>
    <div class="flex gap-2 pt-2 flex-wrap justify-end">
      <button
        @click="showModal = true"
        class="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        Agregar Doctor
      </button>
      <button
        @click="refreshDoctors"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Refrescar
      </button>
    </div>
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center relative"
    >
      <!-- loader -->
      <span>Cargando</span>
      <div
        class="inset-0 z-50 flex items-center justify-center w-20 h-20 border-2 border-l-transparent rounded-full animate-spin"
      />
    </div>
    <div class="relative overflow-x-auto mt-6 w-full">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Product name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Rol</th>
            <th scope="col" class="px-6 py-3">Fecha de creación</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ user.name.toUpperCase() }}
            </th>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">{{ user.role }}</td>
            <td class="px-6 py-4">
              {{ new Date(user.created_at).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <router-link
                  :to="{
                    name: 'DashboardUserEdit',
                    params: { id: user.id },
                  }"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Editar
                </router-link>
                <button
                  class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                  @click="
                    () => {
                      deletePatient(`${user.id}`).finally(() =>
                        refreshDoctors()
                      );
                    }
                  "
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-if="showModal">
      <ModalRegisterDoctor
        :close="closeModal"
        :refreshDoctors="refreshDoctors"
      />
    </template>
  </div>
</template>

<style scoped></style>
