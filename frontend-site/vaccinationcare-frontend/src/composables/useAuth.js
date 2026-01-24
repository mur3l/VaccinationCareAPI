import { ref } from 'vue'

const API = 'http://localhost:8080'

const authState = ref({
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('token') || null
})

export function useAuth() {
  async function login(email, password) {
    console.log('Login attempt with:', { email, password })
    
    try {
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

      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user || { email }))
        authState.value.token = data.token
      }
      
      authState.value.user = data.user || { email }
      authState.value.isAuthenticated = true
      
      console.log('Auth state updated:', authState.value)
      return data
      
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    authState.value.user = null
    authState.value.isAuthenticated = false
    authState.value.token = null
  }

  function getAuthHeaders() {
    const token = authState.value.token || localStorage.getItem('token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }

  return { 
    user: authState.value.user,
    isAuthenticated: authState.value.isAuthenticated,
    token: authState.value.token,
    login,
    logout,
    getAuthHeaders
  }
}