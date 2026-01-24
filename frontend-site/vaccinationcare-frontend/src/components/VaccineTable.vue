<script>
export default {
  name: "VaccineTable",

  props: {
    items: { type: Array, default: () => [] }
  },

  emits: ["deleted", "edit", "delete"],

  methods: {
    async deleteVaccine(id) {
      if (confirm("Are you sure you want to delete this vaccine?")) {
        const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          this.$emit("deleted", id);
          this.$emit("delete", id); 
        }
      }
    },

    async editVaccine(vaccine) {
      this.$emit("edit", vaccine);
    },

    updateVaccine(id) {
      this.$router.push({
        name: "modifyVaccine",
        params: { id }
      });
    },

    viewVaccine(id) {
      this.$router.push({
        name: "singleVaccine",
        params: { id }
      });
    }
  }
};
</script>

<template>
  <table class="vaccine-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Manufacturer</th>
        <th>Target Disease</th>
        <th>Required Doses</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.VaccinationID || item.id">
        <td>{{ item.VaccinationID || item.id }}</td>
        <td>{{ item.VaccineName || item.name }}</td>
        <td>{{ item.Manufacturer || item.manufacturer }}</td>
        <td>{{ item.TargetDisease || item.targetDisease }}</td>
        <td>{{ item.RequiredDoses || item.requiredDoses }}</td>
        <td>{{ item.Description || item.description }}</td>
        <td class="actions">
          <!-- View Button -->
          <button 
            @click="viewVaccine(item.VaccinationID || item.id)" 
            class="btn-view"
            v-if="$route.name !== 'singleVaccine'"
          >
            View
          </button>
          
          <!-- Edit Button -->
          <button 
            @click="editVaccine(item)" 
            class="btn-edit"
          >
            Edit
          </button>
          
          <!-- Delete Button -->
          <button 
            @click="deleteVaccine(item.VaccinationID || item.id)" 
            class="btn-delete"
          >
            Delete
          </button>
          
          <!-- Or use updateVaccine to navigate to edit page -->
          <!-- <button @click="updateVaccine(item.VaccinationID)" class="btn-edit">
            Edit Page
          </button> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.vaccine-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.vaccine-table th,
.vaccine-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.vaccine-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.vaccine-table tr:hover {
  background-color: #f5f5f5;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-view {
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-edit {
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-view:hover {
  background-color: #138496;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete:hover {
  background-color: #c82333;
}
</style>