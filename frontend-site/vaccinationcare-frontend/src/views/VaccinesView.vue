<script>
    import VaccinesTable from '../components/VaccineTable.vue'
    export default {
        components: {
            VaccinesTable
        },
        data() {
            return{
            allVaccines: []
        }
        },
    async created() {
    const res = await fetch("http://localhost:8080/vaccination");
    this.allVaccines = await res.json();
}

}
</script>
<template>
    <main>
        <VaccinesTable :items="allVaccines"/>
    </main>
</template>