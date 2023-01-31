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
                        <ProfitHistory v-if="currentItem == 0" ref="profitRef" />
                        <TradingHistory v-if="currentItem == 1" ref="tradingRef" />
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </template>
    </v-col>
</v-row>
</template>
<script>
import TradingHistory from './trading-history.vue'
import ProfitHistory from './profit-history.vue'
export default {
    layout: 'account',
    components:{
        TradingHistory,
        ProfitHistory
    },
    data() {
        return {
            currentItem: 'tab-Web',
            tables: [
                'Daily Profit',
                'Trading Report'
            ],
            title: 'Transaction Report',
            isLoading:true,
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        tradingItemsFiltered() {
            console.log('test');
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
    },
    methods: {

    },
    watch: {
        currentItem: {
            handler(nv, ov) {

            },
            deep: true
        }
    }
}
</script>
