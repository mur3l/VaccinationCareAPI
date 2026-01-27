import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../composables/useAuth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue"),
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
    meta: { requiresGuest: true },
  },

  {
    path: "/vaccines",
    name: "Vaccines",
    component: () => import("../views/VaccinesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/vaccines/new",
    name: "newVaccine",
    component: () => import("../views/AddVaccineView.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/vaccines/:id",
    name: "singleVaccine",
    component: () => import("../views/SingleVaccineView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/vaccines/:id/edit",
    name: "modifyVaccine",
    component: () => import("../views/ModifyVaccineView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },

  {
    path: "/appointments",
    name: "Appointments",
    component: () => import("../views/AppointmentsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/appointments/new",
    name: "AddAppointment",
    component: () => import("../views/AddAppointmentView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/appointments/:AppointmentID",
    name: "singleAppointment",
    component: () => import("../views/SingleAppointmentView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/appointments/:AppointmentID/edit",
    name: "modifyAppointment",
    component: () => import("../views/ModifyAppointmentView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { isAuthenticated, checkSession } = useAuth();

  await checkSession();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: "Login" };
  }

  if (to.meta.requiresGuest && isAuthenticated.value) {
    return { name: "Home" };
  }

  return true;
});

export default router;
