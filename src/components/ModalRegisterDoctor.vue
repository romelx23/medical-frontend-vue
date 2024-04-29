<script setup lang="ts">
import Modal from "./Modal.vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { registerDoctor } from "../config/Doctor";
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
  registerDoctor(values);
  resetForm();
  close();
  refreshDoctors();
};

console.log({ errors });

const validateRequired = (value: any) => {
  if (!value) {
    return "Este campo es requerido";
  }
  return true;
};
const { close, refreshDoctors } = defineProps<{
  close: Function;
  refreshDoctors: Function;
}>();
</script>

<template>
  <Modal :close="close">
    <span class="text-2xl">Ingrese Paciente</span>
    <Form class="flex flex-col gap-2 mt-2" @submit="onSubmit">
      <label class="flex" for="name">
        <span class="w-36"> Nombre<span class="text-red-500">(*)</span> </span>

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
      <label class="flex" for="last_name">
        <span class="w-36">
          Apellido<span class="text-red-500">(*)</span>
        </span>

        <Field
          name="last_name"
          id="last_name"
          type="text"
          placeholder="Gonzales"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="last_name" />
      <label class="flex" for="email">
        <span class="w-36"> Email <span class="text-red-500">(*)</span> </span>

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
      <label class="flex" for="specialization">
        <span class="w-36">
          Especialización<span class="text-red-500">(*)</span>
        </span>

        <Field
          name="specialization"
          id="specialization"
          type="text"
          placeholder="Medico General"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="specialization" />
      <label class="flex" for="sub_specialization">
        <span class="w-36"
          >Sub Especialización<span class="text-red-500">(*)</span>
        </span>

        <Field
          name="sub_specialization"
          id="sub_specialization"
          type="text"
          placeholder="Medico General"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
        />
      </label>
      <ErrorMessage name="sub_specialization" />

      <button class="btn_add">Enviar Formulario</button>
    </Form>
  </Modal>
</template>

<style scoped></style>
