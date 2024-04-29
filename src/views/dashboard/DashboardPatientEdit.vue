<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getPatient, updatePatient } from "../../config/Patient";
import { IPatient, IDoctor } from "../../types/patient";
import { ErrorMessage, useForm } from "vee-validate";
import { getDoctors } from "../../config/Doctor";

const pacient = ref<IPatient | null>(null);
const { params } = useRoute();
// const { errors, setErrors, setFieldValue } = useForm({
const doctors = ref<IDoctor[]>([]);
const { setValues, defineField, handleSubmit, resetForm } = useForm({
  initialValues: {
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    age: 0,
    doctor: "",
  },
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [phone, phoneAttrs] = defineField("phone");
const [address, addressAttrs] = defineField("address");
const [age, ageAttrs] = defineField("age");
const [description, descriptionAttrs] = defineField("description");
const [doctor, doctorAttrs] = defineField("doctor");

const router = useRouter();

const onSubmit = handleSubmit.withControlled((values) => {
  // alert(JSON.stringify(values, null, 2));
  updatePatient(values, params.id as string)
    .then(() => {
      resetForm();
      router.push({ name: "DashboardPatientsList" });
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
  pacient.value = await getPatient(params.id as string);

  console.log(pacient.value);
  // setFieldValue("name", pacient.value?.name || "");
  // setFieldValue("email", pacient.value?.email || "");
  // setFieldValue("phone", pacient.value?.phone || "");
  // setFieldValue("address", pacient.value?.address || "");
  // setFieldValue("description", pacient.value?.description || "");
  setValues({
    name: pacient.value?.name || "",
    email: pacient.value?.email || "",
    phone: pacient.value?.phone || "",
    address: pacient.value?.address || "",
    // age: pacient.value?.age || 0,
    age: pacient.value?.age || 0,
    description: pacient.value?.description || "",
    doctor: pacient.value?.doctor_id?.toString() || "",
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
    <div class="flex justify-between px-3">
      <span></span>
      <h1 class="text-2xl">Editar paciente</h1>
      <router-link
        :to="{ name: 'DashboardPatientsList' }"
        class="p-2 bg-yellow-300 rounded-md text-slate-700 font-bold hover:bg-yellow-400 transition-colors"
      >
        Volver >>
      </router-link>
    </div>
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
      <label class="flex" for="address">
        <span class="w-36 pl-3 flex items-center"> Dirección </span>

        <input
          name="address"
          id="address"
          type="text"
          placeholder="Jr. tarma 4389 Alamos"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="address"
          v-bind="addressAttrs"
        />
      </label>
      <ErrorMessage name="address" />

      <label class="flex" for="age">
        <span class="w-36 pl-3 flex items-center"> Edad </span>

        <input
          name="age"
          id="age"
          type="number"
          placeholder="Jr. tarma 4389 Alamos"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="age"
          v-bind="ageAttrs"
        />
      </label>
      <ErrorMessage name="age" />

      <label class="flex" for="description">
        <span class="w-36 text-left text-wrap pl-3 flex items-center">
          Ingrese los sintomas
        </span>
        <textarea
          as="textarea"
          name="description"
          id="description"
          placeholder="Tengo Fiebre alta, con algunos espasmos"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg"
          v-model="description"
          v-bind="descriptionAttrs"
        />
      </label>
      <ErrorMessage name="description" />
      <label class="flex" for="doctor">
        <span class="w-36 text-left text-wrap pl-3 flex items-center">
          Asignar Doctor
        </span>
        <select
          name="doctor"
          id="doctor"
          :rules="validateRequired"
          class="w-full px-3 py-4 max-w-lg text-white"
          v-model="doctor"
          v-bind="doctorAttrs"
          placeholder="Seleccione un doctor"
        >
          <template v-for="doctor in doctors">
            <option :value="doctor.id">
              Dr. {{ doctor.name.toUpperCase() }}
              {{ doctor.last_name.toUpperCase() }}
            </option>
          </template>
          <!-- <option value="1">Dr. Juan Perez</option>
          <option value="2">Dr. Maria Rodriguez</option>
          <option value="3">Dr. Carlos Sanchez</option> -->
        </select>
      </label>
      <ErrorMessage name="doctor" />
      <button class="btn_add">Enviar Formulario</button>
    </form>
  </div>
</template>

<style scoped></style>
