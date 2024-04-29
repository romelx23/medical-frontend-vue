<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { IDoctor } from "../../types/patient";
import { ErrorMessage, useForm } from "vee-validate";
import { getDoctor, updateDoctor } from "../../config/Doctor";

const doctorDashboard = ref<IDoctor | null>(null);
// const { params } = useRoute();
const { params } = useRoute();
const router = useRouter();
// const { errors, setErrors, setFieldValue } = useForm({
const { setValues, defineField, handleSubmit, resetForm } = useForm({
  initialValues: {
    name: "",
    last_name: "",
    email: "",
    phone: "",
    specilization: "",
    sub_specilization: "",
  },
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [phone, phoneAttrs] = defineField("phone");
const [specilization, specilizationAttrs] = defineField("specilization");

const onSubmit = handleSubmit.withControlled((values) => {
  updateDoctor(values, params.id as string)
    .then(() => {
      resetForm();
      router.push({ name: "DashboardDoctorsList" });
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
  doctorDashboard.value = await getDoctor(params.id as string);

  console.log(doctorDashboard.value);
  setValues({
    name: doctorDashboard.value?.name || "",
    last_name: doctorDashboard.value?.last_name || "",
    email: doctorDashboard.value?.email || "",
    phone: doctorDashboard.value?.phone || "",
    specilization: doctorDashboard.value?.specialization || "",
    // age: pacient.value?.age || 0,
  });
});
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl">Editar Doctor</h1>
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
      <label class="flex" for="email">
        <span class="w-36 pl-3 flex items-center"> Email </span>

        <input
          name="email"
          id="email"
          type="text"
          placeholder="juan32@gmail.com"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="email"
          v-bind="emailAttrs"
        />
      </label>
      <ErrorMessage name="email" />
      <label class="flex" for="phone">
        <span class="w-36 pl-3 flex items-center"> Teléfono </span>

        <input
          name="phone"
          id="phone"
          type="text"
          placeholder="894321345"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="phone"
          v-bind="phoneAttrs"
        />
      </label>
      <ErrorMessage name="phone" />
      <label class="flex" for="specilization">
        <span class="w-36 pl-3 flex items-center"> Especializacion </span>

        <input
          name="specilization"
          id="specilization"
          type="text"
          placeholder="Jr. tarma 4389 Alamos"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="specilization"
          v-bind="specilizationAttrs"
        />
      </label>
      <ErrorMessage name="sub_specilization" />
      <label class="flex" for="sub_specilization">
        <span class="w-36 pl-3 flex items-center"> Especializacion </span>

        <input
          name="sub_specilization"
          id="sub_specilization"
          type="text"
          placeholder="Jr. tarma 4389 Alamos"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="specilization"
          v-bind="specilizationAttrs"
        />
      </label>
      <ErrorMessage name="sub_specilization" />
      <button class="btn_add">Enviar Formulario</button>
    </form>
  </div>
</template>

<style scoped></style>
