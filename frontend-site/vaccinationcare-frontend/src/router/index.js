import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import VaccinesView from '../views/VaccinesView.vue'
import ModifyVaccineView from '../views/ModifyVaccineView.vue'
import SingleVaccineView from '../views/SingleVaccineView.vue'
import AddVaccineView from '../views/AddVaccineView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SignUpView from '../views/RegisterView.vue'
import AddAppointmentView from '../views/AddAppointmentView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false } 
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView,
    meta: { requiresAuth: false }
  },
  {
    path: '/vaccines',
    name: 'Vaccines',
    component: VaccinesView,
    meta: { requiresAuth: true } 
  },
  {
  path: '/vaccines/new',
  name: 'addVaccine',
  component: AddVaccineView,
  meta: { requiresAuth: true }
},
{
  path: '/vaccines/:id',
  name: 'singleVaccine',
  component: SingleVaccineView,
  meta: { requiresAuth: true }
},
{
  path: '/vaccines/:id/edit',
  name: 'modifyVaccine',
  component: ModifyVaccineView,
  meta: { requiresAuth: true }
},
{
  path: '/appointments/new',
  name: 'addAppointment',
  component: AddAppointmentView,
  meta: { requiresAuth: true }
},
]

// Loo router eksemplar
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard - kontrolli autentimist
const API = 'http://localhost:8080'

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)

  let isAuthenticated = false
  try {
    const res = await fetch(`${API}/sessions/me`, {
      method: 'GET',
      credentials: 'include'
    })
    isAuthenticated = res.ok
  } catch (e) {
    isAuthenticated = false
  }

  if (requiresAuth && !isAuthenticated) return next('/login')
  if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) return next('/vaccines')
  return next()
})

export default router