<template>
<v-card elevation="8">
    <v-card-title class="text-h6 lighten-2">
        Add New Exchange
    </v-card-title>
    <v-card-text class="mt-3 pb-0">
        <v-card elevation="0" class="mb-12 d-flex flex-column align-center">
            <h3>Please fill up the form below</h3>
            <v-row class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="12" md="12">
                    <v-text-field dense class="mt-2" v-model="name" label="Custom Title" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="12" md="12">
                    <v-select dense v-model="exchange" :items="exchangeItems" label="Choose Available Exchange" outlined />
                </v-col>
            </v-row>
            <v-row class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="12" md="12">
                    <v-text-field dense class="mt-2" v-model="api_key" label="Api Key" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="12" md="12">
                    <v-text-field dense class="mt-2" v-model="secret_key" label="Secret Key" outlined></v-text-field>
                </v-col>
            </v-row>
        </v-card>
    </v-card-text>
    <v-card-actions class="d-flex justify-end pt-0">
        <v-btn color="blue darken-1" class="mr-2" text @click="closeModal">
            Cancel
        </v-btn>
        <v-btn color="primary" @click="_save">
            Save
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            exchange: null,
            api_key: null,
            secret_key: null,
            exchangeItems: ['Binance', 'Tokocrypto', 'MEXC', 'Coinstore'],
        }
    },
    methods: {
        // TRIGGER
        closeModal() {
            this.$emit('close-modal', false);
        },
        _logger() {
            console.log(this.exchange);
        },
        async _save() {
            let paramTemp = {};
            paramTemp.title = this.name;
            paramTemp.exchange_name = this.exchange;
            paramTemp.api_key = this.api_key;
            paramTemp.secret_key = this.secret_key
            let res = await this.$api.$post("/user/exchange", paramTemp);
            this.$store.commit('setIsLoading', true);
            setTimeout(() => {
                this.$emit('close-modal', false);
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Successfuly Added New Bot!",
                    color: "success"
                })
                this.$store.commit('setIsLoading', false);
            })
        }
    }
}
</script>

<style scoped>
.summary .v-card__title {
    padding: 0;
    font-size: 0.9rem;
    text-align: center;
    display: block;
}

.summary .v-card__text {
    display: block;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>
