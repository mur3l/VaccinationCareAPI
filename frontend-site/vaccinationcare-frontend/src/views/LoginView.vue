<template>
  <div class="login-container">
    <h2>Login</h2>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="message" class="success-message">{{ message }}</div>
    
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          id="email" 
          v-model="form.email" 
          type="email" 
          required
          :disabled="loading"
          placeholder="admin@example.com"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          id="password" 
          v-model="form.password" 
          type="password" 
          required
          :disabled="loading"
          placeholder="••••••••"
        />
      </div>
      
      <button 
        type="submit" 
        :disabled="loading"
        class="login-button"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const message = ref('')

async function handleLogin() {
  if (!form.email || !form.password) {
    error.value = 'Please fill in all fields'
    return
  }
  
  loading.value = true
  error.value = ''
  message.value = ''
  
  try {
    await login(form.email, form.password)
    message.value = 'Login successful! Redirecting...'
    
    // Oota natuke ja siis suuna edasi
    setTimeout(() => {
      router.push('/vaccines')
    }, 1000)
    
  } catch (err) {
    error.value = err.message || 'Login failed. Please check your credentials.'
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

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f8d7da;
  border-radius: 4px;
}

.success-message {
  color: #28a745;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #d4edda;
  border-radius: 4px;
}
</style>