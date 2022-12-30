<template>
<v-row>
    <v-col cols="12">
        <v-card class="pa-2" elevation="8">
            <v-sheet class="text-h6 font-weight-bold ma-4">
                Active Positions
            </v-sheet>
            <v-data-table :headers="headers" :items="items" :loading="isLoading">

            </v-data-table>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    /*
    Active Position
Quantity
Current Price
24h Change
P and L*/
    data() {
        return {
            headers: [{
                    text: 'Active Position',
                    value: 'position'
                },
                {
                    text: 'Quantity',
                    value: 'quantity'
                },
                {
                    text: 'Current Price',
                    value: 'current_price',
                    sortable: true
                },
                {
                    text: '24h Change',
                    value: 'change',
                    sortable: true
                },
                {
                    text: 'P and L',
                    value: 'status',
                    sortable: true
                },
            ],
            items: [{
                    position: "ETH/USDT",
                    quantity: "0.3 ETH",
                    current_price: "$1200",
                    change: "+2.1%",
                    status: "+3% 11.2 USDT"
                },
                {
                    position: "LINK/USDT",
                    quantity: "10 LINK",
                    current_price: "$6.7",
                    change: "+3.8%",
                    status: "-3% 7 USDT"
                },
                {
                    position: "ETH/USDT",
                    quantity: "0.3 ETH",
                    current_price: "$1200",
                    change: "+2.1%",
                    status: "+3% 11.2 USDT"
                },
            ],
            isLoading: true
        }
    },
    methods: {

    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000)
    }
}
</script>

<style scoped>

</style>
