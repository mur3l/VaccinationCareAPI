<template>
  <div id="app">
    <!-- Navigation ALATI nähtav -->
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vaccines">Vaccines</router-link> |
      
      <!-- Kui välja logitud - näita Log In ja Register linke -->
      <template v-if="!isAuthenticated">
        <router-link to="/login">Log In</router-link> |
        <router-link to="/signup">Register</router-link>
      </template>
      
      <!-- Kui sisse logitud - näita Logout nuppu -->
      <template v-else>
        <button @click="logout" style="float: right;">Logout</button>
      </template>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const route = useRoute()
const { logout: authLogout } = useAuth()

const isLoginPage = computed(() => route.path === '/login')

function logout() {
  authLogout()
  router.push('/login')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #c82333;
}
</style>