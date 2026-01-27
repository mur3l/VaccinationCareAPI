<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const error = ref("");
const item = ref(null);

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

    item.value = data;
  } catch (e) {
    error.value = e.message || "Failed to load appointment";
  } finally {
    loading.value = false;
  }
}

onMounted(load);

function goEdit() {
  router.push({ name: "modifyAppointment", params: { AppointmentID: route.params.AppointmentID } });
}
</script>

<template>
  <div>
    <h2>Appointment</h2>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>

    <div v-else-if="item" class="card">
      <p><b>AppointmentID:</b> {{ item.AppointmentID }}</p>
      <p><b>ClientID:</b> {{ item.ClientID }}</p>
      <p><b>ClinicID:</b> {{ item.ClinicID }}</p>
      <p><b>Date:</b> {{ item.Date }}</p>

      <div class="buttons">
        <button class="btn-save" @click="goEdit">Edit</button>
        <button class="btn-cancel" @click="router.push({ name: 'Appointments' })">Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error { color:#b00020; margin: 12px 0; }
.card { max-width: 900px; margin: 0 auto; padding: 16px; border:1px solid #eee; border-radius:10px; }
.buttons { display:flex; gap:10px; margin-top: 12px; }
.btn-save { background:#ffc107; color:#222; border:none; padding:10px 16px; border-radius:6px; font-weight:700; cursor:pointer; }
.btn-cancel { background:#6c757d; color:#fff; border:none; padding:10px 16px; border-radius:6px; font-weight:700; cursor:pointer; }
</style>
