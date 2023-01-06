<template>
<v-row>
    <v-dialog v-if="showAddBot" v-model="showAddBot" max-width="600">
        <template>
            <ModalsBotSetup :bot-prop="selectedBot" :exchange="selectedExchange"  @close-modal="closeModal" />
        </template>
    </v-dialog>
    <v-dialog v-model="showActivePosition" max-width="600">
        <template>
            <ModalsActivePosition :pair="selectedPair" @close-modal="closeModal" />
        </template>
    </v-dialog>

    <v-col cols="12">
        <v-card class="pa-8" elevation="8">
            <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" dark bottom color="success" elevation="15">
                {{ snackbarText }}
                <template v-slot:action="{ attrs }">
                    <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
            <v-data-table @click:row="_onSelectPair" :headers="headers" :items="activePosition" :loading="isLoading" class="elevation-0" loading-text="Loading... Please wait">
                <template v-slot:top>
                    <div class="mb-5">
                        <v-row>
                            <v-col col="12" class="d-flex justify-center align-center">
                                <p class="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At repellendus dicta ipsam ratione necessitatibus, in dolore modi ut eveniet consectetur similique cumque, quo impedit earum quae, molestias optio doloremque autem!</p>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col v-for="(exchange, index) in exchanges" :key="index" sm="6" md="4" lg="3">
                                <!-- <v-btn small @click="_loggerExchange(exchange)">logger</v-btn> -->
                                <v-card @click="selectExchangeCard(`${exchange.name}`, index)" style="position:relative;" :class="{'d-flex align-center justify-center exchange-active': exchange.selected, 'd-flex align-center justify-center': !exchange.selected}" elevation="3">
                                    <div v-if="exchange.selected" class="exchange-selected">
                                        Selected
                                    </div>
                                    <v-row>
                                        <v-col sm="12" md="4" class="d-flex align-center justify-start">
                                            <img style="width:100px; padding:25px;" :src="exchange.image" alt="">
                                        </v-col>
                                        <v-col sm="12" md="8" class="d-flex flex-column justify-center align-center">
                                            <h4>{{exchange.name}}</h4>
                                            <v-btn v-if="exchange.active" small class="primary" @click="_addBot(exchange)">Active Bot</v-btn>
                                            <v-btn v-else class="default" small @click="_addBot(exchange)">Setup Bot</v-btn>
                                        </v-col>
                                    </v-row>

                                </v-card>
                            </v-col>
                        </v-row>
                        <!-- <v-btn color="primary" class="mb-5 elevation-0" @click="_addBot">
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Add Bot
                        </v-btn> -->
                        <v-dialog v-model="dialogDelete" max-width="400px" persistent>
                            <v-card>
                                <v-card-title class="headline">
                                    Delete Bot Confirmation
                                </v-card-title>
                                <v-card-text>
                                    Are you sure you want to delete this bot setup?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="blue darken-1" text @click="closeDelete">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="primary" @click="deleteItemConfirm">
                                        OK
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                    <!-- <div>
                        <v-row>
                            <v-col cols="12">
                                <span v-if="selectedExchangeReport" class="exchange-table-selected">
                                    {{selectedExchangeReport}} Active Positions
                                </span>
                            </v-col>
                        </v-row>
                    </div> -->
                </template>
                <template v-slot:item.pair="{item}">
                    <v-row>
                        <v-col cols="12" class="d-flex align-center justify-start">
                            <!-- <img style="width:28px;" :alt="item.logo" :src="require(`~/assets/token_logo${item.logo}`)" /> -->
                            <div class="d-flex flex-column ml-3">
                                <div class="d-flex">
                                    <strong>{{item.pair_from}} </strong>
                                    <span>&nbsp;/ {{item.pair_to}}</span>
                                </div>
                                <span>{{item.quantity}}</span>
                            </div>
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:item.price="{item}">
                    <div class="d-flex flex-column align-center justify-center">
                        <strong>{{item.price.value}}</strong>
                        <span v-if="parseFloat(item.price.percentage) < 0" class="danger--text">{{item.price.percentage}}%</span>
                        <span v-else class="success--text">{{item.price.percentage}}%</span>
                    </div>
                </template>
                <template v-slot:item.profit="{item}">
                    <div class="d-flex flex-column align-center justify-center">
                        <!-- <code>{{item.profit}}</code> -->
                        <strong class="danger--text" v-if="item.status == 'Active' && parseFloat(item.profit.percentage) < 0">{{item.profit.percentage}}%</strong>
                        <strong class="success--text" v-if="item.status == 'Active' && parseFloat(item.profit.percentage) > 0">{{item.profit.percentage}}%</strong>
                        <strong class="primary--text" v-if="item.status == 'Inactive' || parseFloat(item.profit.percentage) == 0">0%</strong>

                        <span v-if="parseFloat(item.profit.value) < 0" class="danger--text">{{item.profit.value}} USDT</span>
                        <span v-else class="success--text">{{item.profit.value}} USDT</span>
                    </div>
                </template>
                <template v-slot:item.status="{ item }">
                    <v-chip small :color="item.status == 'Active' ? 'success' : 'grey'" dark label>
                        {{ item.status }}
                    </v-chip>
                </template>
                <template v-slot:no-data>
                    <p>No record available!</p>
                </template>
            </v-data-table>
        </v-card>
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

.exchange-active {
    outline: 2px solid #17576a;

}
</style>

<script>
import io from 'socket.io-client'
import {
    mapActions
} from 'vuex';

import Form from './form'
export default {
    layout: 'account',
    components: {
        Form
    },
    data() {
        return {
            title: 'Automated Bots',
            dialog: true,
            dialogDelete: false,
            // START OF CARD EXCHANGE
            selectedExchange:null,
            selectedExchangeReport: null,
            exchanges: [{
                    name: "Binance",
                    selected: true,
                    active: false,
                    image: "/exchange_logo/binance.png"
                },
                {
                    name: "Tokocrypto",
                    selected: false,
                    active: false,
                    image: "/exchange_logo/tokocrypto.png"
                }
            ],
            selectedBot:null,
            userExchanges: [],
            // END OF CARD EXCHANGE


            headers: [{
                    text: 'Name/Qty',
                    value: 'pair',
                    align: 'start'
                },
                {
                    text: 'Price/24H Change',
                    value: 'price',
                    align: 'center'

                },
                {
                    text: 'Profit/Floating',
                    value: 'profit',
                    align: 'center'

                },
                {
                    text: 'Status',
                    value: 'status',
                    align: 'center'
                }
            ],

            items: [],
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
            snackbar: false,
            snackbarText: 'My timeout is set to 2000.',
            snackbarTimeout: 5000,

            // MODAL ADD EXCHANGE
            isLoading: false,

            listener: null,
            pnl: 0,
            dialog: false,
            dialogDelete: false,
            showAddBot: false,

            // ACTIVE POSITIONS
            // MODAL ADD EXCHANGE
            showAddBot: false,

            // MODAL SHOW ACTIVE POSITION
            selectedPair: null,
            showActivePosition: false,

            // ACTIVE POSITION FROM STORE
            activePosition: [],
            socket: null,
            // END OF DATA
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
    async mounted() {
        this.$store.commit('setTitle', this.title)

        // START CONNECT TO SOCKET IO
        let token = await this.$store.$fire.auth.currentUser.getIdToken()
        this.socket = io(process.env.SERVER, {
            path: "/active-position",
            query: {
                controller_id: "BZController-a18c3b44",
                bearer_token: token
            }
        });
        let userId = this.$store.state.authUser.uid;
        this.socket.on('positions', (data) => {
            this.activePosition = data;
        })
        this.socket.on('current_price', (data) => {
            let index = this.activePosition.findIndex(b => b.symbol === data.name);
            this.activePosition[index].price.value = data.priceValue;
            this.activePosition[index].profit.value = data.pnl;
            this.activePosition[index].profit.percentage = data.pnlPercentage;
            this.activePosition[index].quantity = data.quantity;
        })

        // END OF CONNECT TO SOCKET IO
        this._fetchBotsList();
    },
    beforeDestroy() {
        this.socket.emit("disconnect-client", {
            ok: "unsubs from bots"
        });
    },
    methods: {
        ...mapActions("position", ["fetchPosition"]),

        async _disconnectSocket() {
            console.log("disconnect");
            this.$socket.removeAllListeners("position");
        },
        //FETCH API
        async _fetchBotsList() {
            let res = await this.$api.$get('/user/bot');
            let userExchanges = res.data;
            console.log("USER_EXCHANGES", userExchanges);
            if (userExchanges.length > 0) {
                userExchanges.forEach((exchange) => {
                    let exchangeIndex = this.exchanges.findIndex(e => e.name == exchange.selected_exchange);
                    this.exchanges[exchangeIndex].data = exchange;
                    this.exchanges[exchangeIndex].active = true;
                    this.exchanges[exchangeIndex].id = exchange._id;
                })
            }
        },

        // LISTENER
        closeModal(val) {
            this.showAddBot = val;
            this._fetchBotsList();
        },
        // END OF LISTENER

        // LOGGER
        _loggerExchange(val) {
            console.log(val);
        },

        // TRIGGER
        selectExchangeCard(val, index) {
            this.selectedExchangeReport = val;
            for (let i = 0; i < this.exchanges.length; i++) {
                this.exchanges[i].selected = false
            }
            this.exchanges[index].selected = true;
        },
        _onSelectPair(val) {
            this.selectedPair = val;
            this.showActivePosition = true;
        },

        _addBot(val) {
            this.$store.commit('exchange/setSelectedExchange', val.name);
            this.selectedExchange = val.name;
            if(val.active){
                this.selectedBot = val.data
            }else{
                this.selectedBot = null;
            }
            this.showAddBot = true;
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
