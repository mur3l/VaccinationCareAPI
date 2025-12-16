<script>
    import VaccineDetailsTable from `../components/VaccineDetailsTable`;
    export default{
        components: {
                    thisVaccine: {
                    VaccineID: "",
                    Name: "",
                    Description: "des",
                    Clinic: "",
                    Appointment: "16.12.2025",
                    Location: "",
                    BestBefore: 2025
                }
            },
        props: {
            seekID:{
                type: String,
                required: true
            },

        data() {
            return {
                thisVaccine: {
                    VaccineID: "",
                    Name: "",
                    Description: "des",
                    Clinic: "",
                    Appointment: "16.12.2025",
                    Location: "",
                    BestBefore: 2025
                }
            }
        }
    },
        async created() {
            this.thisVaccine = await (await fetch(`http://
            localhost:8080/vaccinations/${seekID}`)).json();
        }
    }
</script>
<template>
    <table class="table table-striped">
        <tr>
            <td>Vaccine ID</td>
            <td>{{thisVaccine.VaccineID}}</td>
        </tr>
        <tr>
            <td>Nimi</td>
            <td>{{thisVaccine.Name}}</td>
        </tr>
        <tr>
            <td>Description</td>
            <td>{{thisVaccine.Description}}</td>
        </tr>
        <tr>
            <td>Clinic ID</td>
            <td>{{thisVaccine.Clinic}}</td>
        </tr>
        <tr>
            <td>Appointment</td>
            <td>{{thisVaccine.Appointment}}</td>
        </tr>
        <tr>
            <td>Location</td>
            <td>{{thisVaccine.Location}}</td>
        </tr>
        <tr>
            <td>BestBefore</td>
            <td>{{thisVaccine.BestBefore}}</td>
        </tr>
    </table>
</template>