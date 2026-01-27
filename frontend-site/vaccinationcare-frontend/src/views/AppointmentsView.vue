<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([]);
const loading = ref(false);
const error = ref("");

async function loadAppointments() {
  loading.value = true;
  error.value = "";

  try {
    const res = await fetch("http://localhost:8080/appointments", {
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Failed to load: ${res.status}`);
    }

    items.value = await res.json();
  } catch (e) {
    error.value = e.message || "Failed to load appointments";
    items.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadAppointments);

function goAdd() {
  router.push({ name: "AddAppointment" });
}
</script>

<template>
  <div>
    <div class="header">
      <h2>Appointments</h2>
      <button class="btn-add" @click="goAdd">Add</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>

    <table v-else class="tbl">
      <thead>
        <tr>
          <th>AppointmentID</th>
          <th>ClientID</th>
          <th>ClinicID</th>
          <th>Date</th>
          <th>VaccineID</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="items.length === 0">
          <td colspan="5">No appointments</td>
        </tr>

        <tr v-for="a in items" :key="a.AppointmentID">
          <td>{{ a.AppointmentID }}</td>
          <td>{{ a.ClientID }}</td>
          <td>{{ a.ClinicID }}</td>
          <td>{{ a.Date }}</td>
          <td>{{ a.VaccineID ?? "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-add {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-add:hover {
  background-color: #c82333;
}

.error { color: #b00020; margin: 12px 0; }
.tbl { width: 100%; border-collapse: collapse; margin-top: 12px; }
.tbl th, .tbl td { border-bottom: 1px solid #ddd; padding: 10px; text-align: left; }
.tbl th { background: #f8f9fa; }
</style>
