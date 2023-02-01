<template>
<v-row>
    <v-dialog v-if="showAddExchange" v-model="showAddExchange" max-width="600">
        <template>
            <ModalsExchangeSetup :data="data" :exchange="selectedExchange" @close-modal="closeModal" />
        </template>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" dark bottom color="success" elevation="15">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>

    <v-col cols="12" class="d-flex justify-center align-center text-center">
        <v-card class="d-flex px-5 py-3" color="primary">
            <v-row>
                <v-col cols="11" class="d-flex justify-center align-center white--text pa-5">
                    <span>
                        Please be sure to whitelist the following IP address when creating an API Key on your exchange. It is a required step: 
                        <v-chip color="customGreen black--text" flat>{{whitelistIp}}</v-chip>
                    </span>
                </v-col>
                <v-col cols="1" class="d-flex align-center justify-center">
                    <v-tooltip v-model="copied" top>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            fab
                            outlined
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="customGreen"
                            size="16"
                            v-clipboard:copy="whitelistIp"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                        >
                            <v-icon color="customGreen">
                            mdi-content-copy
                            </v-icon>
                        </v-btn>
                        </template>
                        <span>{{ copied ? 'Copy' : 'Copied' }}</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-card>
    </v-col>
    <v-col cols="12" class="d-flex px-0 pt-0">
        <v-col v-for="(exchange, index) in exchanges" :key="index" sm="6" md="4" lg="3">
            <v-card style="position:relative; margin-bottom:25px;" :class="{'d-flex align-center justify-center exchange-active': exchange.selected, 'd-flex align-center justify-center': !exchange.selected}" elevation="3">
                <v-row>
                    <v-col cols="12" class="d-flex align-center justify-start pb-0">
                        <div style="width:100%;" class="d-flex justify-center align-center">
                            <img style="height:115px; padding:25px;" :src="exchange.image" alt="">
                        </div>
                    </v-col>
                    <v-col cols="12" class="d-flex flex-column justify-start align-center pt-0 pb-10">
                        <h4>{{exchange.name}}</h4>
                        <v-btn :disabled="!user.subscription || user.subscription == false" v-if="exchange.active" small color="primary" outlined @click="_addExchange(exchange)">Edit Exchange</v-btn>
                        <v-btn :disabled="!user.subscription || user.subscription == false" v-else color="primary" small @click="_addExchange(exchange)">Setup Exchange</v-btn>
                    </v-col>
                    <v-overlay z-index="1" v-if="exchange.comingsoon" :absolute="true" opacity="0.7" overlay="true">
                        <h3 style="letter-spacing:2px;" class="customYellow--text">Coming Soon!</h3>
                    </v-overlay>
                </v-row>
                <span class="updated-label primary" v-if="exchange.updateAt">Latest Update : {{$moment(exchange.updatedAt).format("DD/MM/YYYY HH:mm")}}</span>
            </v-card>
        </v-col>
    </v-col>

</v-row>
</template>

<style scoped>
.exchange-selected {
    position: absolute;
    bottom: -20px;
    right: 5px;
    background: #17576a;
    color: white;
    padding: 0px 15px;
    border-radius: 0px 0px 15px 15px !important;
    font-size: 0.8rem;
}

.exchange-table-selected {
    background: #17576a;
    padding: 5px 25px;
    font-weight: bold;
    color: white;
    float: right;
    font-size: 0.8rem;
    border-radius: 15px 15px 0px 0px;
}

.updated-label {
    position: absolute;
    font-size: 0.7rem;
    bottom: -28px;
    background: #17576a;
    color: white;
    padding: 5px 22px;
}

.text-info {
    background: #177e89;
    color: white;
    border-radius: 10px;
    padding: 13px 10px;
}
</style>

<script>
import Form from './form'
export default {
    layout: 'account',
    components: {
        Form
    },
    filters: {
        moment(val) {
            console.log('moment', this.$moment(new Date).format('DD/MM/YYYY'));
            console.log('val', val)
            // return this.$moment(val).format('DD/MM/YYYY');
        }
    },
    data() {
        return {
            title: 'My Exchanges',
            dialog: false,
            dialogDelete: false,

            // START OF CARD EXCHANGE
            data: false,
            exchanges: [{
                    name: "Binance",
                    selected: false,
                    active: false,
                    image: "/exchange_logo/binance.png",
                    comingsoon: false
                },
                {
                    name: "Bybit",
                    selected: false,
                    active: false,
                    image: "/exchange_logo/bybit.png",
                    comingsoon: false
                },
                {
                    name: "Kucoin",
                    selected: false,
                    active: false,
                    image: "/exchange_logo/kucoin.png",
                    comingsoon: true
                },
                {
                    name: "Tokocrypto",
                    selected: false,
                    active: false,
                    image: "/exchange_logo/tokocrypto.png",
                    comingsoon: true
                }
            ],
            // END OF CARD EXCHANGE

            // MODAL EXCHANGE
            selectedExchange: null,
            // END OF MODAL EXCHANGE

            headers: [{
                    text: 'Name',
                    value: 'title'
                },
                {
                    text: 'Exchange',
                    value: 'exchange_name'
                },
                {
                    text: 'Created On',
                    value: 'created_at'
                },
                {
                    text: '',
                    value: 'actions',
                    sortable: false
                }
            ],
            clientExchanges: [],
            id: null,
            editedItem: {
                name: '',
                exchange: '',
                api_key: '',
                secret_key: ''
            },
            defaultItem: {
                name: '',
                exchange: '',
                api_key: '',
                secret_key: ''
            },
            isLoading: false,
            listener: null,
            snackbar: false,
            snackbarText: 'My timeout is set to 2000.',
            snackbarTimeout: 5000,

            // MODAL ADD EXCHANGE
            showAddExchange: false,

            // COPY
            whitelistIp:"108.61.117.32",
            copied: false,
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        formTitle() {
            return this.id === null ? 'Add New' : 'Edit'
        },
        user() {
            return this.$store.state.authUser
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        }
    },
    mounted() {
        console.log("USER!!", this.user);
        this.$store.commit('setIsLoading', true);
        this._fetchExchanges()
        this.$store.commit('setTitle', this.title)
        // this.listener = this.$fire.firestore.collection('user_exchanges').orderBy('created_at', 'desc').onSnapshot((onResult, onError) => {
        //     if (onResult.size > 0) {
        //         const exchanges = []
        //         onResult.docs.forEach((doc) => {
        //             exchanges.push({
        //                 ...doc.data(),
        //                 id: doc.id,
        //                 created_at: this.$moment(doc.data().created_at).format('DD/MM/YYYY HH:mm')
        //             })
        //         })
        //         this.items = exchanges
        //     }
        // })
    },
    beforeDestroy() {},
    methods: {
        // FETCH API
        async _fetchExchanges() {
            console.log("FETCHING DATA EXCHANGES");
            let res = await this.$api.$get('/user/exchange');
            this.clientExchanges = res.data;
            console.log("DATA EXCHANGES", res.data);
            if (res.data) {
                for (let exchange of this.clientExchanges) {
                    console.log(exchange.exchange_name);
                    for (let i = 0; i < this.exchanges.length; i++) {
                        let currentExchange = this.exchanges[i];
                        console.log(`comparing ${currentExchange.name} & ${exchange.exchange_name} ==`)
                        if (currentExchange.name == exchange.exchange_name) {
                            console.log("IF");
                            currentExchange.active = true;
                            currentExchange.updateAt = exchange.updated_at;
                            currentExchange.id = exchange._id;
                        }
                    }
                }
                this.$store.commit('setIsLoading', false);
            } else {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Unable to fetch user exchanges!",
                    color: "customPink"
                })
                this.$store.commit('setIsLoading', false);
            }
        },

        // LISTENER
        closeModal(val) {
            this.showAddExchange = val;
            this._fetchExchanges()
        },
        // END OF LISTENER
        // TRIGGER
        onCopy(e) {
            console.log('onCopy', e.text);
            this.copied = !this.copied
        },
        onError: function (e) {
            alert('Failed to copy: ' + e.text)
        },
        async _logger() {
            await this._fetchExchanges();
            console.log(this.clientExchanges);
            console.log(this.exchanges);
        },
        _addExchange(exchange) {
            this.data = null;
            this.selectedExchange = exchange.name;
            this.showAddExchange = true;
            if (exchange.active) {
                this.data = exchange;
            }
            // alert('On going pop-up modal add Exchange')
        },
        addItem() {
            this.id = null
            this.editedItem = Object.assign({}, this.defaultItem)
            this.dialog = true
        },
        editItem(item) {
            this.id = item.id
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.id = item.id
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        async deleteItemConfirm() {
            /*
            this.$axios.delete('admin/exchanges/' + this.id).then((res) => {
              this.snackbarText = res.data.message
              this.snackbar = true
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              this.isLoading = false
              this.closeDelete()
            })
            */
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.id = null
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.id = null
            })
        }
    }
}
</script>
