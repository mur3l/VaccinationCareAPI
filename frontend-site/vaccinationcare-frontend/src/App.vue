<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |

      <template v-if="isAuthenticated">
        <router-link to="/vaccines">Vaccines</router-link> |
        <router-link to="/appointments">Appointments</router-link> |
        <button @click="logout" class="logout-btn">Log Out</button>
      </template>

      <template v-else>
        <router-link to="/login">Log In</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { logout: authLogout, isAuthenticated, checkSession } = useAuth()

onMounted(async () => {
  console.log("App.vue mounted")
  await checkSession()
})

watch(() => router.currentRoute.value, async () => {
  await checkSession()
})

async function logout() {
  console.log("User clicked Logout button")

  try {
    await authLogout()
    console.log("Logout successful")

    window.location.href = '/login'

  } catch (error) {
    console.error('Logout error:', error)
    window.location.href = '/login'
  }
}
</script>

<style>
.logout-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

nav {
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  color: #0056b3;
  font-weight: bold;
}
</style>
