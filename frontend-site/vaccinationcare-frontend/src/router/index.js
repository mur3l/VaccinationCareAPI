import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import VaccinesView from '../views/VaccinesView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RegisterView from '../views/RegisterView.vue'

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
  }
]

// Loo router eksemplar
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard - kontrolli autentimist
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('token') !== null

  if (requiresAuth && !isAuthenticated) {
    // Kui leht nõuab autentimist ja kasutaja pole sisse loginud
    next('/login')
  } else if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    // Kui kasutaja on juba sisse loginud, ära lase login/signup lehele
    next('/vaccines')
  } else {
    next()
  }
})

export default router