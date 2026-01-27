<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const saving = ref(false);
const error = ref("");

const form = ref({
  AppointmentID: "",
  ClientID: "",
  ClinicID: "",
  Date: "", // datetime-local
});

function toLocal(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function toIso(localValue) {
  return new Date(localValue).toISOString();
}

async function load() {
  loading.value = true;
  error.value = "";

  try {
    const id = route.params.AppointmentID;
    const res = await fetch(`http://localhost:8080/appointments/${id}`, {
      credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Load failed: ${res.status}`);

    form.value.AppointmentID = data.AppointmentID;
    form.value.ClientID = data.ClientID;
    form.value.ClinicID = data.ClinicID;
    form.value.Date = data.Date ? toLocal(data.Date) : "";
  } catch (e) {
    error.value = e.message || "Failed to load appointment";
  } finally {
    loading.value = false;
  }
}

async function save() {
  saving.value = true;
  error.value = "";

  try {
    const id = route.params.AppointmentID;

    const payload = {
      ClientID: form.value.ClientID,
      ClinicID: form.value.ClinicID,
      Date: toIso(form.value.Date),
    };

    const res = await fetch(`http://localhost:8080/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Save failed: ${res.status}`);

    router.push({ name: "Appointments" });
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
    <h2>Edit appointment</h2>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>

    <form v-else class="form" @submit.prevent="save">
      <label>ClientID</label>
      <input v-model="form.ClientID" readonly />

      <label>ClinicID</label>
      <input v-model="form.ClinicID" />

      <label>Date</label>
      <input type="datetime-local" v-model="form.Date" />

      <div class="buttons">
        <button class="btn-save" type="submit" :disabled="saving">
          {{ saving ? "Saving..." : "Save" }}
        </button>
        <button class="btn-cancel" type="button" @click="router.push({ name: 'Appointments' })">
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
