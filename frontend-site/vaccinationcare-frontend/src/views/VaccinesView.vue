<script>
    import VaccinesTable from '../components/VaccinesTable.vue'
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
        this.allVaccines = await (await fetch('http://localhost:8080/vaccines')).json
    }
}
</script>
<template>
    <main>
        <VaccinesTable :items="allVaccines"/>
    </main>
</template>