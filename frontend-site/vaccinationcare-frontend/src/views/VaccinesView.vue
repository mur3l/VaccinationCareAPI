<script setup>
import { ref, onMounted } from "vue";
import VaccineTable from "../components/VaccineTable.vue";

const items = ref([]);
const loading = ref(false);
const error = ref("");

async function loadVaccines() {
  loading.value = true;
  error.value = "";

  try {
    const res = await fetch("http://localhost:8080/vaccination", {
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Failed to load: ${res.status}`);
    }

    items.value = await res.json();
  } catch (e) {
    error.value = e.message || "Failed to load vaccines";
    items.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(loadVaccines);

function onDeleted(id) {
  items.value = items.value.filter(v => v.VaccineID !== id);
}
</script>

<template>
  <div>
    <h2>Vaccines</h2>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>

    <VaccineTable
      :items="items"
      @deleted="onDeleted"
    />
  </div>
</template>

<style scoped>
.error { color: #b00020; margin: 12px 0; }
</style>