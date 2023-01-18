<template>
<v-card elevation="8">
    <v-card-title class="text-h6 lighten-2">
        <span>{{data ? "Edit" : "Add"}}</span>
        <strong>&nbsp;{{exchange}}&nbsp;</strong> As Your Exchange
    </v-card-title>
    <v-card-text class="mt-3 pb-0">
        <v-card elevation="0" class="mb-12 d-flex flex-column align-center">
            <!-- <h3>Please fill up the form below</h3> -->
            <v-row class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="12" md="12">
                    <v-text-field readonly dense class="mt-2" v-model="exchange" label="Title" outlined></v-text-field>
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
        <v-btn v-if="!data" :disabled="!user.subscription || user.subscription == false" color="primary" @click="_save">
            Save
        </v-btn>
        <v-btn v-else :disabled="!user.subscription || user.subscription == false" color="success" @click="_updateData">
            Update
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    props: ['exchange', 'data'],
    data() {
        return {
            name: this.exchange,
            api_key: null,
            secret_key: null,
            // exchangeItems: ['Binance', 'Tokocrypto', 'MEXC', 'Coinstore'],
        }
    },
    computed:{
        user() {
            return this.$store.state.authUser
        },
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
            if(!this.user.subscription){
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "You haven't subsrcibe to any plan",
                    color: "customPink"
                })
                return;
            }
            this.$store.commit('setIsLoading', true);
            let paramTemp = {};
            paramTemp.title = this.name;
            paramTemp.exchange_name = this.exchange;
            paramTemp.api_key = this.api_key;
            paramTemp.secret_key = this.secret_key
            if (!this.exchange || !this.api_key || !this.secret_key) {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Please fill all requirements needed!",
                    color: "customPink"
                })
            } else {
                console.log(paramTemp);
                try {
                    let validateExchangeKey = await this.$api.$post("/user/validate-user-exchange", paramTemp);
                    if(validateExchangeKey.success){
                        this.$store.commit('setShowSnackbar', {
                            show: true,
                            message: "Your api key and secret key are valid!",
                            color: "success"
                        })
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
                } catch (error) {
                    console.log(error.message)
                    this.$store.commit('setShowSnackbar', {
                        show: true,
                        message: "Please insert valid api key and secret key",
                        color: "customPink"
                    })
                }
            }
        },
        async _updateData() {
            if(!this.user.subscription){
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "You haven't subsrcibe to any plan",
                    color: "customPink"
                })
                return;
            }
            this.$store.commit('setIsLoading', true);
            let paramTemp = {};
            paramTemp.api_key = this.api_key;
            paramTemp.secret_key = this.secret_key;
            paramTemp.title = this.exchange;
            if (!this.exchange || !this.api_key || !this.secret_key) {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Please fill all requirements needed!",
                    color: "customPink"
                })
            } else {
                console.log(paramTemp);
                try {
                    let validateExchangeKey = await this.$api.$post("/user/validate-user-exchange", paramTemp);
                    if(validateExchangeKey.success){
                        this.$store.commit('setShowSnackbar', {
                            show: true,
                            message: "Your api key and secret key are valid!",
                            color: "success"
                        });
                        let res = await this.$api.$put("/user/exchange", paramTemp, {
                            params: {
                                id: this.data.id
                            }
                        });
                        setTimeout(() => {
                            this.$emit('close-modal', false);
                            if (res.ok) {
                                this.$store.commit('setShowSnackbar', {
                                    show: true,
                                    message: "Successfuly Updated!",
                                    color: "success"
                                })
                                this.$store.commit('setIsLoading', false);
                            } else {
                            }
                        })
                    }
                } catch (error) {
                    console.log(error.message)
                    this.$store.commit('setShowSnackbar', {
                        show: true,
                        message: "Please insert valid api key and secret key",
                        color: "customPink"
                    })
                }
            }
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
