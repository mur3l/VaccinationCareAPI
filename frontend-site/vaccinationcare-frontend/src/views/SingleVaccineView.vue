<script>
import VaccineDetailsTable from "../components/VaccineDetailsTable.vue";

export default {
  name: "SingleVaccineView",

  props: {
    seekID: {
      type: String,
      required: true,
    },
  },

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
    const response = await fetch(
      `http://localhost:8080/vaccinations/${this.seekID}`
    );
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
