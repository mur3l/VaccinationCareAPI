<script>
export default {
  name: "VaccineTable",
  props: {
    items: { type: Array, required: true },
  },
  methods: {
    viewVaccine(id) {
      this.$router.push({ name: "singleVaccine", params: { id: String(id) } });
    },
    updateVaccine(id) {
      this.$router.push({ name: "modifyVaccine", params: { id: String(id) } });
    },
    async deleteVaccine(id) {
      if (!confirm("Are you sure you want to delete this vaccine?")) return;

      const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        this.$emit("deleted", id);
        this.$emit("delete", id);
      } else {
        const txt = await res.text();
        alert(`Delete failed: ${txt}`);
      }
    },
  },
};
</script>

<template>
  <table class="tbl">
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
      <tr v-if="items.length === 0">
        <td colspan="7">No vaccines</td>
      </tr>

      <tr v-for="item in items" :key="item.VaccineID">
        <td>{{ item.VaccineID }}</td>
        <td>{{ item.Name }}</td>
        <td>{{ item.Manufacturer }}</td>
        <td>{{ item.TargetDisease }}</td>
        <td>{{ item.RequiredDoses }}</td>
        <td>{{ item.Description }}</td>

        <td class="actions">
          <button
            @click="viewVaccine(item.VaccineID)"
            class="btn-view"
            v-if="$route.name !== 'singleVaccine'"
          >
            View
          </button>

          <button @click="updateVaccine(item.VaccineID)" class="btn-edit">
            Edit
          </button>

          <button @click="deleteVaccine(item.VaccineID)" class="btn-delete">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.tbl { width: 100%; border-collapse: collapse; margin-top: 12px; }
.tbl th, .tbl td { border-bottom: 1px solid #ddd; padding: 10px; text-align: left; }
.tbl th { background: #f8f9fa; }

.actions { display:flex; gap:8px; align-items:center; }

.btn-view {
  background: #17a2b8; color:#fff; border:none; padding:6px 10px; border-radius:4px;
  cursor:pointer; font-weight:bold;
}
.btn-edit {
  background: #ffc107; color:#222; border:none; padding:6px 10px; border-radius:4px;
  cursor:pointer; font-weight:bold;
}
.btn-delete {
  background: #dc3545; color:#fff; border:none; padding:6px 10px; border-radius:4px;
  cursor:pointer; font-weight:bold;
}
</style>
