<template>
<v-row>
    <v-col cols="12">
        <template>
            <v-card class="pa-3">
                <v-tabs v-model="currentItem">
                    <v-tab v-for="item in tables" :key="item">
                        <h4>{{item}}</h4>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="currentItem">
                    <v-tab-item v-for="item in tables" :key="item">
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
                            <v-col cols="12" md="3">
                                <v-text-field prepend-icon="mdi-magnify" v-model="searchQuery" label="Search By Pair" placeholder="Search By Pair" outlined dense></v-text-field>
                                <!-- <v-select item-value="id" item-text="name" @change="onPairSelected(pairSelected)" v-model="pairSelected" :items="availablePair" label="Filter by Pair" dense outlined></v-select> -->
                            </v-col>
                            <v-col cols="6" md="3">
                                <v-select item-value="id" item-text="name" v-model="sortSelected" :items="availableSorting" label="Sorting By" dense outlined></v-select>
                            </v-col>
                            <v-col cols="6" md="3">
                                <v-btn :class="{success:ascending}" @click="onSortClicked(sortSelected, 'ascending')">
                                    <v-icon>
                                        mdi-arrow-up-circle
                                    </v-icon>
                                </v-btn>
                                <v-btn :class="{success:descending, 'ml-2':true}" @click="onSortClicked(sortSelected, 'descending')">
                                    <v-icon>
                                        mdi-arrow-down-circle
                                    </v-icon>
                                </v-btn>
                                <v-btn class="ml-2" @click="resetFilter()">
                                    Reset
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-data-table v-if="item == 'Trading Report'" :headers="tradingHeaders" :items="tradingItemsFiltered" class="elevation-2 my-2" disable-sort>
                            <template v-slot:item.pair="{item}">
                                <v-row>
                                    <v-col cols="12" class="d-flex align-center justify-start">
                                        <!-- <img style="width:28px;" :alt="item.logo" :src="require(`~/assets/token_logo/${item.logo}`)" /> -->
                                        <div class="d-flex flex-column ml-3">
                                            <div class="d-flex flex-column">
                                                <strong>{{item.pair}}</strong>
                                                <small class="primary--text">{{item.id}}</small>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:item.type="{item}">
                                <v-chip small v-if="item.type == 'buy'" color="info">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
                                <v-chip small v-else color="orange" class="white--text">
                                    {{item.type.toUpperCase()}}
                                </v-chip>
                            </template>
                            <template v-slot:item.date="{item}">
                                {{$moment(item.date).format("DD/MM/YYYY HH:mm")}}
                            </template>
                            <template v-slot:item.desc="{item}">
                                <div class="d-flex">
                                    <!-- <v-chip small v-if="item.type == 'buy'" color="info">
                                    </v-chip> -->
                                    <div v-if="item.type == 'buy'" class="d-flex flex-column">
                                        <small>{{item.type.toUpperCase() == 'BUY' ? 'Step' : null}}</small>
                                        <span style="font-weight:bold;">
                                            {{item.desc}}
                                        </span>
                                    </div>
                                    <div v-else class="d-flex flex-column">
                                        <small>{{item.type.toUpperCase() == 'SELL' ? 'PnL' : null}}</small>
                                        <span v-if="parseFloat(item.desc) > 0" class="success--text" style="font-weight:bold;">
                                            {{item.desc | currency}}
                                        </span>
                                        <span v-else class="danger--text">
                                            {{item.desc}}
                                        </span>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:item.price="{item}">
                                {{item.price |currency}}
                            </template>
                        </v-data-table>
                        <template v-slot:item.amount="{item}">
                            <span style="color:green; font-weight:bold;">{{item.amount}}</span>
                        </template>
                        </v-data-table>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </template>
    </v-col>
</v-row>
</template>

<script>
export default {
    layout: 'account',
    data() {
        return {
            currentItem: 'tab-Web',
            tables: [
                'Trading Report'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in',
            title: 'Transaction Report',
            showClaimRewardModal: false,
            // ID, Type, Date, Profit, Price, Qty
            tradingHeaders: [{
                    text: "Pair",
                    align: "start",
                    value: "pair"
                },
                {
                    text: "Type",
                    align: "start",
                    value: "type"
                },
                {
                    text: "Date",
                    align: "start",
                    value: "date"
                },
                {
                    text: "Desc",
                    align: "start",
                    value: "desc",

                },
                {
                    text: "Price",
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
            // ID, Type, Date, Profit, Price, Qty
            tradingItems: [],
            claimHeaders: [{
                    text: "Date",
                    align: "start",
                    value: "date"
                },
                {
                    text: "Description",
                    align: "start",
                    value: "description",

                },
                {
                    text: "Reward Claimed",
                    align: "center",
                    value: "amount",
                    cellClass: "font-weight-bold"

                }
            ],
            refferalId: "123XYZ",

            // DATERANGE
            dates: [],
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            // SEARCHING
            searchQuery: null,
            // SORTING PURPOSE
            availablePair: [],
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
            pairSelected: null,
            sortSelected: null,
            ascending: false,
            descending: false
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        tradingItemsFiltered() {
            let temp = this.tradingItems;
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
            return Math.ceil(this.tradingItemsFiltered.length / 10);
        },
        dateRangeText() {
            return this.dates.join(' - ')
        },
    },
    mounted() {
        this.$store.commit('setTitle', this.title)
        this._fetchReport(null);
        if (!this.sortSelected) {
            this.sortSelected = this.availableSorting[1].id;
            this.descending = true;
            this._fetchReport({
                created_at: 'descending'
            });
        }
    },
    methods: {
        // FETCH API
        async _fetchReport(sorting) {
            this.$store.commit('setIsLoading', true);
            let tempParams = {};
            if (this.pairSelected) {
                tempParams.symbol = this.pairSelected;
            }
            if (sorting) {
                tempParams.sorting = sorting;
            }

            if (this.dates.length > 0){
                console.log(this.dates);
                tempParams.dates = this.dates;
            }

            let res = await this.$api.$get('/user/trading-history', {
                params: tempParams
            });
            this.tradingItems = res.data;
            this.availablePair = res.pairs;
            this.$store.commit('setIsLoading', false);
        },
        // TRIGGER
        onDateChanged(dates) {
            let sort = {};
            this._fetchReport()
        },
        onPairSelected(pair) {
            this._fetchReport(null);
        },
        onSortClicked(by, dest) {
            if (dest == 'ascending') {
                this.descending = false;
                this.ascending = true;
            } else {
                this.descending = true;
                this.ascending = false;
            }
            if (!by) alert("Please, select atleast one sorting by")
            let sort = {};
            sort[by] = dest;
            this._fetchReport(sort);
        },
        resetFilter() {
            this.descending = false;
            this.ascending = false;
            this.pairSelected = null;
            this.searchQuery = null;
            this.dates = [];
            this._fetchReport(null);
        },
        closeModal() {
            alert('closeModal')
        }
    }
}
</script>
