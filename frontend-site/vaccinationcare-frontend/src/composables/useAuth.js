import { ref, computed } from "vue";

const API = "http://localhost:8080";

const authState = ref({
  user: null,
  isAuthenticated: false,
});

export function useAuth() {
  async function checkSession() {
    try {
      const res = await fetch(`${API}/sessions/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        authState.value.isAuthenticated = false;
        authState.value.user = null;
        return false;
      }

      const data = await res.json().catch(() => ({}));

      authState.value.user = data.user ?? data ?? null;
      authState.value.isAuthenticated = true;

      return true;
    } catch (e) {
      authState.value.isAuthenticated = false;
      authState.value.user = null;
      return false;
    }
  }

  async function login(email, password) {
    const res = await fetch(`${API}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        LoginEmail: email,
        LoginPassword: password,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const err = new Error(data.error || "Login failed");
      err.status = res.status;
      throw err;
    }

    authState.value.user = data.user ?? { EmailAddress: email };
    authState.value.isAuthenticated = true;

    return data;
  }

  async function logout() {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (e) {
      console.warn("Logout request failed:", e);
    }

    authState.value.user = null;
    authState.value.isAuthenticated = false;
  }

  return {
    user: computed(() => authState.value.user),
    isAuthenticated: computed(() => authState.value.isAuthenticated),
    login,
    logout,
    checkSession,
  };
}
