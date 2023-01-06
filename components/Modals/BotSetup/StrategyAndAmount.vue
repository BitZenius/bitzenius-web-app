<template>
<div class="d-flex flex-column align-center">
    <h3 class="mb-1">Choose the strategy & Amount</h3>
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
                    <v-text-field number dense class="mt-2" v-model="strategy.usdt_per_order" label="USDT Per Order" outlined></v-text-field>
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
    <v-row class="d-flex align-center justify-center pt-0 mt-0" style="width:100%;">
        <v-col cols="12">
            <v-list>
                <v-list-group v-for="(item, i) in styleList" :key="item.name" v-model="item.active" prepend-icon="mdi-circle-outline" no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item class="pl-6 pr-0">
                        <v-list-item-content>
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
                                        <tr v-if="item.name != 'Custom'" class="text-center" v-for="(child, y, key) in item.steps" :key="child.key">
                                            <td>{{y}}</td>
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
                                        <tr v-else>
                                            <td>{{y}}</td>
                                            <td>
                                                <v-text-field placeholder="1.2">
                                                    <v-icon small slot="append" color="primary">
                                                        mdi-percent
                                                    </v-icon>
                                                </v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field placeholder="2">
                                                    <v-icon small slot="append" color="primary">
                                                        mdi-close
                                                    </v-icon>
                                                </v-text-field>
                                            </td>
                                            <td>
                                                <v-text-field placeholder="1.1">
                                                    <v-icon small slot="append" color="primary">
                                                        mdi-percent
                                                    </v-icon>
                                                </v-text-field>
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
    props:['selectedStrategy'],
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
        }
    },
    methods: {
        // FETCH API
        async fetchFormula() {
            console.log("FETCHING DATA USER BOT");
            let res = await this.$api.$get('/user/formula');
            this.styleList = res.data;
            this.styleList.push({
                name: "Custom",
                active: false,
                steps: [{
                        step: 1,
                        drop_rate: 5,
                        multiplier: 2,
                        take_profit: 2
                    },
                    {
                        step: 1,
                        drop_rate: 5,
                        multiplier: 2,
                        take_profit: 2
                    },
                    {
                        step: 1,
                        drop_rate: 5,
                        multiplier: 2,
                        take_profit: 2
                    },
                    {
                        step: 1,
                        drop_rate: 5,
                        multiplier: 2,
                        take_profit: 2
                    },
                    {
                        step: 1,
                        drop_rate: 5,
                        multiplier: 2,
                        take_profit: 2
                    },
                ]
            })
        },

        // TRIGGER
        selectStyle(val) {
            console.log(val);
            this.strategy.style = val;
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
            console.log(this.styleList);
            console.log(this.strategy);
            await this.fetchFormula();
        },
    },
    mounted() {
        if(this.selectedStrategy){
            this.strategy = this.selectedStrategy
        }

        this.fetchFormula();
    },
    watch: {
        strategy: {
            handler(nv, ov) {
                nv.usdt_to_apply = parseFloat(nv.usdt_to_apply);
                nv.usdt_per_order = parseFloat(nv.usdt_per_order);
                nv.max_concurrent_trading_pair = parseFloat(nv.max_concurrent_trading_pair);
                this.$emit('onSelected', nv);
            },
            deep: true
        }
    }
}
</script>

<style>

</style>
