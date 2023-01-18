<template>
<div class="d-flex flex-column align-center">
    <h3 class="mb-1">Choose the Amount</h3>
    <!-- <v-btn small @click="_logger">logger</v-btn> -->
    <v-tooltip right color="success">
        <template v-slot:activator="{ on, attrs }">
            <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="7" md="7">
                    <v-text-field dense class="mt-2" v-model="strategy.usdt_to_apply" label="Total USDT To Apply" outlined></v-text-field>
                </v-col>
                <v-col v-bind="attrs" v-on="on" cols="5" md="5" class="mx-0">
                    <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                        <v-icon left>
                            mdi-currency-usd
                        </v-icon>
                        USDT
                    </v-chip>
                </v-col>
            </v-row>
        </template>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </v-tooltip>
    <v-tooltip right color="success">
        <template v-slot:activator="{ on, attrs }">
            <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="7" md="7">
                    <v-text-field ref="usdt_per_order" @blur="onUsdtPerOrderChanged(strategy.usdt_per_order)" number dense class="mt-2" v-model="strategy.usdt_per_order" label="USDT Per Order" outlined></v-text-field>
                </v-col>
                <v-col v-bind="attrs" v-on="on" cols="5" md="5" class="mx-0">
                    <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                        <v-icon left>
                            mdi-currency-usd
                        </v-icon>
                        USDT
                    </v-chip>
                </v-col>
            </v-row>
        </template>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </v-tooltip>
    <v-tooltip right color="success">
        <template v-slot:activator="{ on, attrs }">
            <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                <v-col cols="7" md="7">
                    <v-text-field dense class="mt-2" v-model="strategy.max_concurrent_trading_pair" label="Maximum Concurrent Trading Pair" outlined></v-text-field>
                </v-col>
                <v-col v-bind="attrs" v-on="on" cols="5" md="5" class="mx-0">
                    <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                        <v-icon left>
                            mdi-currency-usd
                        </v-icon>
                        USDT
                    </v-chip>
                </v-col>
            </v-row>
        </template>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </v-tooltip>
    <v-tooltip v-if="strategy.style.name" right color="success">
        <template v-slot:activator="{ on, attrs }">
            <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%; height:73px;">
                <v-col cols="7" md="7" class="d-flex align-center justify-center">
                    <h3>Selected Strategy Style</h3>
                </v-col>
                <v-col v-bind="attrs" v-on="on" cols="5" md="5" class="mx-0">
                    <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                        {{strategy.style.name}}
                    </v-chip>
                </v-col>
            </v-row>
        </template>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    </v-tooltip>
    <h3 class="mt-3 pb-0">Choose the Strategy</h3>
    <v-row class="d-flex align-center justify-center pt-0 mt-0" style="width:100%;">
        <v-col cols="12" class="pt-0">
            <v-list>
                <v-list-group v-for="(item, i) in styleList" :key="item.name" v-model="item.active" no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <!-- :prepend-icon="{(item.yes == true) ? 'mdi-circle-outline' : 'mdi-percent'}" -->
                            <!-- <v-list-item-title v-text="item.name"></v-list-item-title> -->
                            <v-list-item-title>
                                <v-icon class="mr-2" small v-if="strategy.style.name == item.name">
                                    mdi-check-circle
                                </v-icon>
                                <v-icon class="mr-2" small v-else>
                                    mdi-circle-outline
                                </v-icon>
                                <span>{{item.name}}</span>
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item class="pl-6 pr-0">
                        <v-list-item-content>
                            <v-btn color="primary" @click="selectStyle(item)">Select Style</v-btn>
                            <v-simple-table dense>
                                <template>
                                    <thead>
                                        <tr>
                                            <th>Step</th>
                                            <th>Drop Rate</th>
                                            <th>Buy Multiplier</th>
                                            <th>Take Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-if="item.steps[0]" class="text-center" v-for="(child, y, key) in item.steps" :key="child.key">
                                            <td>{{y+1}}</td>
                                            <td>
                                                <span>{{child.drop_rate}}</span>
                                                <v-icon small slot="append" color="primary">
                                                    mdi-percent
                                                </v-icon>
                                            </td>
                                            <td>
                                                <span>{{child.multiplier}}</span>
                                                <v-icon small slot="append" color="primary">
                                                    mdi-close
                                                </v-icon>
                                            </td>
                                            <td>
                                                <span>{{child.take_profit}}</span>
                                                <v-icon small slot="append" color="primary">
                                                    mdi-percent
                                                </v-icon>

                                            </td>
                                        </tr>
                                        <tr v-if="item.name == 'Custom' && item.steps.length>0">
                                            <td style="text-align:center;" colspan="4">
                                                <v-btn x-small @click="resetRowCustom" class="danger--text">RESET CUSTOM STRATEGY</v-btn>
                                            </td>
                                        </tr>
                                        <tr v-if="item.name == 'Custom'">
                                            <td v-if="item.name == 'Custom'">
                                                <v-btn class="success" small @click="addRowCustom(customDrop, customBuy, customProfit)">+</v-btn>
                                            </td>
                                            <td>
                                                <v-text-field v-model="customDrop" placeholder="1.2">
                                                    <v-icon small slot="append" color="primary">
                                                        mdi-percent
                                                    </v-icon>
                                                </v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field v-model="customBuy" placeholder="2">
                                                    <v-icon small slot="append" color="primary">
                                                        mdi-close
                                                    </v-icon>
                                                </v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field v-model="customProfit" placeholder="1.1">
                                                    <v-icon small slot="append" color="primary">
                                                        mdi-percent
                                                    </v-icon>
                                                </v-text-field>
                                            </td>
                                            <td>
                                                v-
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-btn color="primary" @click="selectStyle(item)">Select Style</v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    props: ['selectedStrategy'],
    data() {
        return {
            strategy: {
                usdt_to_apply: 0,
                usdt_per_order: 0,
                max_concurrent_trading_pair: 0,
                style: {
                    name: null,
                }
            },
            applyBalance: 100,
            selectedItem: 1,
            styleList: [],
            // CUSTOM STRATEGY
            customDrop: null,
            customBuy: null,
            customProfit: null,
            customStyle: {
                name: "Custom",
                active: false,
                steps: [],
                key: "E"
            }
        }
    },
    methods: {
        // FETCH API
        async fetchFormula() {
            console.log("FETCHING DATA USER BOT");
            let res = await this.$api.$get('/user/formula');
            this.styleList = res.data;
            this.styleList.push(this.customStyle);
            console.log('styleList', this.styleList)
        },

        // TRIGGER
        onUsdtPerOrderChanged(value) {
            let usdtValue = parseFloat(value);
            if (usdtValue < 15) {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "USDT Per Order Cannot Be Under 15!",
                    color: "customPink"
                })

                setTimeout(() => {
                    this.strategy.usdt_per_order = 15;
                    this.$refs.usdt_per_order.focus();
                })
            }
        },
        addRowCustom(drop, multiplier, profit) {
            if (!drop || !multiplier || !profit) {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Please don't leave any strategy input empty!",
                    color: "customPink"
                })
            } else {
                let strategy = {};
                strategy.step = this.customStyle.steps.length
                strategy.drop_rate = parseFloat(drop);
                strategy.multiplier = parseFloat(multiplier);
                strategy.take_profit = parseFloat(profit);
                this.customStyle.steps.push(strategy);
                this.customDrop = null;
                this.customBuy = null;
                this.customProfit = null;
                // this.styleList[4] = this.customStyle;
            }
        },
        resetRowCustom() {
            this.customStyle = {
                    name: "Custom",
                    active: true,
                    steps: [],
                    key: "E"
                },
                this.styleList[4] = this.customStyle;
            this.$forceUpdate();
        },
        removeRowCustom(index) {
            this.customStyle.steps[index]
        },
        selectStyle(val) {
            console.log(val);
            this.strategy.style = val;
            for (let i = 0; i < this.styleList.length; i++) {
                this.styleList[i].active = false;
            }
        },

        clearData() {
            alert("TESTREF");
            this.strategy = {
                usdt_to_apply: 0,
                usdt_per_order: 0,
                max_concurrent_trading_pair: 0,
                style: {
                    name: null,
                }
            }
            this.styleList = [];
            this.fetchFormula();
        },

        async _logger() {
            console.log('strategy', this.strategy);
            console.log('styleList', this.styleList)
            console.log(this.customStyle)

            // await this.fetchFormula
        },
    },
    mounted() {
        if (this.selectedStrategy) {
            this.strategy = this.selectedStrategy
        }
        this.fetchFormula();
    },
    watch: {
        strategy: {
            handler(nv, ov) {
                console.log('nv.usdt_per_order', nv.usdt_per_order);
                nv.usdt_to_apply = nv.usdt_to_apply ? parseFloat(nv.usdt_to_apply) : 1;
                nv.usdt_per_order = nv.usdt_per_order ? parseFloat(nv.usdt_per_order) : 1;
                nv.max_concurrent_trading_pair = nv.max_concurrent_trading_pair ? parseFloat(nv.max_concurrent_trading_pair) : 1;
                this.$emit('onSelected', nv);
            },
            deep: true
        }
    }
}
</script>

<style>

</style>
