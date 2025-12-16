<script>
    export default {
        name: "VaccinesTable",
        props: {
            items: Array
        }
    }
</script>

<template>
    <table class="tabel table-striped">
        <tr>
            <th>Vaccine ID</th>
            <th>Vaccine Name</th>
        </tr>
        <tr v-for="item in items" :key="item.VaccineID">
            <td>{{ item.VaccineID }}</td>
            <td>
                <a @click="$emit('vaccine', item)" value={{item.VaccineID}}>
                    {{ item.Name }}
                </a>

            </td>
        </tr>
    </table>
</template>

<style scoped/>