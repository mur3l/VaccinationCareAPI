<script>
    import VaccineDetailsTable from `../components/VaccineDetails`;
    export default{
        components: {VaccineDetailsTable}, 
        data() {
            return {
                thisVaccine: {
                    VaccineID: "",
                    Name: "",
                    Description: "des",
                    Clinic: "",
                    Appointment: 16.12.2025,
                    Location: "",
                    BestBefore: 2025
                }
            }
        },
        props: {
            seekID:{
                type: String,
                required: true
            }
        },
        async created() {
            this.thisVaccine = await (await fetch(`http://
            localhost:8080/vaccinations${seekID}`))
        }
    }
</script>