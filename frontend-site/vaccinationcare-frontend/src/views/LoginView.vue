<!-- LoginView.vue -->
<template>
  <div class="login-container">
    <h2>Login</h2>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label>Email</label>
        <input
          v-model.trim="email"
          type="email"
          placeholder="admin@example.com"
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
          :disabled="loading"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  
  if (!email.value || !password.value) {
    error.value = 'Please fill in both email and password.'
    return
  }

  loading.value = true

  try {
    await login(email.value, password.value)
    
    await router.push('/vaccines')
    
  } catch (err) {
    console.error('Login error details:', err)
    
    const msg = err.message?.toLowerCase() || ''
    const status = err.status

    if (status === 401) {
      error.value = 'Invalid email or password'
    } else if (status === 404) {
      error.value = 'User not found'
    } else if (msg.includes('network') || msg.includes('fetch')) {
      error.value = 'Network error. Please check your connection.'
    } else {
      error.value = err.message || 'Login failed'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
</style>