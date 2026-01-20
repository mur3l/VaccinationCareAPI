<!-- <script>
    import VaccinesTable from '../components/VaccineTable.vue'
    export default {
        components: {
            VaccinesTable
        },
        data() {
            return{
            allVaccines: []
        }
        },
    async created() {
    const res = await fetch("http://localhost:8080/vaccination");
    this.allVaccines = await res.json();
}

}
</script>
<template>
    <main>
        <VaccinesTable :items="allVaccines"/>
    </main>
</template> -->


<script setup>
import { ref, onMounted } from 'vue'
import VaccinesTable from "../components/VaccineTable.vue";

const vaccines = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8080/vaccination')
    if (!res.ok) throw new Error('Failed to fetch')
    vaccines.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Vaccines List</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <VaccinesTable :items="vaccines" />
    </div>
  </div>
</template>
