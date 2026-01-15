<script>
export default {
  name: 'VaccineDetailsTable',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({
        VaccineID: '',
        Name: '',
        Description: '',
        Clinic: '',
        Appointment: '',
        Location: '',
        BestBefore: ''
      })
    }
  }
}
</script>

<template>
  <table class="details-table" v-if="item">
    <tr>
      <td>Vaccine ID</td>
      <td>{{ item.VaccineID }}</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>{{ item.Name }}</td>
    </tr>
    <tr>
      <td>Description</td>
      <td>{{ item.Description }}</td>
    </tr>
    <tr>
      <td>Clinic</td>
      <td>{{ item.Clinic }}</td>
    </tr>
    <tr>
      <td>Appointment</td>
      <td>{{ item.Appointment }}</td>
    </tr>
    <tr>
      <td>Location</td>
      <td>{{ item.Location }}</td>
    </tr>
    <tr>
      <td>Best Before</td>
      <td>{{ item.BestBefore }}</td>
    </tr>
  </table>
</template>

<style scoped>
.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.details-table td {
  border: 1px solid #FFD700;
  padding: 8px;
  color: #FFD700;
  background-color: #000;
}
</style>
