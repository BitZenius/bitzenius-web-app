<template>
<v-card elevation="8">
    <v-card-title class="text-h6 lighten-2">
        Transaction
    </v-card-title>
    <v-card-text class="my-3">
        <v-row class="mx-2">
            <v-scroll-y-transition>
                <v-col style="border-radius:15px; background:#3394F8;" class="d-flex align-center justify-center flex-column" cols="12">
                    <img style="width:60px;" :alt="pair.logo" :src="'/token_logo/'+pair.pair_from.toUpperCase()+'.png'"  />
                    <h4 class="mt-2 white--text">{{pair.pair_from}} / {{pair.pair_to}}</h4>
                    <v-row class="mt-2">
                        <v-col cols="6" md="3">
                            <v-btn style="width:100%;" color="customGreen" small @click="onTabSelect('detail')">
                                <v-icon small class="mr-1">
                                    mdi-pencil
                                </v-icon>
                                Detail
                            </v-btn>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-btn style="width:100%;" color="customGreen" small @click="onTabSelect('strategy')">
                                <v-icon small class="mr-1">
                                    mdi-lightbulb-outline
                                </v-icon>
                                Strategy
                            </v-btn>
                        </v-col>
                        <v-col cols="6" md="3">
                            <v-btn style="width:100%;" color="customGreen" small @click="onTabSelect('formula')">
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
                        <!-- <v-row class="my-2" v-show="showSetting" style="width:100%;">
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
                        </v-row> -->
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
                    <template v-slot:item.value="{item}">
                        <span v-if="item.key == 'take_profit_price' ||item.key == 'next_step_price'">
                            {{item.value | currency('$', 6)}}
                        </span>
                        <span v-else>
                            {{item.value}}
                        </span>
                    </template>
                </v-data-table>
                <v-data-table v-show="tabs.detail" :headers="tableDetailTitle" :items="detailItems" hide-default-header hide-default-footer class="elevation-2 ma-2">
                    <template v-slot:item.title="{item}">
                        <span>{{item.title}}</span>
                    </template>
                    <template v-slot:item.value="{item}">
                        <span v-if="item.key == 'average'">
                            {{item.value | currency('$', 6)}}
                        </span>
                        <span v-else>
                            {{item.value}}
                        </span>
                    </template>              
                </v-data-table>

                <!-- START OF FORMULA -->
                <div v-show="tabs.formula" class="pt-0">
                    <!-- <v-card elevation="3" class="ma-3 pa-3">
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
                    </v-card> -->
                    <v-card elevation="3" class="ma-3 pa-3">
                        <ModalsBotSetupTechnicalAnalysis v-if="analysis.condition" :selected-technical="analysis" ref="analysisRef" @onAnalysisSelected="onAnalysisSelected"/>
                        <!-- <div class="d-flex flex-column align-center">
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
                        </div> -->
                    </v-card>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn disabled color="success" @click="showAveragingFormula = !showAveragingFormula">
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
                <v-btn color="orange white--text" disabled style="width:100%;" @click="_pause">PAUSE</v-btn>
            </v-col>
            <v-col cols="12" md="6">
                <v-btn color="customPink white--text" disabled style="width:100%;" @click="_forceSell">
                    FORCE SELL
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <v-btn color="success white--text" disabled style="width:100%;">SAVE</v-btn>
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
        },
        detail:{
            type:Object,
            default:null
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
            analysis: {
                first_analysis: {
                    analysis: null
                },
                second_analysis: {
                    analysis: null
                },
                condition: null,
                minimum_trading_volume: null
            },

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
                    key:"total_amount",
                    value: 0
                },
                {
                    title: "Average Price",
                    key:"average",
                    value: 0
                },
                {
                    title: "Step",
                    key:"total_step",
                    value: 0
                },
                {
                    title: "Quantity",
                    key:"total_quantity",
                    value: 0
                },
                {
                    title: "Change",
                    value: 0
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
            conditionList:[],
            conditionItems: [{
                    icon: "mdi-arrow-up-drop-circle-outline",
                    title: "Next Step Price",
                    key:"next_step_price",
                    value: 0
                },
                {
                    icon: "mdi-arrow-down-drop-circle-outline",
                    title: "Next Step Drop Rate",
                    key:"next_step_drop_rate",
                    value: 0
                },
                {
                    icon: "mdi-currency-usd",
                    title: "Take Profit Price",
                    key:"take_profit_price",
                    value: 0
                },
                {
                    icon: "mdi-percent-outline",
                    title: "Take Profit Ratio",
                    key:"take_profit_ratio",
                    value: 0
                },
                {
                    icon: "mdi-wallet-outline",
                    title: "Buy Amount",
                    key:"total_buy_amount",
                    value: 0
                },
                {
                    icon: "mdi-car-speed-limiter",
                    title: "Averaging Limit",
                    key:"averaging_limit",
                    value: 0
                },
            ]
        }
    },
    methods: {
        // TRIGGER
        _logSetup(){

        },
        onAnalysisSelected(val){
            console.log(val);
        },
        logger() {

        },
        onTabSelect(tab) {
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
        },
        setStrategy(){
            for(let data of this.conditionItems){
                data.value = this.detail[data.key];
            }
        },
        setDetail(){
            for(let data of this.detailItems){
                if(data.key){
                    data.value = this.detail[data.key]
                }
            }
        },
        setAnalysis(){
            let analysis = {};
            analysis.condition = this.detail.analysis.condition;
            analysis.minimum_trading_volume = -1;
            analysis.first_analysis = {};
            
            let index = 0;
            for (let indicator of this.detail.analysis.indicators) {
                if (index == 0) {
                    analysis.first_analysis = {
                        analysis: indicator.id,
                        time: indicator.timeperiod
                    }
                } else if (index == 1) {
                    analysis.second_analysis = {
                        analysis: indicator.id,
                        time: indicator.timeperiod
                    }
                }
                console.log(indicator);
                index++;
            }

            console.log('tempAnalysis', analysis);
            this.analysis = analysis;
        }
    },
    async mounted(){
        this.setStrategy();
        this.setDetail();
        this.setAnalysis();
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
