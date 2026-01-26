<script>
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
    const id = this.$route.params.id;   // 🔴 PEAB olema "id"
    if (!id) {
      console.error("Missing route param: id");
      return;
    }

    const response = await fetch(`http://localhost:8080/vaccination/${id}`);
    const data = await response.json();

    // mapime backendi vastuse frontendile sobivaks
    this.thisVaccine = {
      VaccineID: data.id ?? data.VaccineID ?? "",
      Name: data.name ?? "",
      Description: data.description ?? "",
      Clinic: data.clinic ?? "",
      Appointment: data.appointment ?? "",
      Location: data.location ?? "",
      BestBefore: data.bestBefore ?? "",
    };
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
