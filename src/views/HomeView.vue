<script setup lang="ts">
// import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { registerPatient } from "../config/Patient";

const onSubmit = (values: any, { resetForm }: any) => {
  console.log(values);
  console.log("enviado");
  registerPatient(values);
  resetForm();
};

const validateRequired = (value: any) => {
  if (!value) {
    return "Este campo es requerido";
  }
  return true;
};
</script>

<template>
  <div class="container_home">
    <div class="flex justify-center items-center w-full max-w-[1110px]">
      <h1
        class="py-4 font-bold absolute text-black title text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      >
        Formulario de consulta
      </h1>
      <img
        alt="Vue logo"
        class="back"
        src="https://res.cloudinary.com/react-romel/image/upload/v1713309360/portfolio/medical-app/medicos_y25upr.webp"
      />
    </div>
    <div class="content_form">
      <Form class="form_content" @submit="onSubmit">
        <label for="name"
          >Nombre

          <Field
            name="name"
            id="name"
            type="text"
            placeholder="Juan Gabriel"
            :rules="validateRequired"
          />
        </label>
        <ErrorMessage name="name" />
        <label for="email"
          >Email

          <Field
            name="email"
            id="email"
            type="text"
            placeholder="juan32@gmail.com"
            :rules="validateRequired"
          />
        </label>
        <ErrorMessage name="email" />
        <label for="phone"
          >Teléfono

          <Field
            name="phone"
            id="phone"
            type="text"
            placeholder="894321345"
            :rules="validateRequired"
          />
        </label>
        <ErrorMessage name="phone" />
        <label for="address"
          >Dirección

          <Field
            name="address"
            id="address"
            type="text"
            placeholder="Jr. tarma 4389 Alamos"
            :rules="validateRequired"
          />
        </label>
        <label class="" for="age">
          Eddad

          <Field
            name="age"
            id="age"
            type="number"
            placeholder="Jr. tarma 4389 Alamos"
            :rules="validateRequired"
          />
        </label>
        <ErrorMessage name="age" />
        <ErrorMessage name="address" />
        <label for="description">
          Ingrese los sintomas
          <Field
            as="textarea"
            name="description"
            id="description"
            placeholder="Tengo Fiebre alta, con algunos espasmos"
            class=""
            :rules="validateRequired"
          />
        </label>
        <ErrorMessage name="description" />
        <button class="btn_add">Enviar Formulario</button>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.container_home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.back {
  width: 100%;
  height: 220px;
  object-fit: cover;
  background-size: cover;
  background-position: top;
  max-width: 1300px;
}
.title {
  text-shadow: 2px 2px 4px #266de7;
}
.content_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: auto;
}
.form_content {
  width: 100%;
  min-height: 500px;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #266de7;
  padding: 20px 40px;
}

.form_content input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.form_content textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}
.form_content label {
  width: 100%;
  text-align: left;
  padding: 10px;
}

.btn_add {
  width: 100%;
  margin-top: 20px;
  padding: 10px 16px;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
}

.content_list {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
}

.video {
  margin: 10px;
  position: relative;
}

.video button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 16px;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
}
.video a {
  display: block;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  color: #000;
  background-color: #fff;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
}

span {
  display: block;
  text-align: center;
}

@media (max-width: 768px) {
  .content_list {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .form_content input {
    width: 100%;
  }
  .video {
    margin: 10px;
  }
  .video iframe {
    width: 100%;
    height: 200px;
  }
}
</style>
import { getParsedCommandLineOfConfigFile } from "typescript";
