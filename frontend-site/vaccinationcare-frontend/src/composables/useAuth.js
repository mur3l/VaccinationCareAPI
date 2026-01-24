import { ref } from 'vue'

const API = 'http://localhost:8080'

// Kasuta reactive objekti globaalseks staatuseks
const authState = ref({
  user: null,
  isAuthenticated: false
})

export function useAuth() {
  async function login(email, password) {
    console.log('Login attempt with:', { email, password })
    
    const res = await fetch(`${API}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        LoginEmail: email,
        LoginPassword: password
      })
    })

    console.log('Response status:', res.status)
    console.log('Response ok:', res.ok)
    
    const data = await res.json().catch((err) => {
      console.error('JSON parse error:', err)
      return {}
    })

    console.log('Response data:', data)

    if (!res.ok) {
      const error = new Error(data.error || 'Login failed')
      error.code = data.code
      error.status = res.status
      throw error
    }

    authState.value.user = data
    authState.value.isAuthenticated = true
    console.log('Auth state updated:', authState.value)
    return data
  }

  return { 
    user: authState.value.user,
    isAuthenticated: authState.value.isAuthenticated,
    login 
  }
}