<template>
<v-card elevation="8">
    <v-card-title class="text-h6 lighten-2">
        Add Bot
        <v-btn class="ml-2" small @click="logger">logger</v-btn>
        <v-btn class="ml-2" small @click="loader">loader</v-btn>
    </v-card-title>
    <v-card-text class="my-3">
        <v-stepper elevation="0" class="basic-1" v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">

                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="3">
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 3" step="4">
                </v-stepper-step>
                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 4" step="5">
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card flat class="mb-12 d-flex flex-column align-center">
                        <h3>Choose an Exchange</h3>
                        <GlobalsExchangeList @onSelected="onExchangeSelected" class="mt-3" style="width:100%;" />
                    </v-card>

                    <div class="d-flex float-right">
                        <v-btn color="blue darken-1" class="mr-2" text @click="closeModal">
                            Cancel
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 2">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card flat>
                        <ModalsBotSetupStrategyAndAmount @onSelected="onStrategySelected" />
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
                    <v-card flat min-height="200px">
                        <ModalsBotSetupTechnicalAnalysis @onAlaysisSelected="onAlaysisSelected" />
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
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 3" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="e1 = 5">
                            Continue
                        </v-btn>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="5">
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
                        <v-btn color="blue darken-1" class="mr-2" @click="e1 = 4" text>
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="_submitBotSetup">
                            Submit
                        </v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            bot: {
                selected_exchange: null,
                strategy: {
                    style: {
                        text: null,
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
            exchanges: ['MEXC', 'AVAX', 'CRONOS', 'MONERO'],
            exchangesCopy: [],
            tokenException: [],
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
            ]
        }
    },
    methods: {
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
            console.log(this.bot);
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
        resetModalState(){
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
        },

        // CONSUME API
        async _submitBotSetup() {
            console.log(this.bot);
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
            console.log(paramTemp);
            let res = await this.$api.$post("/user/bot", paramTemp);
            this.$store.commit('setIsLoading', true);
            setTimeout(() => {
                this.$emit('close-modal', false);
                this.$store.commit('setIsLoading', false);
                this.resetModalState();
            })
        }
    },
    mounted() {
        this.exchangesCopy = [...this.exchanges];
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
