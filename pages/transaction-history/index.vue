<template>
  <div>
    <v-row class="mb-0 pb-0" align="center" justify="space-between">
      <v-col cols="8">
        <v-row>
          <v-col cols="12" md="8" class="text-h6 font-weight-bold pl-3">
            {{ title }}
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <GlobalsExchangeList />
      </v-col>
    </v-row>
    <v-row class="mt-0 pt-0">
      <v-col cols="12">
        <template>
          <v-card class="pa-3 mb-5" flat rounded>
            <v-tabs class="pa-2" v-model="currentItem">
              <v-tab :ripple="false" v-for="item in tables" :key="item">
                <span class="text-body-2 text-capitalize">{{ item }}</span>
              </v-tab>
            </v-tabs>
          </v-card>
          <v-card class="pa-3" flat rounded>
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
  </div>
</template>
<script>
import TradingHistory from "./trading-history.vue";
import ProfitHistory from "./profit-history.vue";
export default {
  layout: "account",
  components: {
    TradingHistory,
    ProfitHistory,
  },
  data() {
    return {
      currentItem: "tab-Web",
      tables: ["Daily Profit", "All Trading History"],
      title: "Transaction Report",
      isLoading: true,
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    tradingItemsFiltered() {
      console.log("test");
      let temp = this.tradingItems;
      if (this.searchQuery != "" && this.searchQuery) {
        temp = temp.filter((position) => {
          return position.pair
            .toUpperCase()
            .includes(this.searchQuery.toUpperCase());
        });
      }
      return temp;
    },
    lastPage() {
      return Math.ceil(this.tradingItemsFiltered.length / 10);
    },
    dateRangeText() {
      return this.dates.join(" - ");
    },
  },
  mounted() {
    this.$store.commit("setTitle", this.title);
  },
  methods: {},
  watch: {
    currentItem: {
      handler(nv, ov) {},
      deep: true,
    },
  },
};
</script>
