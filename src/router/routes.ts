import { RouteRecordRaw } from "vue-router";
// import { useAuth } from "../composables/useAuth";
import DashboardViewVue from "../views/dashboard/DashboardView.vue";
import DetailViewVue from "../views/DetailView.vue";
import HomeViewVue from "../views/HomeView.vue";
import LoginViewVue from "../views/LoginView.vue";
import { isAuthenticated, isLogged } from "./auth-guard";
import NotFoundViewVue from "../views/NotFoundView.vue";
import { isRoleAdmin, isRoleAdminOrDoctor } from "./role-guard";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "HomeViewVue", component: HomeViewVue },
  {
    path: "/lista-pacientes",
    name: "ListPatientVue",
    component: DetailViewVue,
  },
  {
    path: "/login",
    name: "LoginVue",
    component: LoginViewVue,
    beforeEnter: [isLogged],
  },
  {
    path: "/dashboard",
    name: "DashboardViewVue",
    component: DashboardViewVue,
    // beforeEnter: (to, from, next) => {
    //   const { user } = useAuth();
    //   console.log(user.value);
    //   const isLoggedIn = user.value !== null;
    //   console.log({ isLoggedIn });
    //   if (!isLoggedIn) {
    //     next("/login");
    //   } else {
    //     next();
    //   }
    // },
    meta: { transition: "slide-right" },
    beforeEnter: [isAuthenticated],
    children: [
      {
        path: "",
        name: "DashboardHome",
        component: () => import("../views/dashboard/DashboardHome.vue"),
      },
      {
        path: "pacientes",
        name: "DashboardPatients",
        beforeEnter: [isRoleAdminOrDoctor],
        component: () => import("../views/dashboard/DashboardPatients.vue"),
        children: [
          {
            path: "list",
            name: "DashboardPatientsList",
            component: () =>
              import("../views/dashboard/DashboardPatientsList.vue"),
          },
          {
            path: ":id",
            name: "DashboardPatient",
            component: () => import("../views/dashboard/DashboardPatient.vue"),
          },
          {
            path: ":id/editar",
            name: "DashboardPatientEdit",
            component: () =>
              import("../views/dashboard/DashboardPatientEdit.vue"),
          },
          {
            path: "novo",
            name: "DashboardPatientNew",
            component: () =>
              import("../views/dashboard/DashboardPatientNew.vue"),
          },
          {
            path: "/",
            redirect: { name: "DashboardPatientsList" },
            // name: "DashboardPatientsList",
          },
        ],
      },
      // {
      //   path: "pacientes/:id",
      //   name: "DashboardPatient",
      //   component: () => import("../views/dashboard/DashboardPatient.vue"),
      // },
      // {
      //   path: "pacientes/:id/editar",
      //   name: "DashboardPatientEdit",
      //   component: () => import("../views/dashboard/DashboardPatientEdit.vue"),
      // },
      // {
      //   path: "pacientes/novo",
      //   name: "DashboardPatientNew",
      //   component: () => import("../views/dashboard/DashboardPatientNew.vue"),
      // },
      {
        path: "doctores",
        name: "DashboardDoctors",
        component: () => import("../views/dashboard/DashboardDoctors.vue"),
        beforeEnter: [isRoleAdmin],
        children: [
          {
            path: "list",
            name: "DashboardDoctorsList",
            component: () =>
              import("../views/dashboard/DashboardDoctorsList.vue"),
          },
          // {
          //   path: ":id",
          //   name: "DashboardDoctor",
          //   component: () => import("../views/dashboard/DashboardDoctor.vue"),
          // },
          {
            path: ":id/editar",
            name: "DashboardDoctorEdit",
            component: () =>
              import("../views/dashboard/DashboardDoctorEdit.vue"),
          },
          // {
          //   path: "novo",
          //   name: "DashboardDoctorNew",
          //   component: () =>
          //     import("../views/dashboard/DashboardDoctorNew.vue"),
          // },
          {
            path: "/",
            redirect: { name: "DashboardDoctorsList" },
          },
        ],
      },
      // {
      //   path: "doctores/:id/editar",
      //   name: "DashboardDoctorEdit",
      //   component: () => import("../views/dashboard/DashboardDoctorEdit.vue"),
      // },
      {
        path: "usuarios",
        name: "DashboardUsers",
        component: () => import("../views/dashboard/DashboardUsers.vue"),
        beforeEnter: [isRoleAdmin],
        children: [
          {
            path: "list",
            name: "DashboardUsersList",
            component: () =>
              import("../views/dashboard/DashboardUsersList.vue"),
          },
          {
            path: ":id/editar",
            name: "DashboardUserEdit",
            component: () => import("../views/dashboard/DashboardUserEdit.vue"),
          },
          {
            path: "/",
            redirect: { name: "DashboardUsersList" },
          },
        ],
      },
      // {
      //   path: "usuarios/:id/editar",
      //   name: "DashboardUserEdit",
      //   component: () => import("../views/dashboard/DashboardUserEdit.vue"),
      // },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: NotFoundViewVue,
  },
];
