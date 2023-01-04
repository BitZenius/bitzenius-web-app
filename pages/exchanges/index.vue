<template>
<v-row>
    <v-dialog v-model="showAddExchange" max-width="600">
        <template>
            <ModalsExchangeSetup @close-modal="closeModal" />
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
                <template v-slot:item.status="{ item }">
                    <v-chip small :color="item.is_active ? 'success' : 'grey'" dark label>
                        {{ item.status }}
                    </v-chip>
                </template>
                <template v-slot:item.created_at="{item}">
                    {{$moment(item.created_at).format("DD/MM/YYYY HH:mm")}}
                </template>
                <template v-slot:top>
                    <div>
                        <v-btn
                            color="primary"
                            class="mb-5 elevation-0"
                            :disabled="!user.subscription"
                            @click="_addExchange"
                        >
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Add Exchange
                        </v-btn>
                        <Form :id="id" :data="editedItem" :dialog.sync="dialog" />
                        <v-dialog v-model="dialogDelete" max-width="290px" persistent>
                            <v-card>
                                <v-card-title class="headline">
                                    Delete Confirmation
                                </v-card-title>
                                <v-card-text>
                                    Are you sure you want to delete this admin?
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="blue darken-1" text @click="closeDelete">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                                        OK
                                    </v-btn>
                                    <v-spacer />
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon class="mr-2" @click="editItem(item)">
                        mdi-cog
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
    filters: {
        moment(val) {
            console.log('moment', this.$moment(new Date).format('DD/MM/YYYY'));
            console.log('val',val)
            // return this.$moment(val).format('DD/MM/YYYY');
        }
    },
    data() {
        return {
            title: 'My Exchanges',
            dialog: false,
            dialogDelete: false,
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
            showAddExchange: false,
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
        console.log('moment', this.$moment(new Date).format('DD/MM/YYYY'));
        this._fetchExchanges()
        this.$store.commit('setTitle', this.title)
        this.listener = this.$fire.firestore.collection('user_exchanges').orderBy('created_at', 'desc').onSnapshot((onResult, onError) => {
            if (onResult.size > 0) {
                const exchanges = []
                onResult.docs.forEach((doc) => {
                    exchanges.push({
                        ...doc.data(),
                        id: doc.id,
                        created_at: this.$moment(doc.data().created_at).format('DD/MM/YYYY HH:mm')
                    })
                })
                this.items = exchanges
            }
        })
    },
    beforeDestroy() {
        this.listener()
    },
    methods: {
        // FETCH API
        async _fetchExchanges() {
            console.log("FETCHING DATA EXCHANGES");
            let res = await this.$api.$get('/user/exchange');
            this.items = res.data;
            console.log(res);
        },

        // LISTENER
        closeModal(val) {
            this.showAddExchange = val;
            this._fetchExchanges()
        },
        // END OF LISTENER
        // TRIGGER
        _addExchange() {
            this.showAddExchange = true;
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
