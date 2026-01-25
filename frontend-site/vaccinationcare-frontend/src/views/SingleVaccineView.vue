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
  const id = this.$route.params.id;
  if (!id) {
    console.error("Missing route param: id");
    return;
  }

  const response = await fetch(`http://localhost:8080/vaccination/${id}`, {
    credentials: "include"
  });

  if (!response.ok) {
    console.error("Failed to load vaccine:", response.status);
    return;
  }

  const data = await response.json();

  this.thisVaccine = {
    VaccineID: data.VaccineID || "",
    Name: data.Name || "",
    Description: data.Description || "",
    Clinic: data.Clinic || "",
    Appointment: data.Appointment || "",
    Location: data.Location || "",
    BestBefore: data.BestBefore || "",
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
