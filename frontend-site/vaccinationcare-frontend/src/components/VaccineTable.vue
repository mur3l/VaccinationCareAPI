<script>
    export default {
        name: "VaccinesTable",
        props: {
            items: Array
        },
        methods {
            function deleteMovie () {
                this.result = await (await fetch(`http://localhost:8080/vaccination/${this.VaccineID}`, {method: 'DELETE'}))
            }
        }
    }
</script>

<template>
    <table class="tabel table-striped">
        <thead>
            <tr>
                <th>Vaccine ID</th>
                <th>Vaccine Name</th>
            </tr>
        </thead>
            <tbody>
                <tr v-for="item in items" :key="item.VaccineID">
                    <td>{{ item.VaccineID }}</td>
                    <td>{{item.Name}}</td>
                    <td><router-link :to="{name:'vaccine', params: {seekID: item.VaccineID}}">
                        <button @click="navigate">ä</button>
                    </router-link>
                    </td>
                    <td>
                        <router-link :to="{name:'vaccine'}">
                            <button @click="deleteVaccine(item.VaccineID)"></button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
    </table>
</template>

<style scoped/>