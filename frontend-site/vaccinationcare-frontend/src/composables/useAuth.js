import { ref, computed } from "vue";

const API = "http://localhost:8080";

const authState = ref({
  user: null,
  isAuthenticated: false,
});

export function useAuth() {
  async function checkSession() {
    console.log("Checking session...");
    
    try {
      const res = await fetch(`${API}/sessions/me`, {
        method: "GET",
        credentials: "include",
      });

      console.log(`Session check: ${res.status} ${res.statusText}`);

      if (!res.ok) {
        console.log("User not logged in or session expired");
        authState.value.isAuthenticated = false;
        authState.value.user = null;
        return false;
      }

      const data = await res.json().catch(() => ({}));
      console.log("User is logged in:", data);

      authState.value.user = data.user ?? data ?? null;
      authState.value.isAuthenticated = true;

      return true;
    } catch (e) {
      console.error("Session check failed:", e);
      authState.value.isAuthenticated = false;
      authState.value.user = null;
      return false;
    }
  }

  async function login(email, password) {
    console.log("Login process started");
    
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
      console.error("Login failed:", data);
      const err = new Error(data.error || "Login failed");
      err.status = res.status;
      throw err;
    }

    console.log("Login successful:", data);
    
    authState.value.user = data.user ?? { EmailAddress: email };
    authState.value.isAuthenticated = true;

    return data;
  }

  async function logout() {
    console.log("Logout function started");
    
    try {
      console.log("Sending DELETE request to /sessions endpoint");
      
      const response = await fetch(`${API}/sessions`, {
        method: "DELETE",
        credentials: "include",
      });
      
      console.log(`Server response: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        console.warn(`Server response was ${response.status}`);
      }
      
    } catch (e) {
      console.error("Logout request failed:", e);
    }

    console.log("Clearing local authentication data");
    authState.value.user = null;
    authState.value.isAuthenticated = false;
    
    return true;
  }

  return {
    user: computed(() => authState.value.user),
    isAuthenticated: computed(() => authState.value.isAuthenticated),
    login,
    logout,
    checkSession,
  };
}