<script setup lang="ts">
import Modal from "./Modal.vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { registerPatient } from "../config/Patient";
const { errors } = useForm({
  initialValues: {
    name: "",
    email: "",
    phone: "",
    address: "",
    age: 0,
    description: "",
  },
});
const onSubmit = (values: any, { resetForm }: any) => {
  console.log(values);
  console.log("enviado");
  registerPatient(values).then(() => {
    resetForm();
    close();
    refreshPatients();
  });
};

console.log({ errors });

const validateRequired = (value: any) => {
  if (!value) {
    return "Este campo es requerido";
  }
  return true;
};
const { close, refreshPatients } = defineProps<{
  close: Function;
  refreshPatients: Function;
}>();
</script>

<!-- Modal Register Pacientes -->
<template>
  <Modal :close="close">
    <span class="text-2xl">Ingrese Paciente</span>
    <Form class="flex flex-col gap-2 mt-2" @submit="onSubmit">
      <label class="flex" for="name">
        <span class="w-36"> Nombre </span>

        <Field
          name="name"
          id="name"
          type="text"
          placeholder="Juan Gabriel"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="name" />
      <label class="flex" for="email">
        <span class="w-36"> Email </span>

        <Field
          name="email"
          id="email"
          type="text"
          placeholder="juan32@gmail.com"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="email" />
      <label class="flex" for="phone">
        <span class="w-36"> Teléfono </span>

        <Field
          name="phone"
          id="phone"
          type="text"
          placeholder="894321345"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="phone" />
      <label class="flex" for="address">
        <span class="w-36"> Dirección </span>

        <Field
          name="address"
          id="address"
          type="text"
          placeholder="Jr. tarma 4389 Alamos"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="address" />
      <label class="flex" for="age">
        <span class="w-36"> Eddad </span>

        <Field
          name="age"
          id="age"
          type="number"
          placeholder="20"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="age" />
      <label class="flex" for="description">
        <span class="w-36"> Ingrese los sintomas </span>
        <Field
          as="textarea"
          name="description"
          id="description"
          placeholder="Tengo Fiebre alta, con algunos espasmos"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="description" />
      <button class="btn_add">Enviar Formulario</button>
    </Form>
  </Modal>
</template>

<style scoped></style>
