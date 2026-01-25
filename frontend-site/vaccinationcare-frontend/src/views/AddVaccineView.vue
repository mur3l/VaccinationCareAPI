<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  Name: "",
  Description: "",
  Clinic: "",
  Appointment: "",
  Location: "",
  BestBefore: ""
});

const error = ref("");
const loading = ref(false);

async function submit() {
  error.value = "";
  loading.value = true;

  try {
    const res = await fetch("http://localhost:8080/vaccination", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form.value)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || `Create failed: ${res.status}`);
    }

    // tagasi listi
    router.push({ name: "Vaccines" });
  } catch (e) {
    error.value = e.message || "Create failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <h2>Add vaccine</h2>

    <div v-if="error" class="error">{{ error }}</div>

    <form @submit.prevent="submit" style="max-width:600px; margin: 0 auto; text-align:left;">
      <label>Name</label>
      <input v-model="form.Name" />

      <label>Description</label>
      <input v-model="form.Description" />

      <label>Clinic</label>
      <input v-model="form.Clinic" />

      <label>Appointment</label>
      <input v-model="form.Appointment" />

      <label>Location</label>
      <input v-model="form.Location" />

      <label>BestBefore</label>
      <input v-model="form.BestBefore" placeholder="YYYY-MM-DD" />

      <button type="submit" :disabled="loading">
        {{ loading ? "Saving..." : "Save" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.error { color:#b00020; margin: 12px 0; }
input { width:100%; padding:8px; margin: 6px 0 12px; }
button { padding: 8px 16px; }
</style>
