// src/composables/useAuth.js
import { ref, computed } from 'vue'

const user = ref(null)
const loadingAuth = ref(false)

const isLoggedIn = computed(() => !!user.value)

// ⭐ OLULINE: Kuidas teie backend admini tuvastab?
// Kontrollige, mis välja SessionsController tagastab!
const isAdmin = computed(() => {
  if (!user.value) return false
  // PROOVIGE ERINEVAID:
  return user.value.role === 'admin' || 
         user.value.Role === 'ADMIN' || 
         user.value.isAdmin === true ||
         (user.value.roles && user.value.roles.includes('admin'))
})

const API = 'http://localhost:8080'

async function fetchMe() {
  loadingAuth.value = true
  try {
    const res = await fetch(`${API}/sessions/me`, { 
      credentials: 'include' 
    })
    if (!res.ok) {
      user.value = null
      return
    }
    user.value = await res.json()
    console.log('User data:', user.value) // 👈 Debug jaoks!
  } catch (error) {
    user.value = null
  } finally {
    loadingAuth.value = false
  }
}

async function login(email, password) {
  loadingAuth.value = true
  try {
    const res = await fetch(`${API}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        LoginEmail: email, 
        Password: password 
      })
    })
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.message || 'Login failed')
    }
    
    user.value = await res.json()
    return user.value
  } catch (error) {
    throw error
  } finally {
    loadingAuth.value = false
  }
}

async function logout() {
  try {
    await fetch(`${API}/auth/logout`, { 
      method: 'GET',
      credentials: 'include' 
    })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    user.value = null
  }
}

export function useAuth() {
  return { 
    user, 
    isLoggedIn, 
    isAdmin, 
    loadingAuth, 
    fetchMe, 
    login, 
    logout 
  }
}