<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const id = route.params.id;

const form = ref({
  Name: "",
  Description: "",
  Clinic: "",
  Appointment: "",
  Location: "",
  BestBefore: ""
});

const loading = ref(false);
const saving = ref(false);
const error = ref("");

async function load() {
  loading.value = true;
  error.value = "";

  try {
    const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
      credentials: "include"
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Load failed: ${res.status}`);

    form.value = {
      Name: data.Name || "",
      Description: data.Description || "",
      Clinic: data.Clinic || "",
      Appointment: data.Appointment || "",
      Location: data.Location || "",
      BestBefore: data.BestBefore || ""
    };
  } catch (e) {
    error.value = e.message || "Failed to load vaccine";
  } finally {
    loading.value = false;
  }
}

async function save() {
  saving.value = true;
  error.value = "";

  try {
    const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form.value)
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Save failed: ${res.status}`);

    // Nagu soovisid: tagasi listi
    router.push({ name: "Vaccines" });
  } catch (e) {
    error.value = e.message || "Save failed";
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div>
    <h2>Modify vaccine</h2>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>

    <form v-else @submit.prevent="save" class="form">
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

      <button type="submit" :disabled="saving">
        {{ saving ? "Saving..." : "Save" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.error { color:#b00020; margin: 12px 0; }
.form { max-width: 600px; margin: 0 auto; text-align: left; }
input { width:100%; padding:8px; margin: 6px 0 12px; }
button { padding: 8px 16px; }
</style>
