<template>
<v-row>
    <v-dialog v-model="showAddBot" max-width="600">
        <template>
            <ModalsBotSetup @close-modal="closeModal" />
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
            <v-data-table :headers="headers" :items="items" :loading="isLoading" class="elevation-0" loading-text="Loading... Please wait">
                <template v-slot:item.created_at="{item}">
                    {{$moment(item.created_at).format("DD/MM/YYYY HH:mm")}}
                </template>
                <template v-slot:item.status="{ item }">
                    <span v-if="item.active == true" class="success--text">
                        ON
                    </span>
                    <span v-else class="danger--text">
                        OFF
                    </span>
                </template>
                <template v-slot:item.strategy="{ item }">
                    <span style="font-weight:bold;">{{item.analysis.indicators.length>0 ? item.analysis.indicators[0].indicator : ''}} {{item.analysis.condition == "AND" ? "&" : "/"}} {{item.analysis.indicators.length > 1 ?item.analysis.indicators[1].indicator : ''}}</span>
                </template>
                <template v-slot:top>
                    <div>
                        <v-btn color="primary" class="mb-5 elevation-0" @click="_addBot">
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Add Bot
                        </v-btn>
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
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon class="mr-2" @click="_addBot">
                        mdi-pencil
                    </v-icon>
                    <v-icon @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
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
import Form from './form'
export default {
    layout: 'account',
    components: {
        Form
    },
    data() {
        return {
            title: 'Bots',
            dialog: true,
            dialogDelete: false,
            headers: [{
                    text: 'Exchange',
                    value: 'selected_exchange'
                },
                {
                    text: 'Created Date',
                    value: 'created_at'
                },
                {
                    text: 'Strategy',
                    value: 'strategy'
                },
                {
                    text: 'Total P and L',
                    value: 'total'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
                {
                    text: '',
                    value: 'actions',
                    sortable: false
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
    mounted() {
        this._fetchBotsList();
        this.$store.commit('setTitle', this.title)
    },
    beforeDestroy() {
        // this.listener()
    },
    methods: {
        //FETCH API
        async _fetchBotsList() {
            console.log("FETCHING DATA USER BOT");
            let res = await this.$api.$get('/user/bot');
            this.items = res.data;
            console.log(res);
        },

        // LISTENER
        closeModal(val) {
            this.showAddBot = val;
            this._fetchBotsList();
        },
        // END OF LISTENER

        // TRIGGER
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
