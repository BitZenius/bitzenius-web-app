<template>
<v-card>
    <v-dialog v-model="dialog" width="500">
        <template>
            <v-card>
                <v-card-title class="text-h5 lighten-2">
                    Top Up
                </v-card-title>
                <v-card-text class="mt-3 mb-0 pb-0">
                    <v-text-field v-model="topUpBalance" label="Please input value of balance" outlined>
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="primary" @click="dialog = false">
                        Top Up
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    <div class="balance-container d-flex flex-wrap align-center">
        <span>Credit Balance</span>
        <v-chip color="primary" class="ml-2">${{balance}}</v-chip>
        <v-btn class="primary" @click="showTopUp">Top Up</v-btn>
    </div>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            balance: 5000,
            topUpBalance: 0,
            dialog: false
        }
    },
    methods: {
        showTopUp() {
            this.dialog = true;
        }
    }
}
</script>

<style scoped>
.balance-container {
    padding: 5px 15px;
    border-radius: 5px;
    position: relative;
}

.balance-container .v-btn {
    position: absolute;
    width: 150px;
    right: 15px;
}
</style>
