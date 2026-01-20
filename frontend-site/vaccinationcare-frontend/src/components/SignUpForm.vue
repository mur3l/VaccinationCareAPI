<script>
export default {
  name: "SignUpForm",
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
      errorMessage: ""
    }
  },
  methods: {
    async signUp() {
      this.successMessage = ""
      this.errorMessage = ""

      const payload = {
        FullName: this.NewUser.FullName,
        EmailAddress: this.NewUser.EmailAddress,
        PasswordHASH: this.NewUser.PlainPassword,
        PhoneNumber2FA: this.NewUser.PlainPhoneNumber2FA
      }

      try {
        const res = await fetch("http://localhost:8080/client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Registration failed")
        }

        this.successMessage = "You've registered successfully!"
        this.NewUser = {
          FullName: "",
          EmailAddress: "",
          PlainPassword: "",
          DisplayName: "",
          PlainPhoneNumber2FA: ""
        }
      } catch (err) {
        this.errorMessage = err.message
      }
    }
  }
}
</script>


<template>
    <h1>Enter your credentials:</h1>
    <form @submit.prevent="signUp">
  <div>
    <label>Full name</label>
    <input
      v-model="NewUser.FullName"
      type="text"
      placeholder="Your full name"
      required
    />
  </div>

  <div>
    <label>Email address</label>
    <input
      v-model="NewUser.EmailAddress"
      type="email"
      placeholder="E-mail address"
      required
    />
  </div>

  <div>
    <label>Password</label>
    <input
      v-model="NewUser.PlainPassword"
      type="password"
      placeholder="Password"
      required
    />
  </div>

  <div>
    <label>Username</label>
    <input
      v-model="NewUser.DisplayName"
      type="text"
      placeholder="Username"
    />
  </div>

  <div>
    <label>Phone number (2FA)</label>
    <input
      v-model="NewUser.PlainPhoneNumber2FA"
      type="text"
      placeholder="Optional"
    />
  </div>

  <button type="submit">Register</button>
</form>
</template>