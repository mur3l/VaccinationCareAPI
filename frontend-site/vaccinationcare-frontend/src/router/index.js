// router/index.js - Ensure proper route protection
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/vaccines',
    name: 'Vaccines',
    component: () => import('../views/VaccinesView.vue'),
    meta: { requiresAuth: true } // THIS IS CRITICAL
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: () => import('../views/AppointmentsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupView.vue'),
    meta: { requiresGuest: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// GLOBAL ROUTE GUARD - This prevents access to protected routes
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, checkSession } = useAuth()
  
  // Always check session first
  await checkSession()
  
  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    console.log('Route requires auth, redirecting to login')
    next('/login')
    return
  }
  
  // If route is for guests only and user is authenticated
  if (to.meta.requiresGuest && isAuthenticated.value) {
    console.log('User is already logged in, redirecting to home')
    next('/')
    return
  }
  
  next()
})

export default router