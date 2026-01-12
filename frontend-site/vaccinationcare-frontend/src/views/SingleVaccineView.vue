<script>
import VaccineDetailsTable from "../components/VaccineDetailsTable.vue";

export default {
  name: "SingleVaccineView",

  data() {
    return {
      thisVaccine: {
        VaccineID: "",
        Name: "",
        Description: "",
        Clinic: "",
        Appointment: "",
        Location: "",
        BestBefore: "",
      },
    };
  },

  async created() {
    const id = this.$route.params.id; // must match your router path /vaccination/:id
    if (!id) throw new Error("Missing route param: id");

    const response = await fetch(`http://localhost:8080/vaccination/${id}`);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text.slice(0, 120)}`);
    }

    this.thisVaccine = await response.json();
  },
};
</script>


<template>
  <table class="table table-striped">
    <tr><td>Vaccine ID</td><td>{{ thisVaccine.VaccineID }}</td></tr>
    <tr><td>Name</td><td>{{ thisVaccine.Name }}</td></tr>
    <tr><td>Description</td><td>{{ thisVaccine.Description }}</td></tr>
    <tr><td>Clinic</td><td>{{ thisVaccine.Clinic }}</td></tr>
    <tr><td>Appointment</td><td>{{ thisVaccine.Appointment }}</td></tr>
    <tr><td>Location</td><td>{{ thisVaccine.Location }}</td></tr>
    <tr><td>Best Before</td><td>{{ thisVaccine.BestBefore }}</td></tr>
  </table>
</template>
