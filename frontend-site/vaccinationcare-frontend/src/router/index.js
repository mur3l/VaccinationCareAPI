import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import("../views/AboutView.vue")
  },
  {
    path: "/vaccines",
    name: "vaccines",
    component: () => import("../views/VaccinesView.vue")
  },
  {
    path: '/vaccinetions/:itemID',
    name: 'vaccine',
    component: () => import('../views/SingelVaccineView.vue'),
    props: route => {return {seekID: String(route.params.VaccineID)}}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
