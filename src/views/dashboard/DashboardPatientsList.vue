<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { IPatient } from "../../types/patient";
import { getPatients, deletePatient } from "../../config/Patient";
import ModalRegister from "../../components/ModalRegister.vue";

const patients = ref<IPatient[]>([]);
const search = ref<string>("");
const loading = ref<boolean>(false);
const showModal = ref<boolean>(false);
const pages = ref<number>(1);
const pagesItems = ref<number[]>([]);
const totalItems = ref<number>(1);
const closeModal = () => {
  showModal.value = false;
};

const refreshPatients = async () => {
  loading.value = true;
  const data = await getPatients()
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
  patients.value = data?.patients || [];
  pages.value = data?.pages || 1;
  totalItems.value = data?.total || 1;
};

const searchPatient = async (currentPage?: string) => {
  loading.value = true;
  console.log(search.value);
  const data = await getPatients(search.value, currentPage)
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
  patients.value = data?.patients || [];
  pages.value = data?.pages || 1;
  totalItems.value = data?.total || 1;
};

watch(pages, () => {
  console.log(pages.value);
  pagesItems.value = [...Array(pages.value).keys()];
});

onMounted(async () => {
  const data = await getPatients()
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
  patients.value = data?.patients || [];
  pages.value = data?.pages || 1;
});
</script>

<template>
  <div
    class="flex flex-col items-center w-full h-full min-h-screen py-4 px-5 overflow-x-auto"
  >
    <h1 class="text-3xl">Listado de Pacientes</h1>
    <form class="flex flex-wrap" @submit.prevent="() => searchPatient">
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
        Agregar Paciente
      </button>
      <button
        @click="refreshPatients"
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
    <div class="flex mt-2 gap-2">
      <span class="">paginación: </span>
      <div class="w-full flex gap-1">
        <template v-if="pages > 0">
          <template v-for="page in pagesItems" :key="page">
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              @click="() => searchPatient((page + 1).toString())"
            >
              {{ page }}
            </button>
          </template>
        </template>
      </div>
    </div>
    <div class="relative overflow-x-auto mt-2 w-full">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Product name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">número</th>
            <th scope="col" class="px-6 py-3">Dirección</th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="patient in patients"
            :key="patient.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ patient.name }}
            </th>
            <td class="px-6 py-4">{{ patient.email }}</td>
            <td class="px-6 py-4">{{ patient.phone }}</td>
            <td class="px-6 py-4">{{ patient.address }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <router-link
                  :to="{
                    name: 'DashboardPatientEdit',
                    params: { id: patient.id },
                  }"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Editar
                </router-link>
                <button
                  class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                  @click="
                    () => {
                      deletePatient(`${patient.id}`).finally(() =>
                        refreshPatients()
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
      <ModalRegister :close="closeModal" :refreshPatients="refreshPatients" />
    </template>
  </div>
</template>

<style scoped></style>
