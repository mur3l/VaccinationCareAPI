<template>
  <div id="app">
    <!-- Navigation -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vaccines">Vaccines</router-link> |

      <!-- Ainult sisselogitud kasutajale -->
      <template v-if="isAuthenticated">
        <router-link to="/appointments">Appointments</router-link> |
        <button @click="logout" style="float:right;">Log Out</button>
      </template>

      <!-- Ainult välja logitud kasutajale -->
      <template v-else>
        <router-link to="/login">Log In</router-link> |
        <router-link to="/signup">Register</router-link>
      </template>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { logout: authLogout, isAuthenticated, checkSession } = useAuth()

onMounted(() => {
  checkSession()
})

async function logout() {
  await authLogout()
  router.push('/login')
}
</script>
