<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const error = ref("");
const item = ref(null);

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString();
}

async function load() {
  const id = route.params.id;
  if (!id) {
    error.value = "Missing vaccine id.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Failed to load (HTTP ${res.status})`);
    }

    const data = await res.json();
    item.value = data;
  } catch (e) {
    error.value = e.message || "Failed to load vaccine";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<template>
  <div>
    <h2>Vaccine</h2>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>

    <div v-else-if="item" class="card">
      <table class="details">
      <tbody>
      <tr><td>ID</td><td>{{ item.VaccineID }}</td></tr>
      <tr><td>Name</td><td>{{ item.Name }}</td></tr>
      <tr><td>Clinic</td><td>{{ item.Clinic }}</td></tr>
      <tr><td>Appointment</td><td>{{ formatDate(item.Appointment) }}</td></tr>
      <tr><td>BestBefore</td><td>{{ item.BestBefore }}</td></tr>
      <tr><td>Description</td><td>{{ item.Description }}</td></tr>
    </tbody>
</table>


      <div class="actions">
        <button class="btn btn-edit" type="button" @click="router.push({ name: 'modifyVaccine', params: { id: item.VaccineID } })">
          Edit
        </button>
        <button class="btn btn-back" type="button" @click="router.push('/vaccines')">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error { color: #b00020; margin: 12px 0; }
.card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
}
.details {
  width: 100%;
  border-collapse: collapse;
}
.details td {
  border-bottom: 1px solid #f1f3f5;
  padding: 10px 8px;
}
.details td:first-child {
  font-weight: 700;
  width: 220px;
}
.actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
}
.btn {
  border: 0;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: 700;
}
.btn-edit { background: #ffc107; color: #212529; }
.btn-back { background: #6c757d; color: #fff; }
</style>
