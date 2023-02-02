<template>
<div>
    <v-row>
        <v-col cols="12" md="4">
            <GlobalsExchangeList @on-exchange-changed="onExchangeChanged"/>
        </v-col>
    </v-row>
    <v-row v-if="exchange">
        <v-col cols="12" md="6" lg="3">
            <CardCredit :balance="balance" :loading="isLoading"/>
        </v-col>
        <v-col cols="12" md="6" lg="3">
            <CardAsset :balance="balance" :loading="isLoading"/>
        </v-col>
        <v-col cols="12" md="6" lg="3">
            <CardProfit :profit="profit" :loading="isLoadingProfit"/>
        </v-col>
        <v-col cols="12" md="6" lg="3">
            <CardDeals :deal="deal" :loading="isLoadingProfit" />
        </v-col>
    </v-row>
    <v-row v-if="exchange">
        <v-col cols="12">
            <CardBalance class="px-2 py-5" />
        </v-col>
    </v-row>
    <v-row v-if="exchange">
        <v-col cols="12" md="12">
            <v-card class="pa-2" elevation="8">
                <v-sheet v-if="showChart && chartData.series[0].data.length>0" class="text-h6 font-weight-bold ma-4">
                    Daily Profit Revenue
                </v-sheet>
                <apexchart v-if="showChart && chartData.series[0].data.length>0" height="300" type="bar" :options="chartData.options" :series="chartData.series"></apexchart>
                <h4 class="d-flex justify-center align-center" v-else>You don't have any profit record!</h4>
            </v-card>
        </v-col>
    </v-row>
    <v-row v-if="exchange">
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
            balance:{},
            isLoading: false,
            isLoadingProfit: false,
            isLoadingDeals: false
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
        },
        exchange(){
            return this.$store.state.exchange.selectedExchange;
        }
    },
    methods: {
        // FETCH API
        async _fetchUserBalance() {
            this.isLoading = true
            let res = await this.$api.$get('/user/user-exchange-balance', {
                params: {
                    exchange: this.exchange,
                    onlyUser: true,
                    range: 'daily',
                    side: "SELL",
                    token:this.userToken
                }
            });
            this.isLoading = false
            this.balance = res.data;
            this.$store.commit('setIsLoading', false);
        },
        async _fetchProfit(){
            this.isLoadingProfit = true
            let res = await this.$api.$get('/user/profit',{
                params:{
                    exchange:this.exchange,
                    onlyUser:true,
                    range:'daily',
                    side:"SELL"
                }
            });
            this.isLoadingProfit = false
            this.profit = res.data.profit;
            this.$store.commit('setIsLoading', false);
        },
        async _fetchChart() {
            let res = await this.$api.$get('/user/chart',{
                params:{
                    exchange:this.exchange
                }
            });
            this.showChart = true;
            console.log('-fetchChart', res);
            this.$store.commit('setIsLoading', false);

            console.log('chartData', this.chartData)
            if(res.series.length <= 0){ // IS EMPTY
                this.chartData.options.xaxis.categories = [];
                this.chartData.series  = [{name: 'P&L',data: []}]
            }else{
                this.chartData.options.xaxis.categories = res.categories;
                let value = [];
                res.series.forEach((val)=>{
                    let convert = "$"+(parseFloat(val)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    value.push(convert)
                })
                this.chartData.series[0].data = res.series;
            }
        },
        async _fetchDailyDeals() {
            this.isLoadingDeals = true
            let res = await this.$api.$get('/user/deal', {
                params: {
                    range: 'daily'
                }
            });
            this.deal = res.data ? res.data.trades : 0;
            this.isLoadingDeals = false
            this.$store.commit('setIsLoading', false);
        },

        // TRIGGER
        onExchangeChanged(){
            this.$store.commit('setIsLoading', true);
            this._fetchChart();
            this._fetchDailyDeals();
            this._fetchProfit();
            this._fetchUserBalance();
        }
    },
    beforeMount() {
        this.$store.commit('setIsLoading', true);
    },
    async mounted() {
        this.$store.commit('setTitle', this.title);
        this._fetchChart();
        this._fetchDailyDeals();
        this._fetchUserBalance();
        this._fetchProfit();
        setTimeout(() => {
            this.$store.commit('setIsLoading', false);
        }, 500)
    },
    watch:{
        exchange(nv,ov){
            this.$store.commit('exchange/setSelectedExchange',nv);
            this._fetchChart();
            this._fetchDailyDeals();
            this._fetchUserBalance();
            this._fetchProfit();
        }
    }
}
</script>
