<script>
export default {
  name: "VaccinesTable",
  props: {
    items: { type: Array, default: () => [] }
  },
  emits: ["deleted"],
  methods: {
    async deleteVaccine(vaccineID) {
      const res = await fetch(`http://localhost:8080/vaccination/${vaccineID}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Delete failed:", res.status);
        return;
      }

      // Tell parent to remove the item from the table
      this.$emit("deleted", vaccineID);
    },

    updateVaccine(vaccineID) {
      // Route should be /vaccination/:VaccineID/edit (see router section below)
      this.$router.push({ name: "modifyVaccine", params: { VaccineID: vaccineID } });
    },
  },
};
</script>


<template>
  <table class="tabel">
    <thead>
      <tr>
        <th>Vaccine ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Clinic</th>
        <th>Appointment</th>
        <th>Location</th>
        <th>BB</th>
        <th class="action-col">Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.VaccineID">
        <td>{{ item.VaccineID }}</td>
        <td>{{ item.Name }}</td>
        <td>{{ item.Description }}</td>
        <td>{{ item.Clinic }}</td>
        <td>{{ item.Appointment }}</td>
        <td>{{ item.Location }}</td>
        <td>{{ item.BestBefore }}</td>

        <td class="actions">
          <button class="action-btn update" @click="updateVaccine(item.VaccineID)">
            Update
          </button>
          <button class="action-btn delete" @click="deleteVaccine(item.VaccineID)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<style scoped>
.tabel {
  width: 100%;
  border-collapse: separate;
  border-spacing: 14px; /* gives “boxed” spacing look like your mock */
}

.tabel th, .tabel td {
  border: 1px solid #fff;
  padding: 18px;
  text-align: center;
  background: #000;
  color: #fff;
}

.action-col { min-width: 220px; }

.actions {
  display: flex;
  justify-content: center;
  gap: 18px;
}

.action-btn {
  padding: 12px 22px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

.action-btn.update:hover,
.action-btn.delete:hover {
  opacity: 0.85;
}
</style>
