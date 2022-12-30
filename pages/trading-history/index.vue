<template>
<v-row>
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
                                <v-select :items="availablePair" label="Filter Pair" dense outlined></v-select>
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
                        <v-data-table v-if="item == 'Trading Report'" :headers="tradingHeaders" :items="tradingItems" hide-default-footer class="elevation-2 my-2">
                            <template v-slot:item.pair="{item}">
                                <v-row>
                                    <v-col cols="12" class="d-flex align-center justify-start">
                                        <img style="width:28px;" :alt="item.logo" :src="require(`~/assets/token_logo/${item.logo}`)" />
                                        <div class="d-flex flex-column ml-3">
                                            <div class="d-flex flex-column">
                                                <span>{{item.pair}}</span>
                                                <small>{{item.id}}</small>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:item.type="{item}">
                                <v-chip small v-if="item.type == 'buy'" color="success">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
                                <v-chip small v-else color="danger" class="white--text">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
                            </template>
                            <template v-slot:item.desc="{item}">
                                <div class="d-flex">
                                    <!-- <v-chip small v-if="item.type == 'buy'" color="info">
                                    </v-chip> -->
                                    <div v-if="item.type == 'buy'" class="d-flex flex-column">
                                        <small>{{item.type.toUpperCase() == 'BUY' ? 'Step' : null}}</small>
                                        <span style="font-weight:bold;">
                                            {{item.desc}}
                                        </span>
                                    </div>
                                    <div v-else class="d-flex flex-column">
                                        <small>{{item.type.toUpperCase() == 'SELL' ? 'Profit' : null}}</small>
                                        <span style="font-weight:bold;">
                                            {{item.desc}}
                                        </span>
                                    </div>
                                    <!-- <v-chip small v-if="item.type == 'sell'" color="info">
                                        Profit - {{item.desc}}
                                    </v-chip> -->
                                </div>
                            </template>
                        </v-data-table>
                        <v-data-table v-else-if="item == 'Claim Reward'" :headers="claimHeaders" :items="claimItems" hide-default-footer class="elevation-2 ma-5 mb-10">
                            <template v-slot:item.amount="{item}">
                                <span style="color:green; font-weight:bold;">{{item.amount}}</span>
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
                'Trading Report'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in',
            title: 'Transaction Report',
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
                    text: "Pair",
                    align: "start",
                    value: "pair"
                },
                {
                    text: "Type",
                    align: "start",
                    value: "type"
                },
                {
                    text: "Date",
                    align: "start",
                    value: "date"
                },
                {
                    text: "Desc",
                    align: "start",
                    value: "desc",

                },
                {
                    text: "Price",
                    align: "center",
                    value: "price",
                    cellClass: "font-weight-bold"

                },
                {
                    text: "Qty",
                    align: "center",
                    value: "qty",
                    cellClass: "font-weight-bold"

                },
            ],
            // ID, Type, Date, Profit, Price, Qty
            tradingItems: [{
                    id: "#10001",
                    pair: "ETH/USDT",
                    type: "buy",
                    date: "12-11-2022 ",
                    desc: "6",
                    price: "0.2068",
                    qty: "136",
                    logo: "polygon.png"
                },
                {
                    id: "#10002",
                    pair: "ETH/USDT",
                    type: "buy",
                    date: "12-11-2022",
                    desc: "2",
                    price: "0.2068",
                    qty: "136",
                    logo: "celer.png"
                },
                {
                    id: "#10003",
                    pair: "ETH/USDT",
                    type: "sell",
                    date: "12-11-2022",
                    desc: "0.3672",
                    price: "0.2068",
                    qty: "136",
                    logo: "cronos.png"
                },
                {
                    id: "#10004",
                    pair: "ETH/USDT",
                    type: "sell",
                    date: "12-11-2022",
                    desc: "0.3672",
                    price: "0.2068",
                    qty: "136",
                    logo: "polygon.png"
                },
                {
                    id: "#10005",
                    pair: "ETH/USDT",
                    type: "buy",
                    date: "12-11-2022",
                    desc: "3",
                    price: "0.2068",
                    qty: "136",
                    logo: "polygon.png"
                },

            ],
            claimHeaders: [{
                    text: "Date",
                    align: "start",
                    value: "date"
                },
                {
                    text: "Description",
                    align: "start",
                    value: "description",

                },
                {
                    text: "Reward Claimed",
                    align: "center",
                    value: "amount",
                    cellClass: "font-weight-bold"

                }
            ],
            claimItems: [{
                    date: '12-11-2022',
                    description: 'Lorem Ipsum',
                    amount: '$10'
                },
                {
                    date: '25-11-2022',
                    description: 'Lorem 2',
                    amount: '$15'
                },
                {
                    date: '02-12-2022',
                    description: 'Ipsum',
                    amount: '$12'
                },
                {
                    date: '12-12-2022',
                    description: 'Lorem 3',
                    amount: '$13'
                },
                {
                    date: '20-12-2022',
                    description: 'Lorem Ipsum',
                    amount: '$114'
                },
            ],
            refferalId: "123XYZ",
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    mounted() {
        this.$store.commit('setTitle', this.title)
    },
    methods: {
        closeModal() {
            alert('closeModal')
        }
    }
}
</script>
