<script setup>
import { ref, onMounted } from "vue";
import VaccineTable from "../components/VaccineTable.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([]);
const loading = ref(false);
const error = ref("");

function goAdd() {
  router.push({ name: "newVaccine" });
}

async function loadVaccines() {
  loading.value = true;
  error.value = "";

  try {
    const res = await fetch("http://localhost:8080/vaccination", {
      credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Failed to load: ${res.status}`);

    items.value = Array.isArray(data) ? data : [];
  } catch (e) {
    error.value = e.message || "Failed to load vaccines";
    items.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadVaccines);

function onDeleted(id) {
  items.value = items.value.filter((v) => v.VaccineID !== id);
}
</script>

<template>
  <div>
    <div class="header">
      <h2>Vaccines</h2>
      <button class="btn-add" @click="goAdd">Add</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>

    <VaccineTable v-else :items="items" @deleted="onDeleted" />
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

.error {
  color: #b00020;
  margin: 12px 0;
}
</style>
