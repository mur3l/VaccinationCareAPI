<!-- src/views/SignupView.vue - TÄIS KOMPONENT -->
<template>
  <div class="signup-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>Full Name:</label>
        <input v-model="form.fullName" required placeholder="Enter your full name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input v-model="form.email" type="email" required placeholder="Enter your email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input v-model="form.password" type="password" required placeholder="Enter password" />
      </div>
      <button type="submit" class="submit-btn">Register</button>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  fullName: '',
  email: '',
  password: ''
})

async function register() {
  try {
    console.log('Registering user:', form.value.email)
    
    const response = await fetch('http://localhost:8080/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        FullName: form.value.fullName,
        EmailAddress: form.value.email,
        PasswordHASH: form.value.password // Server should hash this
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('Registration successful:', data)
      alert('Registration successful! Please login.')
      router.push('/login')
    } else {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }))
      console.error('Registration failed:', error)
      alert('Registration failed: ' + (error.error || 'Please try again'))
    }
  } catch (e) {
    console.error('Registration error:', e)
    alert('Registration error: ' + e.message)
  }
}
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #45a049;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>