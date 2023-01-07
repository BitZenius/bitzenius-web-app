<template>
<v-row>
    <v-dialog v-model="showClaimRewardModal" max-width="600">
        <template>
            <BaseModal @close-modal="closeModal">
                <template v-slot:title>
                    Claim Reward Authentication
                </template>
                <template v-slot:body>
                    <div style="background:orange; padding:12px; border-radius:15px; color:white;" class="d-flex flex-column align-center justify-center">
                        <span>You're about to claim your referral reward</span>
                        <h2>$5000</h2>
                        <span>Please check your email address to verify the payment</span>
                    </div>
                </template>
            </BaseModal>
        </template>
    </v-dialog>
    <v-col cols="12">
        <v-card class="d-flex flex-column" elevation="8">
            <v-row>
                <v-col class="d-flex flex-column justify-center" cols="6">
                    <h3 class="d-flex justify-center mb-2 mt-4">Referral Status</h3>
                    <div class="ma-3">
                        <v-row>
                            <v-col cols="9" class="d-flex align-center justify-">
                                <v-text-field class="pa-2" disabled v-model="refferalId" label="My Referral ID" outlined></v-text-field>
                            </v-col>
                            <v-col cols="3" class="d-flex justify-end ">
                                <v-btn class="mr-2 mt-2" color="primary" style="height:54px; width:100%;">
                                    <span>Copy</span>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-data-table :headers="referralTableHeaders" :items="referralItems" hide-default-header hide-default-footer class="elevation-2 ma-2">
                            <template v-slot:item.value="{item}">
                                <span v-if="item.type != 'claimed'">{{item.value}}</span>
                                <span v-else style="color:green; font-weight:bold;">{{item.value}}</span>
                            </template>
                        </v-data-table>
                    </div>
                </v-col>
                <v-col cols="6" class="d-flex align-center">
                    <img style="width:100%;" src="/referral/illustration-john.png" alt="" />
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
                        <v-data-table v-if="item == 'Transaction'" :headers="transactionHeaders" :items="transactionItems" hide-default-footer class="elevation-2 ma-5 mb-10">
                            <template v-slot:item.type="{item}">
                                <v-chip small v-if="item.type == 'Sign Up'" color="orange" class="white--text">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
                                <v-chip small v-else color="success" class="white--text">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
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
                'Transaction'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in',
            title: 'Referral',
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
                    title: 'Total People Referred',
                    value: '50'
                },
                {
                    title: 'Total Claimed Rewards',
                    value: "$5000",
                    type: 'claimed'
                }
            ],
            transactionHeaders: [{
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
                    text: "Type",
                    align: "center",
                    value: "type",
                    cellClass: "font-weight-bold"

                },
                {
                    text: "",
                    align: "center",
                    value: "usdt",
                    cellClass: "font-weight-bold success--text",

                },
            ],
            transactionItems: [{
                    date: '12-11-2022',
                    description: 'User @simularca reffered using your code',
                    type: "Sign Up",
                    usdt: '$5'
                },
                {
                    date: '25-11-2022',
                    description: 'User @MrSandman reffered using your code',
                    type: "Subscribe",
                    usdt: '$5'
                },
                {
                    date: '02-12-2022',
                    description: 'User @crossx reffered using your code',
                    type: "Subscribe",
                    usdt: "$5"
                },
                {
                    date: '12-12-2022',
                    description: 'User @Tb reffered using your code',
                    type: 'Subscribe',
                    usdt: "$5"
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
