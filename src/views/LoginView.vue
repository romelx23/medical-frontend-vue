<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
// import { login, logout } from '../config/Patient';
// import { useAuth } from "../composables/useAuth";
import { authStore } from "../store/authStore";
// import { storeToRefs } from "pinia";

const authContext = authStore();
// const { user } = storeToRefs(authContext)

// const { login, logout, user } = useAuth();

const onSubmit = (values: any, { resetForm }: any) => {
  console.log("Form submitted");
  authContext.login(values);
  resetForm();
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <nav class="flex justify-between py-3 px-5 items-center">
      <router-link to="/" class="text-slate-300 hover:underline"
        >Home</router-link
      >
      <div class="flex gap-3 items-center">
        <router-link
          to="/login"
          class="text-slate-300 hover:underline"
          v-if="!authContext.user"
          >Login</router-link
        >
        <button
          v-if="authContext.user"
          @click="authContext.logout"
          class="text-slate -300 hover:underline"
        >
          Logout
        </button>

        <router-link
          v-if="authContext.user"
          to="/dashboard"
          class="text-slate-300 hover:underline"
          >Dashboard</router-link
        >
      </div>
    </nav>
    <div class="flex justify-center items-center min-h-[70vh]">
      <Form
        class="max-w-lg mx-auto bg-blue-950 rounded-xl p-5 w-full min-w-40 xl:min-w-96"
        @submit="onSubmit"
      >
        <h1 class="text-3xl text-white">Login</h1>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <Field
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
            name="email"
          />
          <ErrorMessage name="email" />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <Field
            type="password"
            id="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            name="password"
          />
          <ErrorMessage name="password" />
        </div>
        <!-- <div class="mb-5">
          <label
            for="repeat-password"
            class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >Repeat password</label
          >
          <input
            type="password"
            id="repeat-password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div> -->
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <Field
              id="terms"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
              name="terms"
            />
            <ErrorMessage name="terms" />
          </div>
          <label
            for="terms"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >I agree with the
            <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"
              >terms and conditions</a
            ></label
          >
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
