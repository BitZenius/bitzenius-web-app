<template>
<v-card elevation="8">
    <v-card-title class="text-h6 lighten-2">
        <v-row>
            <v-col cols="12" class="d-flex justify-center">Add Bot {{exchange}}</v-col>
        </v-row>
        <!-- <v-row>
            <v-col cols="12">
                <v-btn class="ml-2" small @click="logger">logger</v-btn>
                <v-btn class="ml-2" small @click="loader">loader</v-btn>
                <v-btn class="ml-2" small @click="snackbar">snackbar</v-btn>
                <v-btn class="ml-2" small @click="resetModalState">reset modal</v-btn>
            </v-col>
        </v-row> -->
    </v-card-title>
    <v-card-text class="my-3">
        <v-stepper elevation="0" class="basic-1" v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 1" step="2">
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="3">
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="4">
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card flat>
                        <ModalsBotSetupStrategyAndAmount v-if="showStrategySetup" :selected-strategy="bot.strategy" ref="strategyRef" @onSelected="onStrategySelected" />
                    </v-card>
                    <!-- <div class="d-flex float-left">
                        <v-btn class="danger white--text" @click="_deleteBot( bot.id)">
                            Delete Bot
                        </v-btn>
                    </div> -->
                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 1" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 2">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card flat min-height="200px">
                        <ModalsBotSetupTechnicalAnalysis v-if="showTechnicalAnalysis" :selected-technical="bot.analysis" ref="analysisRef" @onAlaysisSelected="onAlaysisSelected" />
                    </v-card>
                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 1" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 3">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card flat class="mb-12 d-flex flex-column align-center">
                        <h3>Token Exceptions</h3>
                        <v-select dense class="mt-3" v-model="tokenException" :items="exchanges" chips label="Token Exceptions" multiple outlined>
                            <template v-slot:prepend-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-text-field v-model="searchTerm" placeholder="Search" @input="searchFruits"></v-text-field>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-select>
                    </v-card>

                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 2" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 4">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <v-card class="mb-12 d-flex flex-column align-center" flat min-height="200px">
                        <h3>Summary</h3>
                        <v-row class="mt-1" style="width:100%;">
                            <v-col cols="12">
                                <v-data-table :headers="summaryHeaders" :items="summary" hide-default-header hide-default-footer class="elevation-1">
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-card>
                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 3" text>
                            Back
                        </v-btn>
                        <v-btn v-if="!isUpdateMode" color="primary" @click="_submitBotSetup(isUpdateMode)">
                            Submit
                        </v-btn>
                        <v-btn v-else color="success" @click="_submitBotSetup(isUpdateMode)">
                            Update
                        </v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card-text>
</v-card>
</template>

<script>
import {
    mapGetters,
    mapMutations,
    mapActions,
    mapState
} from "vuex";

export default {
    props: {
        botProp: {
            type: Object,
            default: null
        },
        exchange: {
            type: String
        }
    },
    data() {
        return {
            // STATE
            isUpdateMode: false,

            exchanges: ['MEXC', 'AVAX', 'CRONOS', 'MONERO'],
            exchangesCopy: [],
            tokenException: [],
            bot: {
                selected_exchange: null,
                strategy: {
                    style: {
                        name: null,
                    },
                    usdt_to_apply: 0,
                    usdt_per_order: 0,
                    max_concurrent_trading_pair: 0,
                },
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
                token_exception: null
            },
            e1: 1,
            summaryHeaders: [{
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
            searchTerm: "",
            summary: [{
                    color: 'indigo',
                    icon: 'mdi-buffer',
                    title: 'Exchange',
                    value: null
                },
                {
                    color: 'indigo',
                    icon: 'mdi-buffer',
                    title: 'Strategy',
                    // value: 'Moderate'
                    value: null
                },
                {
                    color: 'green',
                    icon: 'mdi-buffer',
                    title: 'Total USDT',
                    // value: '$2000'
                    value: null
                },
                {
                    color: 'indigo',
                    icon: 'mdi-buffer',
                    title: 'Technical Analysis',
                    // value: 'Bollinger & RSI'
                    value: null
                },
                {
                    color: 'green',
                    icon: 'mdi-buffer',
                    title: 'Minimum Trading Volume',
                    // value: '$10,000,000'
                    value: null
                },
            ],

            // VALIDATION
            stepsValidation: [false, false, false, false],

            // PROPS FOR COMPONENTS
            showStrategySetup: false,
            showTechnicalAnalysis: false
        }
    },
    methods: {
        ...mapMutations("exchange", ["setSelectedExchange"]),
        // TRIGGER
        onStrategySelected(val) {
            console.log(val);
        },
        onExchangeSelected(val) {
            this.bot.selected_exchange = val;
        },
        onStrategySelected(val) {
            console.log('onStrategySelected');
            this.bot.strategy = val;
        },
        onAlaysisSelected(val) {
            console.log('onAlaysisSelected');
            this.bot.analysis = val;
        },
        logger() {
            console.log('logger');
            console.log('botProp', this.botProp);
            console.log('bot', this.bot)
            console.log('end-of logger')
            this.$refs.strategyRef.clearData();
        },
        snackbar() {
            console.log('snackbar');
            this.$store.commit('setShowSnackbar', {
                show: true,
                message: "Hello World",
                color: "success"
            })
        },
        loader() {
            setTimeout(() => {
                this.$store.commit('setIsLoading', true);
            })
        },
        closeModal() {
            this.$emit('close-modal', false);
        },
        _riskSelected(risk) {
            console.log(risk.text);
        },
        searchFruits(e) {
            console.log(e);
            console.log(this.searchTerm);
            console.log(this.exchangesCopy);
            if (!this.searchTerm) {
                this.exchanges = [...this.exchangesCopy];
            }

            this.exchanges = this.exchangesCopy.filter((exchange) => {
                return exchange.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
            });
        },

        // ADD-ON
        resetModalState() {
            this.bot = {
                    selected_exchange: null,
                    strategy: {
                        style: {
                            name: null,
                        },
                        usdt_to_apply: null
                    },
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
                    token_exception: null
                },
                this.e1 = 1;
            this.tokenException = [];
            this.searchTerm = "";
            this.setSelectedExchange(null);
            console.log(this.bot);
        },

        // CONSUME API
        async _deleteBot(id) {
            this.$store.commit('setIsLoading', true);
            let res = await this.$api.$delete("/user/bot", null, {
                params: {
                    id: id
                }
            });
            setTimeout(() => {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: "Bot Successfuly Deleted!",
                    color: "danger"
                })
                this.$store.commit('setIsLoading', false);
            })
        },
        async _submitBotSetup(isUpdateMode) {
            let paramTemp = {
                ...this.bot
            };
            let analysis = {};
            analysis.condition = this.bot.analysis.condition;
            analysis.minimum_trading_volume = this.bot.analysis.minimum_trading_volume;
            analysis.indicators = [];

            if (this.bot.analysis.first_analysis) {
                analysis.indicators.push({
                    indicator: this.bot.analysis.first_analysis.analysis,
                    timeperiod: this.bot.analysis.first_analysis.time
                })
            }

            if (this.bot.analysis.second_analysis) {
                analysis.indicators.push({
                    indicator: this.bot.analysis.second_analysis.analysis,
                    timeperiod: this.bot.analysis.second_analysis.time
                })
            }

            delete paramTemp.analysis;
            paramTemp.analysis = analysis
            this.$store.commit('setIsLoading', true);

            if (isUpdateMode) {
                delete paramTemp.id;
                let query = {
                    id: this.bot.id
                }

                console.log('paramTemp', paramTemp);
                console.log('query', query)

                let res = await this.$api.$put("/user/bot", paramTemp, {
                    params: query
                });
                setTimeout(() => {
                    this.$store.commit('setShowSnackbar', {
                        show: true,
                        message: "Bot Successfuly Updated!",
                        color: "success"
                    })
                })
            } else {
                // ON INSERT
                let res = await this.$api.$post("/user/bot", paramTemp);
                setTimeout(() => {
                    this.$store.commit('setShowSnackbar', {
                        show: true,
                        message: "Successfuly Added New Bot!",
                        color: "success"
                    })
                })
            }

            setTimeout(() => {
                this.$emit('close-modal', false);
                this.$store.commit('setIsLoading', false);
                this.resetModalState();
            })
        }
    },
    mounted() {
        this.bot.selected_exchange = this.exchange;
        if (this.botProp) {
            this.isUpdateMode = true;
            this.bot.id = this.botProp._id;
            this.bot.strategy = this.botProp.strategy;
            this.bot.analysis.condition = this.botProp.analysis.condition;
            this.bot.analysis.minimum_trading_volume = this.botProp.analysis.minimum_trading_volume;
            let index = 0;
            for (let indicator of this.botProp.analysis.indicators) {
                if (index == 0) {
                    this.bot.analysis.first_analysis = {
                        analysis: indicator.indicator,
                        time: indicator.timeperiod
                    }
                } else if (index == 1) {
                    this.bot.analysis.second_analysis = {
                        analysis: indicator.indicator,
                        time: indicator.timeperiod
                    }
                }
                console.log(indicator);
                index++;
            }
        }

        this.exchangesCopy = [...this.exchanges];
        setTimeout(() => {
            this.showStrategySetup = true;
            this.showTechnicalAnalysis = true;
        })
    },
    watch: {
        tokenException: {
            handler(nv, ov) {
                this.bot.token_exception = nv;
            },
            deep: true
        },
        bot: {
            handler(nv, ov) {
                this.summary[0].value = nv.selected_exchange;
                this.summary[1].value = nv.strategy.style.name;
                this.summary[2].value = "$" + nv.strategy.usdt_to_apply;
                this.summary[3].value = `${nv.analysis.first_analysis.analysis} ${nv.analysis.condition == "AND"? "&":"/" } ${nv.analysis.second_analysis.analysis}`;
                this.summary[4].value = nv.analysis.minimum_trading_volume;
            },
            deep: true
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
</style>
