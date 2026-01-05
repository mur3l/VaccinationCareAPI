<script>
    export default {
        name:"VaccineDetailsTable",
        props: {
            item:{
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
</script>
<template>
    <table class="table table-striped">
        <tr>
            <td>Vaccine ID</td>
            <td>{{item.VaccineID}}</td>
        </tr>
        <tr>
            <td>Nimi</td>
            <td>{{item.Name}}</td>
        </tr>
        <tr>
            <td>Description</td>
            <td>{{item.Description}}</td>
        </tr>
        <tr>
            <td>Clinic ID</td>
            <td>{{item.Clinic}}</td>
        </tr>
        <tr>
            <td>Appointment</td>
            <td>{{item.Appointment}}</td>
        </tr>
        <tr>
            <td>Location</td>
            <td>{{item.Location}}</td>
        </tr>
        <tr>
            <td>BestBefore</td>
            <td>{{item.BestBefore}}</td>
        </tr>
    </table>
</template>