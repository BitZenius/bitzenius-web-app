<template>
  <v-card flat rounded class="pa-3 no-shadow">
    <h3 class="mb-4 text-h6 font-weight-bold">Initial setup</h3>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="d-flex flex-column align-start">
          <v-row class="d-flex align-end" style="width: 100%">
            <v-col cols="12" md="12" class="text-body-1 font-weight-bold">
              USDT Per Order
              <v-text-field
                ref="usdt_per_order"
                @blur="onUsdtPerOrderChanged(strategy.usdt_per_order)"
                v-model="strategy.usdt_per_order"
                required
                placeholder="USDT Per Order"
                hide-details=""
                rounded
                type="number"
                class="my-2 custom-input text-body-1"
              >
                <template v-slot:append>
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-avatar
                        v-bind="attrs"
                        v-on="on"
                        size="30"
                        color="white"
                        class="mx-0 my-1"
                      >
                        <v-img
                          max-width="25px"
                          max-height="25px"
                          src="/token_logo/USDT.png"
                          contain
                          position="center"
                        ></v-img>
                        <!-- <v-icon large dark> mdi-currency-usd </v-icon> -->
                      </v-list-item-avatar>
                    </template>
                    <span>The amount of USDT purchase per order</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col
              v-if="tokens.length > 0"
              cols="12"
              md="12"
              class="text-body-1 font-weight-bold"
            >
              Select Token
              <v-select
                dense
                class="mt-3 px-3"
                v-model="selectedToken"
                :items="tokensCopy"
                rounded
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field
                        v-model="searchTerm"
                        placeholder="Search"
                        @input="searchTokens"
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </div>
        <v-col cols="12" class="d-flex justify-end">
          <slot> </slot>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    selectedStrategy: Object,
    tokens: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      selectedStrategyName: null,
      strategy: {
        usdt_to_apply: 0,
        usdt_per_order: 0,
        max_concurrent_trading_pair: 0,
        style: {
          name: null,
        },
      },
      applyBalance: 100,
      selectedItem: 1,
      styleList: [],
      // CUSTOM STRATEGY
      customDrop: null,
      customBuy: null,
      customProfit: null,
      customType: null,
      customStyle: {
        name: "Custom",
        active: false,
        steps: [],
        key: "E",
      },
      types: ["DCA", "GRID"],

      // EDIT ROW
      editStep: null,

      // RECOMMENDED
      recommendedMaxTradingPair: [0, ""],

      // TOKEN
      searchTerm: "",
      tokensCopy: [],
      selectedToken: "BTCUSDT",
    };
  },
  methods: {
    searchTokens(e) {
      console.log(e);
      console.log(this.searchTerm);
      console.log(this.tokensCopy);
      if (!this.searchTerm) {
        this.tokensCopy = [...this.tokens];
      }

      this.tokensCopy = this.tokens.filter((exchange) => {
        return (
          exchange.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        );
      });
    },

    // FETCH API
    async fetchFormula() {
      console.log("FETCHING DATA USER BOT");
      let res = await this.$api.$get("/user/formula");
      this.styleList = res.data;
      this.styleList.push(this.customStyle);
      console.log("styleList", this.styleList);
    },

    // TRIGGER
    onUsdtPerOrderChanged(value) {
      let usdtValue = parseFloat(value);
      if (usdtValue < 15) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "USDT Per Order Cannot Be Under 15!",
          color: "customPink",
        });

        setTimeout(() => {
          this.strategy.usdt_per_order = 15;
          this.$refs.usdt_per_order.focus();
        });
      }

      this.resetRecommendedSettings();
    },
    onUsdtToApplyChanged(value) {
      this.resetRecommendedSettings();
    },

    selectRow(child, step) {
      if (this.editStep == step) {
        return;
      }
      this.customDrop = child.drop_rate;
      this.customBuy = child.multiplier;
      this.customProfit = child.take_profit;
      this.customType = child.type;

      this.editStep = step;
    },
    deleteRow(step) {
      // ACCOMMODATE ONLY THE LAST ITEM ON ARRAY
      this.strategy.style.steps.pop();
    },
    cancelRowChanges() {
      setTimeout(() => {
        this.customDrop = null;
        this.customBuy = null;
        this.customProfit = null;
        this.customType = null;
        this.editStep = null;
      }, 100);
    },
    saveRowChanges() {
      this.strategy.style.steps[this.editStep] = {
        step: this.editStep,
        drop_rate: this.customDrop,
        multiplier: this.customBuy,
        take_profit: this.customProfit,
        type: this.customType,
      };

      setTimeout(() => {
        this.customDrop = null;
        this.customBuy = null;
        this.customProfit = null;
        this.customType = null;
        this.editStep = null;
      }, 100);
    },
    addRowCustom(drop, multiplier, profit, type) {
      // if GRID selected, don't allow to select DCA;
      if (type == "GRID") {
        this.types = ["GRID"];
      }

      if (!drop || !multiplier || !profit) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Please don't leave any strategy input empty!",
          color: "customPink",
        });
      } else {
        let strategy = {};
        strategy.step = this.customStyle.steps.length;
        strategy.drop_rate = parseFloat(drop);
        strategy.multiplier = parseFloat(multiplier);
        strategy.take_profit = parseFloat(profit);
        strategy.type = type;
        this.customStyle.steps.push(strategy);
        this.customDrop = null;
        this.customBuy = null;
        this.customProfit = null;
        this.customType = null;
        // this.styleList[4] = this.customStyle;
      }
    },
    resetRowCustom() {
      this.types = ["DCA", "GRID"];
      this.customStyle = {
        name: "Custom",
        active: true,
        steps: [],
        key: "E",
      };
      this.styleList[4] = this.customStyle;
      this.strategy.style = this.customStyle;
      this.$forceUpdate();
    },
    removeRowCustom(index) {
      this.customStyle.steps[index];
    },
    selectStyleByName(val) {
      for (let i = 0; i < this.styleList.length; i++) {
        if (this.styleList[i].name == val) {
          this.selectStyle(this.styleList[i]);
          break;
        }
      }
    },
    selectStyle(val) {
      console.log(val);
      this.strategy.style = val;
      for (let i = 0; i < this.styleList.length; i++) {
        this.styleList[i].active = false;
      }
    },

    clearData() {
      alert("TESTREF");
      this.strategy = {
        usdt_to_apply: 0,
        usdt_per_order: 0,
        max_concurrent_trading_pair: 0,
        style: {
          name: null,
        },
      };
      this.styleList = [];
      this.fetchFormula();
    },

    async _logger() {
      console.log("strategy", this.strategy);
      console.log("styleList", this.styleList);
      console.log(this.customStyle);

      // await this.fetchFormula
    },

    // RECOMMENDED SETTINGS
    resetRecommendedSettings() {
      this.recommendedMaxTradingPair = [0, ""];
    },
    recommendSettings() {
      if (!this.selectedStrategyName) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Please select strategy",
          color: "customPink",
        });
        return false;
      } else if (this.strategy.usdt_per_order < 15) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "USDT Per Order Cannot Be Under 15!",
          color: "customPink",
        });
        return false;
      }

      this.recommendedMaxTradingPair = this.recommendMaxTradingPairs(
        this.strategy.style.steps,
        this.strategy.usdt_to_apply,
        this.strategy.usdt_per_order
      );
      this.strategy.max_concurrent_trading_pair = Math.floor(
        this.recommendedMaxTradingPair[0]
      );
    },

    /**
     *
     * @param {*} array Array of steps
     * @param {*} usdt_to_apply
     * @param {*} usdt_per_order
     * @returns Array[recommended value, text: recommended value ex: between x - x]
     * Calculate recommended max trading pairs by user's total usdt to apply and usdt per order
     */
    recommendMaxTradingPairs(array, usdt_to_apply, usdt_per_order) {
      console.log(array);
      var total_usdt_per_pair = 0;

      if (array.length < 1) {
        return [0, ""];
      }

      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        total_usdt_per_pair += usdt_per_order * element.multiplier;
      }

      var recommended_pair = usdt_to_apply / total_usdt_per_pair;
      var recommended_pair_text = `Recommended max trading pairs: ${Math.floor(
        recommended_pair
      )} - ${Math.ceil(recommended_pair)}`;

      return [recommended_pair, recommended_pair_text];
    },
  },
  mounted() {
    if (this.selectedStrategy) {
      this.strategy = { ...this.selectedStrategy };
      this.selectedStrategyName = this.strategy.style.name;
    }
    this.fetchFormula();
  },
  watch: {
    strategy: {
      handler(nv, ov) {
        nv.usdt_to_apply = nv.usdt_to_apply ? parseFloat(nv.usdt_to_apply) : 1;
        nv.usdt_per_order = nv.usdt_per_order
          ? parseFloat(nv.usdt_per_order)
          : 1;
        nv.max_concurrent_trading_pair = nv.max_concurrent_trading_pair
          ? parseFloat(nv.max_concurrent_trading_pair)
          : 1;

        this.$emit("onSelected", nv);
      },
      deep: true,
    },
    tokens: {
      handler(nv, ov) {
        this.tokensCopy = [...nv];
      },
      immediate: true,
    },
    selectedStrategyName: {
      handler(nv, ov) {
        this.recommendedMaxTradingPair = [0, ""];
        this.selectStyleByName(nv);
      },
    },
    selectedToken(nv, ov) {
      this.$emit("changedSelectedToken", nv);
    },
  },
};
</script>

<style>
.custom-input {
  margin-top: 0px !important;
  padding: 0px !important;
}
</style>
