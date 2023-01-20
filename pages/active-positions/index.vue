<template>
<v-row>
    <v-dialog v-model="showAddBot" max-width="600">
        <template>
            <ModalsBotSetup @close-modal="closeModal" />
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
            <div class="d-flex my-2">
                <v-btn small @click="_fetchApi">x-fetch</v-btn>
                <v-btn class="ml-2" small @click="_disconnectSocket">disconnect socket</v-btn>
                <v-btn class="ml-2" small color="primary" @click="_auth">auth</v-btn>
            </div>
            <v-data-table @click:row="_onSelectPair" :headers="headers" :items="activePosition" :loading="isLoading" class="elevation-0" loading-text="Loading... Please wait">
                <template v-slot:top>
                    <v-row>
                        <v-col cols="4">
                            <GlobalsExchangeList class="mb-3" />
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
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:item.pair="{item}">
                    <v-row>
                        <v-col cols="12" class="d-flex align-center justify-start">
                            <img style="width:28px;" :alt="item.logo" :src="require(`~/assets/token_logo/${item.pair_from.toUpperCase()}.png`)" />
                            <div class="d-flex flex-column ml-3">
                                <div class="d-flex">
                                    <strong>{{item.pair_from}}</strong>
                                    <strong>{{item.pair_from}}</strong>
                                    <span>/ AWDAWDIAJWODAWO IDJAWDOIAWJ{{item.pair_to}}</span>
                                </div>
                                <span>0</span>
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
                        <strong>{{pnl}}%</strong>
                        <!-- <strong v-if="parseFloat(item.profit.percentage) < 0">{{item.profit.percentage}}%</strong> -->
                        <!-- <strong v-else>{{item.profit.percentage}}%</strong> -->
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

<script>
import {
    mapActions
} from 'vuex';

export default {
    layout: 'account',
    components: {},
    data() {
        return {
            title: 'Active Position',
            dialog: false,
            dialogDelete: false,
            pnl: 0,
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
            isLoading: false,
            listener: null,
            snackbar: false,
            snackbarText: 'My timeout is set to 2000.',
            snackbarTimeout: 5000,

            // MODAL ADD EXCHANGE
            showAddBot: false,

            // MODAL SHOW ACTIVE POSITION
            selectedPair: null,
            showActivePosition: false,

            // ACTIVE POSITION FROM STORE
            activePosition: []
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
    async beforeMount() {

    },
    async mounted() {
        let userId = this.$store.state.authUser.uid;
        this.$socket.on('position', (data) => {
            this.pnl = data.value;
        })
        this.$socket.on('current_price', (data) => {})
        this.$store.commit('setTitle', this.title)
        const exchanges = []
        for (let i = 0; i < 5; i++) {
            exchanges.push({
                id: i,
                pair: "ETH/USDT",
                price: "$1200",
                change: "+2.1%",
                created_at: this.$moment(new Date()).format('DD/MM/YYYY HH:mm'),
                total: "+37%",
                status: "On Position"
            })
        }
        this.items = exchanges
        await this._fetchPosition();
    },
    beforeDestroy() {
        // this.listener()
    },
    methods: {
        // FETCHING FROM STORE
        ...mapActions("position", ["fetchPosition"]),
        async _fetchPosition() {
            this.activePosition = await this.fetchPosition();
            console.log('activePosition', this.activePosition);
        },

        async _fetchApi() {
            let res = await this.$api.$get('/test');
            console.log(res);
        },

        async _disconnectSocket() {
            console.log("disconnect");
            this.$socket.removeAllListeners("position");
        },
        async _auth() {
            console.log('auth');
            console.log(this.$store.state.authUser);
            let res = await this.$api.$get('/test');
            console.log(res);
            this.$store.commit('setIsLoading', true);
            setTimeout(() => {
                this.$store.commit('setIsLoading', false);
            }, 5000)
        },

        // LISTENER
        closeModal(val) {
            this.showAddBot = val;
        },
        // END OF LISTENER

        // TRIGGER
        _onSelectPair(val) {
            this.selectedPair = val;
            this.showActivePosition = true;
        },

        _addBot() {
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

<style scoped>
table {
    display: none;
}
</style>
