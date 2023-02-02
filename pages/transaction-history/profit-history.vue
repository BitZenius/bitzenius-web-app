<template>
    <div>
        <v-row class="mt-1">
            <v-col cols="12" md="3">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateRangeText" label="Date Range Picker" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined dense></v-text-field>
                    </template>
                    <v-date-picker v-model="dates" range no-title scrollable>
                        <v-btn text color="customPink" @click="onClearDates()">
                            Clear
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="onDateChanged(dates)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <!-- <v-btn x-small @click="logger">logger</v-btn> -->
            </v-col>
        </v-row>
        <v-dialog v-model="onDetailClicked" max-width="600" :fullscreen="$vuetify.breakpoint.mobile">
            <template>
                <v-card elevation="5">
                    <v-card-title class="text-h6 lighten-2">
                        <v-row>
                            <v-col cols="6" class="d-flex justify-start">Detail Profit</v-col>
                            <v-col cols="6" class="d-flex justify-end">
                                <v-btn icon @click="onBack">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text class="my-2">
                        <v-data-table :loading="isLoading" :headers="tradingHeadersDetail" :items="tradingItemsDetail" class="elevation-2 my-2">
                            <template v-slot:item.pair="{item}">
                                <v-row>
                                    <!-- <code>{{item.pair_from}}</code>
                                    <code>{{item.pair_to}}</code> -->
                                    <v-col cols="12" class="d-flex align-center justify-start">
                                        <img style="width:28px;" :alt="item.pair" :src="getImgUrl(item.pair_from)" />
                                        <div class="d-flex flex-column ml-3">
                                            <div class="d-flex flex-column">
                                                <div class="d-flex">
                                                    <strong>{{item.pair_from}} </strong>
                                                    <span>&nbsp;/ {{item.pair_to}}</span>
                                                </div>
                                                <small class="primary--text">{{item._id}}</small>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:item.date="{item}">
                                <small>                                
                                    {{$moment(item.executed_at).format("DD/MM/YYYY HH:mm")}}
                                </small>
                            </template>
                            <template v-slot:item.price="{item}">
                                <v-chip small v-if="parseFloat(item.pnl) > 0" class="customGreen black--text" style="font-weight:bold;">
                                    <span>${{item._profit.first}}<small>.{{item._profit.second}}</small></span>                
                                </v-chip>
                                <v-chip small v-else class="customPink" style="font-weight:bold;">
                                    <span>${{item._profit.first}}<small>.{{item._profit.second}}</small></span>                
                                </v-chip>
                            </template>
                            <template v-slot:item.qty="{item}">
                                <span>{{item.amount_coin_filled}}</span>                
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </template>
        </v-dialog>
        <v-data-table @click:row="onRowClicked" :loading="isLoading" :headers="tradingHeaders" :items="profitItemsFiltered" class="elevation-2 my-2">
            <template v-slot:item.date="{item, index}">
                {{$moment(new Date(item._id.year,item._id.month-1,item._id.day)).format("DD / MMM / YYYY")}}
            </template>
            <template v-slot:item.profit="{item}">
                <v-chip small v-if="parseFloat(item.profit) > 0" class="customGreen black--text" style="font-weight:bold;">
                    <!-- {{item.profit | currency('$', 3)}} -->
                    <span>${{item._profit.first}}<small>.{{item._profit.second}}</small></span>
                </v-chip>
                <v-chip small v-else class="customPink" style="font-weight:bold;">
                    <!-- {{item.profit | currency('$', 3)}} -->
                    <span>${{item._profit.first}}<small>.{{item._profit.second}}</small></span>
                </v-chip>
            </template>
            <template v-slot:item.action="{item}">
                <v-btn
                icon
                color="primary"
                depressed
                >
                <v-icon>mdi-eye</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<script>
export default {
    layout: 'trading-history',
    data() {
        return {
            title: 'Transaction Report',
            isLoading:true,
            // ID, Type, Date, Profit, Price, Qty
            tradingHeaders: [
                {
                    text: "Date",
                    align: "start",
                    value: "date"
                },
                {
                    text: "Total Profit",
                    align: "start",
                    value: "profit",
                    cellClass: "font-weight-bold"
                },
                {
                    text: "",
                    align: "center",
                    value: "action",
                },
            ],
            // ID, Type, Date, Profit, Price, Qty
            profitItems: [],

            // DATERANGE
            dates: [],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,

            // SEARCHING
            searchQuery: null,
            // SORTING PURPOSE
            availableSorting: [{
                    id: "symbol",
                    name: "Trading Pair"
                },
                {
                    id: "created_at",
                    name: "Date"
                },
                {
                    id: "side",
                    name: "Type"
                }
            ],

            // MODAL DETAIL
            onDetailClicked:false,
            tradingHeadersDetail: [{
                    text: "Pair",
                    align: "start",
                    value: "pair"
                },
                {
                    text: "Date",
                    align: "start",
                    value: "date"
                },
                {
                    text: "Profit",
                    align: "center",
                    value: "price",
                    cellClass: "font-weight-bold"

                },
                {
                    text: "Qty",
                    align: "center",
                    value: "qty",
                    cellClass: "font-weight-bold"

                },
            ],
            tradingItemsDetail:[]
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        profitItemsFiltered() {
            let temp = this.profitItems;
            if (this.searchQuery != '' && this.searchQuery) {
                temp = temp.filter((position) => {
                    return position.pair
                        .toUpperCase()
                        .includes(this.searchQuery.toUpperCase())
                })
            }
            return temp
        },
        lastPage() {
            return Math.ceil(this.profitItemsFiltered.length / 10);
        },
        dateRangeText() {
            return this.dates.join(' - ')
        },
        exchange(){
            return this.$store.state.exchange.selectedExchange;
        }
    },
    mounted() {
        this.$store.commit('setTitle', this.title)
        this._fetchReport(null);
    },
    methods: {
        logger(){
            this._fetchReport(null);
        },
        async _fetchReport(sorting) {
            this.isLoading = true;
            let tempParams = {};
            tempParams.exchange = this.exchange;
            tempParams.onlyUser = true;

            if (sorting) {
                tempParams.sorting = sorting;
            }

            if (this.dates.length > 0){
                console.log(this.dates);
                tempParams.dates = this.dates;
            }

            console.log('paramsFetcHReport', tempParams);
            let res = await this.$api.$get('/user/profit-report', {
                params: tempParams
            }).then(res=>{
                this.$store.commit('setIsLoading', false);
                if(res.success){
                    res.data.forEach((val)=>{
                        if(val.profit<0) console.log(val);
                        val._profit = {};
                        let string = String(val.profit.toFixed(4)).split(".");
                        if(val.profit<0) console.log(string);
                        val._profit.first = val.profit < 0? string[0] : parseFloat(string[0]);
                        val._profit.second = parseFloat(string[1]);
                    })
                    this.profitItems = res.data;
                    this.isLoading = false
                }else{
                this.$store.commit('setIsLoading', false);
                    this.$store.commit('setShowSnackbar', {
                        show: true,
                        message: "Error",
                        color: "customPink"
                    })
                    this.isLoading = false
                }
            }).catch(err => {
                his.$store.commit('setIsLoading', false);
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: err.message,
                    color: "customPink"
                })
                this.isLoading = false
            })

        },

        // FUNCTION
        getImgUrl(val){
            try{
                let url = require('@/static/token_logo/'+val.toUpperCase()+'.png');
                return '/token_logo/'+val.toUpperCase()+'.png'
            }catch(err){
                console.log('img not exist', val)
                return '/token_logo/default.png'
            }
        },
        // TRIGGER
        onRowClicked(row){
            console.log('onRowClicked', row);
            let tempArray = [];
            // this.tradingItemsDetail = row.data;
            row.data.forEach((val)=>{
                console.log(val);
                // PROFIT
                val._profit = {};
                let string = String(val.pnl.toFixed(4)).split(".");
                val._profit.first = val.pnl < 0? string[0] : parseFloat(string[0]);
                val._profit.second = parseFloat(string[1]);

                // SYMBOL TO PAIR
                val.pair_from = val.symbol.substr(0, val.symbol.length - 4)
                val.pair_to = val.symbol.substr(-4)

                tempArray.push(val);
            })
            this.tradingItemsDetail = tempArray;
            this.onDetailClicked = true;
            console.log('tradingItemsDetail', row.data);
        },
        onBack(){
            this.onDetailClicked = false;
            this._fetchReport();
            this.$forceUpdate();
        },
        onDateChanged(dates) {
            let sort = {};
            this._fetchReport()
        },
        onClearDates(){
            this.dates = [];
            this.menu = false;
            this._fetchReport();
        }
    },
    watch:{
        exchange(nv,ov){
            this._fetchReport(null);
            this.$store.commit('setIsLoading', true);
        }
    }
}
</script>
