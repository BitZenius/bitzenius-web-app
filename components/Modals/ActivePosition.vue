<template>
<v-card elevation="8">
    <v-card-title class="text-h6 lighten-2">
        Transaction
    </v-card-title>
    <v-card-text class="my-3">
        <v-row class="mx-2">
            <v-scroll-y-transition>
                <v-col style="border-radius:15px; background:#177e89;" class="d-flex align-center justify-center flex-column" cols="12">
                    <img style="width:60px;" :alt="pair.logo" :src="require(`~/assets/token_logo${pair.logo}`)" />
                    <h4 class="mt-2 white--text">{{pair.pair_from}} / {{pair.pair_to}}</h4>
                    <v-row class="mt-2">
                        <v-col cols="6" md="3">
                            <v-btn style="width:100%;" color="primary" small @click="onTabSelect('detail')">
                                <v-icon small class="mr-1">
                                    mdi-pencil
                                </v-icon>
                                Detail
                            </v-btn>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-btn style="width:100%;" color="primary" small @click="onTabSelect('strategy')">
                                <v-icon small class="mr-1">
                                    mdi-lightbulb-outline
                                </v-icon>
                                Strategy
                            </v-btn>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-btn style="width:100%;" color="primary" small @click="onTabSelect('formula')">
                                <v-icon small class="mr-1">
                                    mdi-file-table-box-outline
                                </v-icon>
                                Formula
                            </v-btn>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-btn class="white--text" style="width:100%;" color="orange" small @click="showSetting = !showSetting">
                                <v-icon small class="mr-1">
                                    mdi-cog
                                </v-icon>
                                Setting
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-scale-transition>
                        <v-row class="my-2" v-show="showSetting" style="width:100%;">
                            <v-col cols="6" class="pb-0 mb-0">
                                <div class="setting-container success d-flex flex-column justify-center align-center white--text" style="width:100%;">
                                    <v-icon color="white">
                                        mdi-weight
                                    </v-icon>
                                    <h5>Averaging: ON</h5>
                                </div>
                            </v-col>
                            <v-col cols="6" class="pb-0 mb-0">
                                <div class="danger setting-container success d-flex flex-column justify-center align-center white--text" style="width:100%;">
                                    <v-icon color="white">
                                        mdi-alert-octagon-outline
                                    </v-icon>
                                    <h5>Blacklist</h5>
                                </div>
                            </v-col>
                        </v-row>
                    </v-scale-transition>
                </v-col>
            </v-scroll-y-transition>

        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table v-show="tabs.strategy" :headers="tableTitle" :items="conditionItems" hide-default-header hide-default-footer class="elevation-2 ma-2">
                    <template v-slot:item.title="{item}">
                        <v-icon>
                            {{item.icon}}
                        </v-icon>
                        <span>{{item.title}}</span>
                    </template>
                </v-data-table>
                <v-data-table v-show="tabs.detail" :headers="tableDetailTitle" :items="detailItems" hide-default-header hide-default-footer class="elevation-2 ma-2">
                    <template v-slot:item.title="{item}">
                        <span>{{item.title}}</span>
                    </template>
                </v-data-table>

                <!-- START OF FORMULA -->
                <div v-show="tabs.formula" class="pt-0">
                    <v-card elevation="3" class="ma-3 pa-3">
                        <v-tooltip right color="success">
                            <template v-slot:activator="{ on, attrs }">
                                <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                                    <v-col cols="7" md="9">
                                        <v-text-field dense class="mt-2 ml-3" label="Buy Amount" outlined></v-text-field>
                                    </v-col>
                                    <v-col v-bind="attrs" v-on="on" cols="5" md="3" class="pr-0">
                                        <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
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
                                    <v-col cols="7" md="9">
                                        <v-text-field dense class="mt-2 ml-3" label="Averaging Limit" outlined></v-text-field>
                                    </v-col>
                                    <v-col v-bind="attrs" v-on="on" cols="5" md="3" class="pr-0">
                                        <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                                            STEPS
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </template>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        </v-tooltip>
                        <v-tooltip right color="success">
                            <template v-slot:activator="{ on, attrs }">
                                <v-row v-bind="attrs" v-on="on" class="d-flex align-center justify-center" style="width:100%;">
                                    <v-col cols="7" md="9">
                                        <v-text-field dense class="mt-2 ml-3" label="Take Profit Ratio" outlined></v-text-field>
                                    </v-col>
                                    <v-col v-bind="attrs" v-on="on" cols="5" md="3" class="pr-0">
                                        <v-chip class="d-flex align-center justify-center" color="primary" label text-color="white">
                                            %
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </template>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                        </v-tooltip>
                    </v-card>
                    <v-card elevation="3" class="ma-3 pa-3">
                        <div class="d-flex flex-column align-center">
                            <h3>Choose Technical Analysis</h3>
                            <v-row style="width:100%;">
                                <v-col cols="8">
                                    <v-select :items="analysisList" label="Choose Analysis" dense outlined></v-select>
                                </v-col>
                                <v-col cols="4" class="mx-0">
                                    <v-select :items="timeList" label="Minutes" dense outlined></v-select>
                                </v-col>
                            </v-row>
                            <h3 class="mt-3">Condition</h3>
                            <v-row style="width:100%;">
                                <v-col class="d-flex justify-center" cols="12">
                                    <v-btn-toggle style="width:100%;" v-model="condition" borderless color="primary">
                                        <v-btn style="width:50%;" value="AND">
                                            AND
                                        </v-btn>
                                        <v-btn style="width:50%;" value="OR">
                                            OR
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                            <v-row style="width:100%;">
                                <v-col cols="8">
                                    <v-select :items="analysisList" label="Choose Analysis" dense outlined></v-select>
                                </v-col>
                                <v-col cols="4" class="mx-0">
                                    <v-select :items="timeList" label="Minutes" dense outlined></v-select>
                                </v-col>
                            </v-row>
                            <h3 class="mt-3">Minimum trading volume in 24h</h3>
                            <v-row style="width:100%;">
                                <v-col class="d-flex justify-center" cols="12">
                                    <v-select :items="['$10,000,000','$1,000,000', '$100,000']" label="Trading Volume" dense outlined></v-select>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn color="success" @click="showAveragingFormula = !showAveragingFormula">
                                <v-icon small class="mr-1">
                                    mdi-cog
                                </v-icon>
                                Averaging Configuration
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-card elevation="3" class="ma-3" v-show="showAveragingFormula">
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
                                    <tr class="text-center" v-for="(child, index) in tableItems" :key="index">
                                        <td>
                                            <span>{{child.step}}</span>
                                        </td>
                                        <td>
                                            <span>{{child.dropRate}} %</span>
                                        </td>
                                        <td>
                                            <span>{{child.multiplier}}</span>
                                        </td>
                                        <td>
                                            <span>{{child.takeProfit}} %</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </div>
                <!-- END OF FORMULA -->

            </v-col>
        </v-row>
        <v-row v-if="!tabs.formula">
            <v-col cols="12" md="6">
                <v-btn color="orange white--text" style="width:100%;" @click="_pause">PAUSE</v-btn>
            </v-col>
            <v-col cols="12" md="6">
                <v-btn color="danger white--text" style="width:100%;" @click="_forceSell">
                    FORCE SELL
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <v-btn color="success white--text" style="width:100%;">SAVE</v-btn>
            </v-col>
        </v-row>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: {
        pair: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            // SHOW HANDLER
            pairDetailShown: false,
            showSetting: false,
            showOverview: true,
            showAveragingFormula: false,
            tabs: {
                detail: true,
                strategy: false,
                formula: false,

            },

            // ANALYSIS
            analysisList: [{
                id: "EMA",
                name: "Exponential Moving Average"
            }, {
                id: "SMA",
                name: "Moving Average"
            }, {
                id: "BB",
                name: "Bollinger Band"
            }, {
                id: "RSI",
                name: "RSI"
            }, {
                id: "STOCHASTIC",
                name: "Stochastic"
            }, {
                id: "MACD",
                name: "MACD"
            }, {
                id: "STOCHASTIC_RSI",
                name: "Stochastic RSI"
            }, {
                id: "CCI",
                name: "CCI"
            }],
            timeList: ['5m', '15m', '30m', '1h', '2h', '4h', '12h'],
            condition:null,

            // STRATEGY
            tableItems: [{
                    step: 1,
                    dropRate: 5,
                    multiplier: 2,
                    takeProfit: 2
                },
                {
                    step: 2,
                    dropRate: 5,
                    multiplier: 2,
                    takeProfit: 2
                },
                {
                    step: 3,
                    dropRate: 5,
                    multiplier: 2,
                    takeProfit: 2
                },
                {
                    step: 4,
                    dropRate: 5,
                    multiplier: 2,
                    takeProfit: 2
                },
                {
                    step: 5,
                    dropRate: 5,
                    multiplier: 2,
                    takeProfit: 2
                },
            ],

            // TABLE DETAIL
            tableDetailTitle: [{
                    text: "Title",
                    align: "start",
                    value: "title"
                },
                {
                    text: "Value",
                    align: "center",
                    value: "value",
                    cellClass: "font-weight-bold"
                }
            ],
            detailItems: [{
                    title: "Amount",
                    value: "$" + 118.98212
                },
                {
                    title: "Average Price",
                    value: 1133.1213
                },
                {
                    title: "Step",
                    value: 5
                },
                {
                    title: "Quantity",
                    value: 0.21513
                },
                {
                    title: "Change",
                    value: -2.77 + "%"
                },
            ],

            // TABLE CONDITION
            tableTitle: [{
                    text: "Title",
                    align: "start",
                    value: "title"
                },
                {
                    text: "Value",
                    align: "center",
                    value: "value",
                    cellClass: "font-weight-bold"
                }
            ],
            conditionItems: [{
                    icon: "mdi-arrow-up-drop-circle-outline",
                    title: "Next Step Price",
                    value: 1121.64905
                },
                {
                    icon: "mdi-arrow-down-drop-circle-outline",
                    title: "Next Step Drop Rate",
                    value: 1.5 + "%"
                },
                {
                    icon: "mdi-currency-usd",
                    title: "Take Profit Price",
                    value: 1153.53349
                },
                {
                    icon: "mdi-percent-outline",
                    title: "Take Profit Ratio",
                    value: 1.3 + "%"
                },
                {
                    icon: "mdi-wallet-outline",
                    title: "Buy Amount",
                    value: 15
                },
                {
                    icon: "mdi-car-speed-limiter",
                    title: "Averaging Limit",
                    value: 18
                },
            ]
        }
    },
    methods: {
        // TRIGGER
        logger() {

        },
        onTabSelect(tab) {
            console.log(tab);
            console.log(this.tabs);
            for (let key in this.tabs) {
                if (key == tab) {
                    this.tabs[key] = true
                } else {
                    this.tabs[key] = false
                }
            }
        },
        async _pause() {
            console.log(this.pair);
            let query = {};
            query.id = this.pair._id
            query.action = "PAUSE"
            query.status = "REQUESTED"
            query.message = null
            query.details = {
                bot_id: this.pair.bot_id
            }

            let res = await this.$api.$post("/user/action", query);
            console.log(res);

            this.$store.commit('setIsLoading', true);
            setTimeout(() => {
                this.$emit('close-modal', false);
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Successfuly Added Action Pause!",
                    color: "success"
                })
                this.$store.commit('setIsLoading', false);
            })
        },

        async _forceSell() {
            console.log(this.pair);
            let query = {};
            query.id = this.pair._id
            query.action = "FORCE_SELL"
            query.status = "REQUESTED"
            query.message = null
            query.details = {
                bot_id: this.pair.bot_id
            }

            let res = await this.$api.$post("/user/action", query);
            console.log(res);

            this.$store.commit('setIsLoading', true);
            setTimeout(() => {
                this.$emit('close-modal', false);
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Successfuly Added Action Stop!",
                    color: "success"
                })
                this.$store.commit('setIsLoading', false);
            })
        },
        closeModal() {
            this.$emit('close-modal', false);
        },
        _riskSelected(risk) {
            console.log(risk.text);
        }
    }
}
</script>

<style scoped>
.summary .v-card__title {
    padding: 0;
    font-size: 0.9rem;
    text-align: center;
    display: block;
}

.summary .v-card__text {
    display: block;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
}

.setting-container {
    border-radius: 15px 5px;
    padding: 5px 10px;
    transition: 0.3s;
}

.setting-container:hover {
    cursor: pointer;
    box-shadow: 1px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.setting-container:active {
    cursor: pointer;
    box-shadow: 1px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>
