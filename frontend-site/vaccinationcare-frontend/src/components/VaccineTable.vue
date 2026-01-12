<script>
import VaccineDetailsTable from './VaccineDetailsTable.vue';

    export default {
        name: "VaccinesTable",
        components: { VaccineDetailsTable },
        props: {
            items: Array
        },
        data() {
            return {
            selectedVaccine: null,
            showDetails: false
            }
        },
        methods: {
            async deleteVaccine(vaccineID) {
                await fetch(`http://localhost:8080/vaccination/${vaccineID}`, { method: 'DELETE' });
            },
            modifyVaccine(vaccineID) {
                this.$router.push({ name: 'modifyVaccine', params: { seekID: vaccineID } });
            }
        }
    }
</script>

<template>
    <table class="tabel table-striped">
        <thead>
            <tr>
                <th>Vaccine ID</th>
                <th>Vaccine Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.VaccineID">
                <td>{{ item.VaccineID }}</td>
                <td>{{item.Name}}</td>
                <td class="actions">
                    <router-link :to="{ name: 'vaccine', params: { VaccineID: item.VaccineID } }">
                    <button class="action-btn details">View</button>
                    </router-link>
                    <button @click="deleteVaccine(item.VaccineID)" class="action-btn">Delete</button>
                    <button @click="modifyVaccine(item.VaccineID)" class="action-btn">Modify</button>
                </td>
            </tr>
        </tbody>
    </table>

    <div v-if="showDetails" class="details-modal">
      <button class="close-btn" @click="closeDetails">Close</button>
      <VaccineDetailsTable :item="selectedVaccine"/>
    </div>
</template>

<style scoped>
.tabel {
  width: 100%;
  border-collapse: collapse;
}

.tabel th, .tabel td {
  border: 1px solid #FFD700;
  padding: 10px;
  text-align: left;
  vertical-align: middle;
}

.tabel th {
  background-color: #000000;
  color: #FFD700;
}
.actions {
    display: flex;
    gap: 5px; 
}

.action-btn {
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
}

.action-btn.details {
  background-color: #007bff;
}

.action-btn.update {
  background-color: #28a745;
}

.action-btn.delete {
  background-color: #dc3545;
}

.action-btn:hover {
  opacity: 0.85;
}

.details-modal {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #FFD700;
  background-color: #000;
  color: #FFD700;
}
</style>

