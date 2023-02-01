<template>
<v-row>
    <v-dialog persistent v-if="showAddBot" v-model="showAddBot" max-width="600">
        <template>
            <ModalsBotSetup :bot-prop="selectedBot" :exchange="selectedExchange" @close-modal="closeModal" />
        </template>
    </v-dialog>
    <v-dialog persistent v-if="showActivePosition" v-model="showActivePosition" max-width="600">
        <template>
            <ModalsActivePosition :detail="botsDetail" :pair="selectedPair" @close-modal="closeModal" />
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
    <!-- <v-col cols="12" class="d-flex justify-center align-center">
        <p class="text-center text-info primary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At repellendus dicta ipsam ratione necessitatibus, in dolore modi ut eveniet consectetur similique cumque, quo impedit earum quae, molestias optio doloremque autem!</p>
    </v-col> -->
    <v-col cols="12" class="d-flex px-0 pt-0">
        <v-col v-for="(exchange, index) in exchanges" :key="index" sm="6" md="4" lg="3">
            <!-- <v-btn small @click="logger()">logger</v-btn> -->
            <v-card @click="selectExchangeCard(`${exchange.name}`, exchange, index)" style="position:relative; height:110px;" :class="{'d-flex align-center justify-center exchange-active': exchange.selected, 'd-flex align-center justify-center': !exchange.selected}" elevation="3">
                <div v-if="exchange.selected" class="exchange-selected">
                    Selected
                </div>
                <div v-if="exchange.active">
                    <v-btn x-small icon fab class="danger white--text delete-button" @click="_deleteBot(exchange)">X</v-btn>
                </div>
                <v-row>
                    <v-col sm="12" md="4" class="d-flex align-center justify-start">
                        <img style="width:100px; padding:25px;" :src="exchange.image" alt="">
                    </v-col>
                    <v-col sm="12" md="8" class="d-flex flex-column justify-center align-center">
                        <h4>{{exchange.name}}</h4>
                        <div v-if="exchange.active" class="d-flex justify-center">
                            <v-btn :disabled="!user.subscription || user.subscription == false" small outlined color="primary" class="mr-2" @click="_addBot(exchange)">Edit Bot</v-btn>
                        </div>
                        <v-btn :disabled="!user.subscription || user.subscription == false" v-else color="primary" small @click="_addBot(exchange)">Setup Bot</v-btn>
                    </v-col>
                </v-row>
                <v-overlay v-if="exchange.comingsoon" z-index="1" :absolute="true" opacity="0.7" overlay="true">
                    <h3 style="letter-spacing:2px;" class="customYellow--text">Coming Soon!</h3>
                </v-overlay>
            </v-card>
        </v-col>
    </v-col>
    <v-col cols="12">
        <v-card class="pa-8" elevation="8">
            <v-row class="mb-3">
                <v-col cols="12" md="4">
                    <v-text-field prepend-icon="mdi-magnify" v-model="searchQuery" label="Search By Pair" placeholder="Search By Pair" outlined dense></v-text-field>
                </v-col>
            </v-row>
            <v-data-table style="overflow-y:scroll; height:50vh; overflow-x:hidden;" @click:row="_onSelectPair" disable-pagination :hide-default-footer="true" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :headers="headers" :items="activePositionFiltered" :loading="isLoading" class="elevation-0" loading-text="Loading... Please wait">
                <!-- hide-default-footer disable-pagination -->
                <template v-slot:top>
                    <div>
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
                            <v-img style="width:28px !important;" @error="errorHandler" max-width="28" :alt="item.logo" :src="getImgUrl(item.pair_from)" ></v-img>
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
                        <!-- <code>{{item.status}}</code> -->
                        <strong class="danger--text" v-if="item.status == 'ACTIVE' && parseFloat(item.profit.percentage) < 0">{{item.profit.percentage}}%</strong>
                        <strong class="success--text" v-if="item.status == 'ACTIVE' && parseFloat(item.profit.percentage) > 0">{{item.profit.percentage}}%</strong>
                        <strong class="primary--text" v-if="item.status == 'INACTIVE' || item.status == 'WAITING_POSITION' || parseFloat(item.profit.percentage) == 0">0%</strong>

                        <span v-if="parseFloat(item.profit.value) < 0" class="danger--text">{{item.profit.value}} USDT</span>
                        <span v-else class="success--text">{{item.profit.value}} USDT</span>
                    </div>
                </template>
                <template v-slot:item.status="{ item }">
                    <v-chip v-if="item.status == 'WAITING_POSITION'" class="black--text" small color="customYellow black--text" dark label>
                        Waiting for Position
                    </v-chip>
                    <v-chip v-if="item.status == 'ACTIVE'" small class="black--text" color="customGreen" dark label>
                        Active
                    </v-chip>
                    <v-chip v-if="item.status == 'INACTIVE'" small color="grey" dark label>
                        Inactive
                    </v-chip>
                    <v-chip v-if="item.status == 'BLACKLISTED'" small color="red" dark label>
                        Blacklisted
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
    background: #3394F8;
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
    outline: 2px solid #3394F8;
}

.delete-button {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 0.8rem;
}

.text-info {
    background: #177e89;
    color: white;
    border-radius: 10px;
    padding: 13px 10px;
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
            selectedExchange: null,
            selectedExchangeReport: null,
            exchangeName: "Binance",
            exchanges: [{
                    name: "Binance",
                    selected: true,
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
            selectedBot: null,
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

            // ACTIVE POSITIONS
            // MODAL ADD EXCHANGE
            showAddBot: false,

            // MODAL SHOW ACTIVE POSITION
            botsDetail: null,
            selectedPair: null,
            showActivePosition: false,

            // ACTIVE POSITION FROM STORE
            activePosition: [],
            socket: null,

            // SELECT TO DELETE
            selectToDelete: null,

            // SEARCH
            searchQuery: null,

            // SORTING
            sortBy: null,
            sortDesc: null,
            availablePair: [],
            availableSorting: [{
                id: "symbol",
                name: "Trading Pair"
            }],
            pairSelected: null,
            sortSelected: null,
            ascending: false,
            descending: false,

            listOfSockets: []
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
        },
        activePositionFiltered() {
            let temp = this.activePosition;
            if (this.searchQuery != '' && this.searchQuery) {
                temp = temp.filter((position) => {
                    return position.symbol
                        .toUpperCase()
                        .includes(this.searchQuery.toUpperCase())
                })
            }
            if (this.sortBy) {
                if (this.sortBy == 'pair') {
                    // sortBy = 'symbol'
                    temp = this.sortDesc ? temp.sort((a, b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0)) : temp.sort((a, b) => (a.symbol < b.symbol) ? 1 : ((b.symbol < a.symbol) ? -1 : 0))
                } else if (this.sortBy == 'price') {
                    temp = this.sortDesc ? temp.sort((a, b) => (a.price.value > b.price.value) ? 1 : ((b.price.value > a.price.value) ? -1 : 0)) : temp.sort((a, b) => (a.price.value < b.price.value) ? 1 : ((b.price.value < a.price.value) ? -1 : 0))
                } else if (this.sortBy == 'profit') {
                    temp = this.sortDesc ? temp.sort((a, b) => (a.profit.value > b.profit.value) ? 1 : ((b.profit.value > a.profit.value) ? -1 : 0)) : temp.sort((a, b) => (a.profit.value < b.profit.value) ? 1 : ((b.profit.value < a.profit.value) ? -1 : 0))
                } else {
                    temp.sort((a, b) => {
                        if (a.status > b.status) return 1;
                        if (a.status < b.status) return -1;
                        return 0;
                    });
                }
            } else {
                temp.sort((a, b) => {
                    if (a.status > b.status) return 1;
                    if (a.status < b.status) return -1;
                    return 0;
                });
            }

            return temp
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
        console.log("USER!!", this.user);
        this.$store.commit('setTitle', this.title);
        let userId = this.$store.state.authUser.uid;
        this._fetchBotsList("Binance"); // Fetch Bots List
        this._fetchUserExchange(); // Fetch User Exchang
        // END OF CONNECT TO SOCKET IO
    },
    unmounted() {},
    beforeDestroy() {
        this.socket.disconnect();
        // this.socket.emit("disconnect-client", {
        //     ok: "unsubs from bots"
        // });
    },
    methods: {
        ...mapActions("position", ["fetchPosition"]),
        getImgUrl(val){
            try{
                let url = require('@/static/token_logo/'+val.toUpperCase()+'.png');
                return '/token_logo/'+val.toUpperCase()+'.png'
            }catch(err){
                console.log('img not exist', val)
                return '/token_logo/default.png'
            }
        },
        errorHandler(event){
            event.target.src = '/token_logo/default.png'
        },
        _sort() {
            console.log(this.activePositionFiltered);
        },
        test() {
            this.activePosition.sort((a, b) => {
                return a.profit.value - b.profit.value;
            })
        },
        async _disconnectSocket() {
            console.log("disconnect");
            this.$socket.removeAllListeners("position");
        },
        //FETCH API
        async _listenPosition() {
            this.isLoading = true;
            this.socket.on('positions', (data) => {
                this.activePosition = data.data;
                this.availablePair = data.pairs;
            })
        },
        async _fetchUserExchange() {
            let res = await this.$api.$get('/user/bot', {});
            console.log('fetchUSerExchange', res);
            if (res.data.length > 0) {
                let setups = res.data;
                let availableExchangeSetups = [];
                res.data.forEach((val) => {
                    availableExchangeSetups.push(val.selected_exchange);
                })

                this.userExchanges = res.data;
                this.exchanges.forEach((exchange) => {
                    let indexOf = availableExchangeSetups.indexOf(exchange.name);
                    console.log(`indexOf: ${indexOf} ${exchange.name}`, res.data[indexOf]);
                    if (indexOf >= 0){
                         exchange.active = true;
                         exchange.data = res.data[indexOf];
                    }
                });
            } else {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "You don't have any bot setup active",
                    color: "customPink"
                })
            }
        },
        streamBinance(){
            this.socket = io(process.env.SERVER, {
                path: "/binance-proxy",
                query: {}
            });

            this.socket.on('binance_ticker', (msg) => {
                let array = JSON.parse(msg);
                array.forEach((data)=>{
                    let index = this.activePosition.findIndex(b => b.symbol == data.s);
                    if (index < 0) return;
                    this.activePosition[index].price.value = data.c;
                    this.activePosition[index].price.percentage = data.P;

                    // PNL CALCULATION
                    if(this.activePosition[index].quantity > 0){
                        // AVERAGE  = TOTAL AMOUNT USD / TOTAL QUANTITY (depends on the positions array);
                        // data.c   = Current Price (from binance stream)
                        let average = parseFloat(this.activePosition[index].average);
                        let percentage = average == 0 ? 0 : (((parseFloat(data.c) - average) / average));
                        let pnl = parseFloat(this.activePosition[index].amountUsd) * percentage;
                        this.activePosition[index].profit.value = pnl.toFixed(3);
                        let convertPercentage = percentage * 100;
                        this.activePosition[index].profit.percentage = convertPercentage.toFixed(3);
                    }
                })
            })
        },
        async _fetchBotsList(exchangeName) {
            this.isLoading = true;
            if(this.socket) this.socket.disconnect();
            await this.streamBinance();

            let res = await this.$api.$get('/user/bot-user', {
                params: {
                    exchange: exchangeName
                }
            });

            this.activePosition = res.data;
            this.availablePair = res.pairs;
            this.isLoading = false;
        },
        async _fetchPosition(sorting) {
            let exchange = this.selectedExchangeReport;
            let symbol = this.pairSelected;
        },

        // LISTENER
        closeModal(val) {
            console.log('val close modal', val);
            this.showAddBot = val;
            this.showActivePosition = val;
        },
        // END OF LISTENER

        // LOGGER
        logger() {
            console.log(this.userExchanges);
        },

        // TRIGGER
        async _deleteBot(val) {
            this.selectToDelete = val;
            this.dialogDelete = true;
        },
        selectExchangeCard(val, exchange, index) {
            if (exchange.comingsoon) return;

            this.selectedExchangeReport = val;
            for (let i = 0; i < this.exchanges.length; i++) {
                this.exchanges[i].selected = false
            }
            this.exchanges[index].selected = true;

            // RE-FETCH LIST
            this._fetchBotsList(val);
        },
        async _onSelectPair(val) {
            console.log('selectedPair', val);
            this.$store.commit('setIsLoading', true);
            let res = await this.$api.$get('/user/active-position-detail', {
                params: {
                    id: val._id
                }
            });
            try {
                console.log('resSelectPair', res);
                this.selectedPair = val;
                this.botsDetail = res.data;
                this.showActivePosition = true;
            } catch (error) {
                console.log(error);
                setTimeout(() => {
                    this.$store.commit('setShowSnackbar', {
                        show: true,
                        message: "Error get bot detail",
                        color: "customPink"
                    })
                })
            }

        },
        _addBot(val) {
            console.log('addBot', val);
            this.$store.commit('exchange/setSelectedExchange', val.name);
            this.selectedExchange = val.name;
            if (val.active) {
                this.selectedBot = val.data
            } else {
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
            this.$store.commit('setIsLoading', true);
            console.log(this.selectToDelete);
            let res = await this.$api.$delete('/user/bot', {
                params: {
                    id: val.id
                }
            });
            console.log(res);
            setTimeout(() => {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Bot Successfuly Deleted!",
                    color: "success"
                })
            })
            this.$store.commit('setIsLoading', false);
            this.dialogDelete = false;
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
