<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const saving = ref(false);
const error = ref("");
const success = ref("");

const form = ref({
  Name: "",
  Clinic: "",
  Appointment: "",
  BestBefore: "",
  Description: "",
  Location: "",
});

function toIsoLocal(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function load() {
  const id = route.params.id;
  if (!id) {
    error.value = "Missing vaccine id.";
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Failed to load (HTTP ${res.status})`);
    }

    const data = await res.json();

    form.value = {
      Name: data.Name ?? "",
      Clinic: data.Clinic ?? "",
      Appointment: toIsoLocal(data.Appointment),
      BestBefore: data.BestBefore ?? 0,
      Description: data.Description ?? "",
      Location: data.Location ?? "N/A",
    };
  } catch (e) {
    error.value = e.message || "Failed to load vaccine";
  } finally {
    loading.value = false;
  }
}

async function save() {
  const id = route.params.id;
  if (!id) return;

  saving.value = true;
  error.value = "";
  success.value = "";

  try {
    const payload = {
      Name: form.value.Name,
      Description: form.value.Description,
      Clinic: form.value.Clinic,
      Appointment: form.value.Appointment ? new Date(form.value.Appointment).toISOString() : null,
      Location: form.value.Location,
      BestBefore: form.value.BestBefore ? new Date(form.value.BestBefore).toISOString() : null,
    };

    for (const k of ["Name", "Description", "Clinic", "Appointment", "Location", "BestBefore"]) {
      if (payload[k] === null || payload[k] === "" || payload[k] === undefined) {
        throw new Error(`Missing required field: ${k}`);
      }
    }

    const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Save failed (HTTP ${res.status})`);
    }

    success.value = "Saved.";
    router.push({ name: "singleVaccine", params: { id } });
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
    <h2>Edit vaccine</h2>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>

    <div v-if="loading">Loading...</div>

    <form v-else class="card" @submit.prevent="save">
      <div class="row">
        <label>Name</label>
        <input v-model.trim="form.Name" required />
      </div>

      <div class="row">
        <label>Description</label>
        <input v-model.trim="form.Description" required />
      </div>

      <div class="row">
        <label>Clinic</label>
        <input v-model="form.Clinic" required />
      </div>

      <div class="row">
        <label>Appointment</label>
        <input type="datetime-local" v-model="form.Appointment" required />
      </div>

      <div class="row">
        <label>Location</label>
        <input v-model.trim="form.Location" required />
      </div>

      <div class="row">
        <label>BestBefore</label>
        <input v-model.trim="form.BestBefore" type="datetime-local" required />
      </div>

      <div class="actions">
        <button class="btn btn-save" type="submit" :disabled="saving">
          {{ saving ? "Saving..." : "Save" }}
        </button>
        <button class="btn btn-cancel" type="button" @click="$router.push('/vaccines')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.error { color: #b00020; margin: 12px 0; }
.success { color: #1b7f3a; margin: 12px 0; }
.card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  max-width: 720px;
}
.row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}
label { font-weight: 700; }
input, textarea {
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 10px 12px;
}
.actions {
  margin-top: 10px;
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
.btn-save { background: #0d6efd; color: #fff; }
.btn-cancel { background: #6c757d; color: #fff; }
</style>
