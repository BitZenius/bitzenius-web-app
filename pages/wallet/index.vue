<template>
<v-row>
    <v-col cols="12">
        <v-card class="d-flex flex-column" elevation="8">
            <v-row>
                <v-col class="d-flex flex-column justify-center" cols="6">
                    <h3 class="d-flex justify-center mb-2 mt-2">Wallet Information</h3>
                    <GlobalsAddBalance class="mx-3 py-5 mb-2" />
                    <v-btn class="mx-3" color="orange white--text">
                        Credit Withdrawal
                    </v-btn>
                </v-col>
                <v-col cols="6" class="d-flex justify-center align-center">
                    <img src="/transaction/trophy.png" alt="" />
                </v-col>
            </v-row>
        </v-card>
    </v-col>
    <v-col cols="12">
        <template>
            <v-card class="pa-3">
                <v-tabs v-model="currentItem">
                    <v-tab v-for="item in tables" :key="item">
                        <h4>{{item}}</h4>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="currentItem">
                    <v-tab-item v-for="item in tables" :key="item">
                        <v-row class="mt-1">
                            <v-col cols="12" md="4">
                                <v-select :items="availablePair" label="Filter" dense outlined></v-select>
                            </v-col>
                            <v-col cols="6" md="4">
                                <v-select :items="availableSorting" label="Sorting By" dense outlined></v-select>
                            </v-col>
                            <v-col cols="6" md="4" style="text-align:right;">
                                <v-btn class="default">
                                    <v-icon>
                                        mdi-chevron-up-circle-outline
                                    </v-icon>
                                </v-btn>
                                <v-btn class="ml-2 default">
                                    <v-icon>
                                        mdi-chevron-down-circle-outline
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-data-table v-if="item == 'Credit Report'" :headers="tradingHeaders" :items="tradingItems" hide-default-footer class="elevation-2 my-2">
                            <template v-slot:item.type="{item}">
                                <v-chip small v-if="item.type == 'Credit Trading Fee'" color="danger" class="white--text">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
                                <v-chip small v-else color="success" class="white--text">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
                            </template>
                            <template v-slot:item.usdt="{item}">
                                <div class="d-flex">
                                    <div class="d-flex flex-column">
                                        <span v-if="item.usdt > 0" class="success--text">
                                            {{item.usdt}}
                                        </span>
                                        <span v-else class="danger--text">
                                            {{item.usdt}}
                                        </span>
                                    </div>
                                </div>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </template>
    </v-col>
</v-row>
</template>

<script>
export default {
    layout: 'account',
    data() {
        return {
            currentItem: 'tab-Web',
            tables: [
                'Credit Report'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in',
            title: 'Wallet',
            availablePair: [
                "FTM/USDT",
                "BTC/USDT",
                "XRP/USDT"
            ],
            availableSorting: [
                "Date",
                "Type"
            ],
            showClaimRewardModal: false,
            referralTableHeaders: [{
                    text: "Title",
                    align: "start",
                    value: "title"
                },
                {
                    text: "Value",
                    align: "start",
                    value: "value",
                    cellClass: "font-weight-bold"
                },
            ],
            referralItems: [{
                    title: 'Total Deposit',
                    value: '$1000',
                    type: 'money'
                },
                {
                    title: 'Total Profit',
                    value: '$1200',
                    type: 'money'
                },
                {
                    title: 'Total Referral Reward',
                    value: "$120",
                    type: 'money'
                }
            ],
            // ID, Type, Date, Profit, Price, Qty
            tradingHeaders: [{
                    text: "Date",
                    align: "start",
                    value: "date"
                },
                {
                    text: "Desc",
                    align: "start",
                    value: "desc"
                },
                {
                    text: "USDT",
                    align: "start",
                    value: "usdt"
                },
                {
                    text: "Type",
                    align: "start",
                    value: "type",

                }
            ],
            // ID, Type, Date, Profit, Price, Qty
            tradingItems: [{
                    id: "#10001",
                    date: "22/12/2022 10:15:37",
                    desc: "Trading Fee for trading ID:#XX1001, pair BTC/USDT",
                    usdt: -0.1523,
                    type: "Credit Trading Fee",
                },
                {
                    id: "#10002",
                    date: "22/12/2022 10:15:37",
                    desc: "Trading Fee for trading ID:#XX1001, pair BTC/USDT",
                    usdt: -0.1523,
                    type: "Credit Trading Fee",
                },
                {
                    id: "#10003",
                    date: "22/12/2022 10:15:37",
                    desc: "Trading Fee for trading ID:#XX1001, pair BTC/USDT",
                    usdt: -0.1523,
                    type: "Credit Trading Fee",
                },
                {
                    id: "#10004",
                    date: "23/12/2022 10:15:37",
                    desc: "Deposit Credit",
                    usdt: 100,
                    type: "Deposit Credit",
                },
                {
                    id: "#10005",
                    date: "23/12/2022 10:15:37",
                    desc: "Trading Fee for trading ID:#XX1001, pair BTC/USDT",
                    usdt: -0.1523,
                    type: "Credit Trading Fee",
                },
            ],
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    mounted() {
        this.$store.commit('setIsLoading', true);
        this.$store.commit('setTitle', this.title);
        this.$store.commit('setIsLoading', false);
    },
    methods: {
        closeModal() {
            alert('closeModal')
        }
    }
}
</script>
