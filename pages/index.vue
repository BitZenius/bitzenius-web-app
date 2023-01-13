<template>
<div>
    <v-row>
        <v-col cols="12" md="4">
            <GlobalsExchangeList />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="4">
            <CardCredit />
        </v-col>
        <v-col cols="12" md="4">
            <CardProfit />
        </v-col>
        <v-col cols="12" md="4">
            <CardDeals :deal="deal" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <GlobalsAddBalance class="px-2 py-5" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="12">
            <v-card class="pa-2" elevation="8">
                <v-sheet class="text-h6 font-weight-bold ma-4">
                    Daily Profit Revenue
                </v-sheet>
                <apexchart v-if="showChart" height="300" type="bar" :options="chartData.options" :series="chartData.series"></apexchart>
            </v-card>
        </v-col>
        <!-- <v-col cols="12" md="6">
            <v-card class="pa-2" elevation="8">
                <v-sheet class="text-h6 font-weight-bold ma-4">
                    Total Revenue
                </v-sheet>
                <apexchart type="area" :options="chartData.options" :series="chartData.series"></apexchart>
            </v-card>
        </v-col> -->
    </v-row>
    <v-row>
        <v-col cols="12">
            <TablesActivePosition />
        </v-col>
    </v-row>
    <!-- <v-row>
        <v-col cols="12">
            <v-card class="pa" elevation="8">
                <v-stepper class="basic-1" v-model="e1">
                    <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1">
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 2" step="2">

                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3">
                        </v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step step="4">
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card class="mb-12 d-flex flex-column align-center">
                                <h3>Choose an Exchange</h3>
                                <GlobalsExchangeList class="mt-3" />
                            </v-card>

                            <div class="d-flex float-right">
                                <v-btn color="blue darken-1" class="mr-2" text>
                                    Cancel
                                </v-btn>
                                <v-btn color="primary" @click="e1 = 2">
                                    Continue
                                </v-btn>
                            </div>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <v-card class="mb-12 d-flex flex-column align-center">
                                <h3>Choose the strategy & Amount</h3>
                                <v-row class="d-flex align-center justify-center" style="width:100%;">
                                    <v-col cols="10">
                                        <v-text-field dense class="mt-2" v-model="applyBalance" label="Input amount to apply" outlined></v-text-field>
                                    </v-col>
                                    <v-col cols="2" class="mx-0">
                                        <v-chip large class="d-flex align-center justify-center" color="primary" label text-color="white">
                                            <v-icon left>
                                                mdi-currency-usd
                                            </v-icon>
                                            USDT
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-row class="d-flex align-center justify-center pt-0 mt-0" style="width:100%;">
                                    <v-col cols="12">
                                        <v-list dense elevation="0"> 
                                            <v-list-item-group v-model="selectedItem" color="primary">
                                                <v-list-item v-for="(item, i) in items" :key="i" class="mt-5">
                                                    <v-list-item-icon>
                                                        <v-icon small>mdi-checkbox-blank-circle-outline</v-icon>
                                                    </v-list-item-icon>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="item.text"></v-list-item-title>
                                                        <v-list-item-subtitle v-text="item.subText"></v-list-item-subtitle>
                                                    </v-list-item-content>
                                                    <v-list-item-icon>
                                                        <v-icon v-text="item.icon"></v-icon>
                                                    </v-list-item-icon>
                                                </v-list-item>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-col>
                                </v-row>
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
                            <v-card class="mb-12 d-flex flex-column align-center" height="200px">
                                <h3>Choose the strategy & Amount</h3>
                            </v-card>
                            <div class="d-flex float-right">
                                <v-btn color="blue darken-1" class="mr-2" @click="e1 = 2" text>
                                    Back
                                </v-btn>
                                <v-btn color="primary" @click="e1 = 3">
                                    Continue
                                </v-btn>
                            </div>
                        </v-stepper-content>
                        <v-stepper-content step="4">
                            <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                            <v-btn color="primary" @click="e1 = 1">
                                Continue
                            </v-btn>

                            <v-btn text>
                                Cancel
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
        </v-col>
    </v-row> -->
</div>
</template>

<script>
export default {
    layout: 'account',
    data() {
        return {
            // CHART
            title: 'Dashboard',
            series: [{
                name: 'series-1',
                data: [30, 40, 35, 50, 49, 60, 70, 91]
            }],
            e1: 1,
            showChart: false,
            deal: 0,
            // STEPPER VARIABLES
            applyBalance: 100,
            selectedItem: 1,
            items: [{
                    text: "Conservative",
                    subText: "Very Low Risk",
                    icon: "mdi-information"
                },
                {
                    text: "Moderate",
                    subText: "Low Risk",
                    icon: "mdi-information"
                },
                {
                    text: "Aggressive",
                    subText: "Medium Risk",
                    icon: "mdi-information"
                },
                {
                    text: "Very Aggressive",
                    subText: "Very High Risk",
                    icon: "mdi-information"
                },
            ],
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        chartData() {
            return {
                options: {
                    chart: {
                        id: 'vuechart-example',
                        background: '0'
                    },
                    xaxis: {
                        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                    },
                    theme: {
                        mode: this.$store.getters.theme
                    },
                    colors: this.$store.getters.theme == 'dark' ? '#49b5b2' : '#17576a'
                },
                series: [{
                    name: 'PnL',
                    data: [30, 40, 35, 50, 49, 60, 70, 91]
                }]
            }
        }
    },
    methods: {
        // FETCH API
        async _fetchChart() {
            let res = await this.$api.$get('/user/chart');
            console.log(this.chartData.options.xaxis.categories);
            console.log(this.chartData.series[0].data);
            this.chartData.options.xaxis.categories = res.categories;
            this.chartData.series[0].data = res.series;
        },
        async _fetchDailyDeals() {
            let res = await this.$api.$get('/user/deal', {
                params:{
                    range:'daily'
                }
            });
            this.deal = res.data.trades;
            console.log('dailyDeals', res);
        }
    },
    beforeMount() {
        this.$store.commit('setIsLoading', true);
    },
    mounted() {
        console.log(this.$store.getters.theme);
        this.$store.commit('setTitle', this.title);
        this._fetchChart();
        this._fetchDailyDeals();
        setTimeout(() => {
            this.$store.commit('setIsLoading', false);
            this.showChart = true;
        }, 500)
    }
}
</script>
