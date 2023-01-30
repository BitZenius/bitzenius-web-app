<template>
<div>
    <!-- <v-row>
        <v-col cols="12" md="4">
            <GlobalsExchangeList />
        </v-col>
    </v-row> -->
    <v-row>
        <v-col cols="12" md="6">
            <CardCredit :balance="balance"/>
        </v-col>
        <v-col cols="12" md="6">
            <CardAsset :balance="balance"/>
        </v-col>
        <v-col cols="12" md="6">
            <CardProfit :profit="profit" />
        </v-col>
        <v-col cols="12" md="6">
            <CardDeals :deal="deal" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <CardBalance class="px-2 py-5" />
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
    </v-row>
    <v-row>
        <v-col cols="12">
            <TablesActivePosition />
        </v-col>
    </v-row>
</div>
</template>
<script>
export default {
    layout: 'account',
    data() {
        return {
            // CHART
            exchange:'Binance',
            title: 'Dashboard',
            series: [{
                name: 'PnL',
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
            chartData: {
                options: {
                    colors:['#F44336', '#E91E63', '#9C27B0'],
                    chart: {
                        id: 'vuechart-example',
                        background: '0'
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (value) {
                            console.log(`value: ${value}`);
                            let val = (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            return '$ '+val;
                        }
                    },
                    fill:{
                        opacity:1
                    },
                    yaxis: {
                        style:{
                            colors:['#3394f8']
                        },
                        labels: {
                            formatter: function (value) {
                                console.log(`value: ${value}`);
                                let val = (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                                return '$ '+val;
                            }
                        },
                    },
                    xaxis: {
                        categories: []
                    },
                    theme: {
                        mode: this.$store.getters.theme
                    },
                    colors: this.$store.getters.theme == 'dark' ? '#3394F8' : '#3394F8'
                },
                series: [{
                    name: 'P&L',
                    data: []
                }]
            },
            profit:0,
            balance:{}
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        userToken(){
            return this.$store.state.token;
        }
    },
    methods: {
        // FETCH API
        async _fetchUserBalance() {
            let res = await this.$api.$get('/user/user-exchange-balance', {
                params: {
                    exchange: this.exchange,
                    onlyUser: true,
                    range: 'daily',
                    side: "SELL",
                    token:this.userToken
                }
            });
            console.log('userBalance', res);
            this.balance = res.data;
        },
        async _fetchProfit(){
            let res = await this.$api.$get('/user/profit',{
                params:{
                exchange:this.exchange,
                onlyUser:true,
                range:'daily',
                side:"SELL"
                }
            });
            console.log('userProfit', res);
            this.profit = res.data.profit;
        },
        async _fetchChart() {
            let res = await this.$api.$get('/user/chart');
            this.chartData.options.xaxis.categories = res.categories;
            let value = [];
            res.series.forEach((val)=>{
                let convert = "$"+(parseFloat(val)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                value.push(convert)
            })
            this.chartData.series[0].data = res.series;
            // this.chartData.series[0].data = value;
            this.showChart = true;
        },
        async _fetchDailyDeals() {
            let res = await this.$api.$get('/user/deal', {
                params: {
                    range: 'daily'
                }
            });
            this.deal = res.data ? res.data.trades : 0;
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
        this._fetchUserBalance();
        this._fetchProfit();
        setTimeout(() => {
            this.$store.commit('setIsLoading', false);
        }, 500)
    }
}
</script>
