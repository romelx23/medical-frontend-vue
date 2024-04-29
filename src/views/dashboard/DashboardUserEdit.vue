<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { IDoctor } from "../../types/patient";
import { ErrorMessage, useForm } from "vee-validate";
import { getDoctors } from "../../config/Doctor";
import { IRole, IUser } from "../../types/user";
import { getUser, getRoles, updateUser } from "../../config/Users";

const user = ref<IUser | null>(null);
const roles = ref<IRole[] | null>(null);
const { params } = useRoute();
// const { errors, setErrors, setFieldValue } = useForm({
const doctors = ref<IDoctor[]>([]);
const { setValues, defineField, handleSubmit, resetForm } = useForm({
  initialValues: {
    name: "",
    role: "",
  },
});

const [name, nameAttrs] = defineField("name");
const [role, roleAttrs] = defineField("role");

const router = useRouter();

const onSubmit = handleSubmit.withControlled((values) => {
  // alert(JSON.stringify(values, null, 2));
  updateUser(values, params.id as string)
    .then(() => {
      resetForm();
      router.push({ name: "DashboardUsersList" });
    })
    .catch((error) => {
      console.log(error);
    });
});

const validateRequired = (value: any) => {
  if (!value) {
    return "Este campo es requerido";
  }
  return true;
};

onMounted(async () => {
  user.value = await getUser(params.id as string);
  roles.value = await getRoles();

  console.log(user.value);
  // setFieldValue("name", pacient.value?.name || "");
  // setFieldValue("email", pacient.value?.email || "");
  // setFieldValue("phone", pacient.value?.phone || "");
  // setFieldValue("address", pacient.value?.address || "");
  // setFieldValue("description", pacient.value?.description || "");
  setValues({
    name: user.value?.name || "",
    role: user.value?.role || "",
  });
});

onMounted(async () => {
  console.log(params.id);
  const result = await getDoctors();
  console.log(result);
  doctors.value = result?.patients || [];
});
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl">Editar Usuario</h1>
    <form class="flex flex-col gap-2 px-4 pt-4" @submit="onSubmit">
      <label class="flex" for="name">
        <span class="w-36 pl-3 flex items-center"> Nombre </span>

        <input
          name="name"
          id="name"
          type="text"
          placeholder="Juan Gabriel"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="name"
          v-bind="nameAttrs"
        />
      </label>
      <ErrorMessage name="name" />

      <label class="flex" for="role">
        <span class="w-36 pl-3 flex items-center"> Rol </span>

        <!-- <input
          name="role"
          id="role"
          type="text"
          placeholder="user"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="role"
          v-bind="roleAttrs"
        /> -->
        <select
          name="role"
          id="role"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="role"
          v-bind="roleAttrs"
        >
          <option v-for="role in roles" :key="role.id" :value="role.name">
            {{ role.name }}
          </option>
        </select>
      </label>
      <ErrorMessage name="role" />
      <button class="btn_add">Enviar Formulario</button>
    </form>
  </div>
</template>

<style scoped></style>
