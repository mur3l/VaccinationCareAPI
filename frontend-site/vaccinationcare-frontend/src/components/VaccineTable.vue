<script>
export default {
  name: "VaccineTable",

  props: {
    items: { type: Array, default: () => [] }
  },

  emits: ["deleted"],

  methods: {
    async deleteVaccine(id) {
      const res = await fetch(`http://localhost:8080/vaccination/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        this.$emit("deleted", id);
      }
    },

    updateVaccine(id) {
      this.$router.push({
        name: "modifyVaccine",
        params: { id } // ✅ AINULT id
      });
    },

    viewVaccine(id) {
      this.$router.push({
        name: "singleVaccine",
        params: { id } // ✅ AINULT id
      });
    }
  }
};
</script>
