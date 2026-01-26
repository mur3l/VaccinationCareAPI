import { ref, computed } from 'vue'

const API = 'http://localhost:8080'

const authState = ref({
  user: null,
  isAuthenticated: false
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

      authState.value.user = data.user || { email }
      authState.value.isAuthenticated = true

      console.log('Auth state updated:', authState.value)
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async function checkSession() {
    try {
      const res = await fetch(`${API}/sessions/me`, {
        method: 'GET',
        credentials: 'include'
      })

      if (!res.ok) throw new Error('No session')

      const data = await res.json().catch(() => ({}))

      authState.value.user = data.user || null
      authState.value.isAuthenticated = true
      return true
    } catch (e) {
      authState.value.user = null
      authState.value.isAuthenticated = false
      return false
    }
  }

  async function logout() {
    try {
      await fetch(`${API}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      })
    } catch (e) {
      console.warn('Logout request failed:', e)
    }

    authState.value.user = null
    authState.value.isAuthenticated = false
  }

  function getAuthHeaders() {
    return {}
  }

  return {
    user: computed(() => authState.value.user),
    isAuthenticated: computed(() => authState.value.isAuthenticated),
    login,
    logout,
    checkSession,
    getAuthHeaders
  }
}
