<script>
export default {
  name: "RegisterView",
  data() {
    return {
      NewUser: {
        FullName: "",
        EmailAddress: "",
        PlainPassword: "",
        DisplayName: "",
        PlainPhoneNumber2FA: ""
      },
      successMessage: "",
      errorMessage: "",
      submitting: false
    };
  },
  methods: {
    async signUp() {
      this.successMessage = "";
      this.errorMessage = "";
      this.submitting = true;

      const payload = {
        FullName: this.NewUser.FullName,
        EmailAddress: this.NewUser.EmailAddress,
        PasswordHASH: this.NewUser.PlainPassword,
        PhoneNumber2FA: this.NewUser.PlainPhoneNumber2FA
      };

      try {
        const res = await fetch("http://localhost:8080/client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          this.errorMessage = data.error || `Registration failed (HTTP ${res.status})`;
          return;
        }

        this.successMessage = "You've registered successfully!";
        this.NewUser = {
          FullName: "",
          EmailAddress: "",
          PlainPassword: "",
          DisplayName: "",
          PlainPhoneNumber2FA: ""
        };

        // Soovi korral suuna loginisse:
        // this.$router.push("/login");
      } catch (_e) {
        this.errorMessage = "Failed to fetch (backend down or CORS).";
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>

<template>
  <div class="card">
    <h1>Register</h1>

    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <form @submit.prevent="signUp">
      <div class="form-group">
        <label>Full name</label>
        <input v-model="NewUser.FullName" type="text" placeholder="Your full name" required />
      </div>

      <div class="form-group">
        <label>Email address</label>
        <input v-model="NewUser.EmailAddress" type="email" placeholder="E-mail address" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="NewUser.PlainPassword" type="password" placeholder="Password" required />
      </div>

      <div class="form-group">
        <label>Username</label>
        <input v-model="NewUser.DisplayName" type="text" placeholder="Username (optional)" />
      </div>

      <div class="form-group">
        <label>Phone number (2FA)</label>
        <input v-model="NewUser.PlainPhoneNumber2FA" type="text" placeholder="Optional" />
      </div>

      <button class="primary-button" type="submit" :disabled="submitting">
        {{ submitting ? "Registering..." : "Register" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
  /* src/assets/forms.css */
.page-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.card {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.card h1 {
  margin-top: 0;
  margin-bottom: 1.25rem;
  text-align: center;
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
  box-sizing: border-box;
}

.primary-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button:disabled {
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

.table-card {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.table-header h1 {
  margin: 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.table th {
  font-weight: 700;
  background: #fafafa;
}
</style>