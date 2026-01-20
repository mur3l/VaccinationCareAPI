import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import VaccinesView from "../views/VaccinesView.vue";
import SingleVaccineView from "../views/SingleVaccineView.vue";
import ModifyVaccineView from "../views/ModifyVaccineView.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  
  { path: "/about", name: "about", component: AboutView },

  { path: "/vaccines", name: "vaccines", component: VaccinesView },

  {
    path: "/vaccines/:id",
    name: "singleVaccine",
    component: SingleVaccineView,
  },

  {
    path: "/vaccines/:id/edit",
    name: "modifyVaccine",
    component: ModifyVaccineView,
  },

  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/RegisterView.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
