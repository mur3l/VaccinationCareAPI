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
  BestBefore: "", // YYYY-MM-DD
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
      body: JSON.stringify(form.value),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Create failed: ${res.status}`);

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

    <form class="form" @submit.prevent="submit">
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

      <div class="buttons">
        <button class="btn-save" type="submit" :disabled="loading">
          {{ loading ? "Saving..." : "Save" }}
        </button>
        <button class="btn-cancel" type="button" @click="router.push({ name: 'Vaccines' })">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.error { color:#b00020; margin: 12px 0; }
.form { max-width: 900px; margin: 0 auto; text-align:left; }
input { width:100%; padding:10px; margin: 6px 0 14px; border:1px solid #ddd; border-radius:8px; }
.buttons { display:flex; gap:10px; }
.btn-save { background:#0d6efd; color:#fff; border:none; padding:10px 16px; border-radius:6px; font-weight:700; cursor:pointer; }
.btn-cancel { background:#6c757d; color:#fff; border:none; padding:10px 16px; border-radius:6px; font-weight:700; cursor:pointer; }
</style>
