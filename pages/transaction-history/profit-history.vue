<template>
    <div>
        <v-row class="mt-1">
            <v-col cols="12" md="3">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateRangeText" label="Date Range Picker" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined dense></v-text-field>
                    </template>
                    <v-date-picker v-model="dates" range no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="onDateChanged(dates)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>
        </v-row>
        <v-data-table :loading="isLoading" :headers="tradingHeaders" :items="profitItemsFiltered" class="elevation-2 my-2">
            <template v-slot:item.date="{item, index}">
                {{$moment(new Date(item._id.year,item._id.month-1,item._id.day)).format("DD / MMM / YYYY")}}
            </template>
            <template v-slot:item.profit="{item}">
                <v-chip small v-if="parseFloat(item.profit) > 0" class="customGreen black--text" style="font-weight:bold;">
                    {{item.profit | currency('$', 3)}}
                </v-chip>
                <v-chip small v-else class="customPink" style="font-weight:bold;">
                    {{item.profit | currency('$', 3)}}
                </v-chip>
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

                }
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
            ]
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
    },
    mounted() {
        this.$store.commit('setTitle', this.title)
        this._fetchReport(null);
    },
    methods: {
        logger(){
            console.log(this.dates);
            this._fetchReport(null);
        },
        async _fetchReport(sorting) {
            this.isLoading = true;
            let tempParams = {};
            tempParams.exchange = "Binance";
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
                console.log('fetchReport', res);
                if(res.success){
                    this.profitItems = res.data;
                    this.isLoading = false
                }else{
                    this.$store.commit('setShowSnackbar', {
                        show: true,
                        message: "Error",
                        color: "customPink"
                    })
                    this.isLoading = false
                }
            }).catch(err => {
                this.$store.commit('setShowSnackbar', {
                    show: true,
                    message: err.message,
                    color: "customPink"
                })
                this.isLoading = false
            })

        },
        // TRIGGER
        onDateChanged(dates) {
            let sort = {};
            this._fetchReport()
        },
    }
}
</script>
