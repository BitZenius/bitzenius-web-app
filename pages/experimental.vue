<template>
<div>
    <v-row>
        <v-col cols="12" sm="12" md="12">
            <v-card class="pa-2" elevation="8">
                <v-btn class="primary" @click="_fetch">Fetch Collection</v-btn>
            </v-card>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    layout: 'account',
    data() {
        return {
        }
    },
    head() {
        return {
            title: "Experimental"
        }
    },
    methods: {
        _fetch(){
            alert('fetching');
        }
    },
    computed: {
        chartData() {}
    },
    mounted() {
    }
}
</script>
