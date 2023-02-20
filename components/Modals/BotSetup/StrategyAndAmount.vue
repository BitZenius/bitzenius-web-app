<template>
  <v-row align="start" justify="start">
    <v-col :cols="strategy.style.name !== null ? 6 : 12">
      <v-card flat rounded class="pa-5 mt-2">
        <v-row align="center" justify="center">
          <v-col :cols="strategy.style.name !== null ? 12 : 8">
            <div class="d-flex flex-column align-start">
              <h3 class="mb-4 text-h6 font-weight-bold">Choose the Amount</h3>
              <!-- <v-btn small @click="_logger">logger</v-btn> -->

              <v-row class="d-flex align-end" style="width: 100%">
                <v-col cols="6" md="6" class="text-body-1 font-weight-bold">
                  Total USDT To Apply
                  <v-text-field
                    v-model="strategy.usdt_to_apply"
                    @blur="onUsdtToApplyChanged(strategy.usdt_to_apply)"
                    required
                    placeholder="Total USDT To Apply"
                    hide-details=""
                    rounded
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
                        <span
                          >The maximum amount of USDT to be spent for the
                          bot</span
                        >
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="6" md="6" class="text-body-1 font-weight-bold">
                  USDT Per Order
                  <v-text-field
                    ref="usdt_per_order"
                    @blur="onUsdtPerOrderChanged(strategy.usdt_per_order)"
                    v-model="strategy.usdt_per_order"
                    required
                    placeholder="USDT Per Order"
                    hide-details=""
                    rounded
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

                <v-col cols="6" md="6" class="text-body-1 font-weight-bold">
                  Max Concurrent Trading Pair
                  <v-text-field
                    v-model="strategy.max_concurrent_trading_pair"
                    required
                    placeholder="Max Concurrent Trading Pair"
                    hide-details=""
                    rounded
                    class="my-2 custom-input text-body-1"
                  >
                    <template v-slot:append>
                      <v-tooltip bottom color="primary">
                        <template v-slot:activator="{ on, attrs }">
                          <v-chip
                            v-bind="attrs"
                            v-on="on"
                            class="d-flex align-center justify-center"
                            color="primary"
                            label
                            rounded
                            small
                            text-color="white"
                          >
                            <v-icon left> mdi-link-box-variant-outline </v-icon>
                            PAIR
                          </v-chip>
                        </template>
                        <span
                          >The maximum amount of USDT to be spent for the
                          bot</span
                        >
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col
                  cols="6"
                  v-if="recommendedMaxTradingPair[1] !== ''"
                  style="height: 100%"
                >
                  <i class="text-body-1">*{{ recommendedMaxTradingPair[1] }}</i>
                </v-col>
                <v-col
                  v-if="false"
                  cols="6"
                  md="6"
                  class="text-body-1 font-weight-bold"
                >
                  Total USDT To Apply
                  <v-text-field
                    required
                    placeholder="Total USDT To Apply"
                    hide-details=""
                    rounded
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
                        <span
                          >The maximum amount of USDT to be spent for the
                          bot</span
                        >
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>

              <h3 class="my-4 text-h6 font-weight-bold">Choose the Strategy</h3>
              <v-row
                class="d-flex align-center justify-center pt-0 mt-0"
                style="width: 100%"
              >
                <v-col cols="12">
                  <v-radio-group v-model="selectedStrategyName">
                    <v-row
                      class="d-flex align-start justify-start pt-0 mt-0"
                      style="width: 100%"
                    >
                      <v-col
                        cols="4"
                        class="pt-0"
                        v-for="(item, i) in styleList"
                        :key="item.name"
                      >
                        <v-radio :value="item.name">
                          <template v-slot:label>
                            <strong class="text-body-2 font-weight-bold">{{
                              item.name
                            }}</strong>
                          </template>
                        </v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </v-col>
              </v-row>
            </div>
            <v-row>
              <v-col cols="6">
                <!-- <v-tooltip top color="primary">
                  <template v-slot:activator="{ on, attrs }">

                  </template>
                  <span
                    >Please select strategy, Total USDT to apply, and USDT per
                    order to use this feature</span
                  >
                </v-tooltip> -->
                <v-btn
                  :disabled="selectedStrategyName == null"
                  color="primary"
                  rounded
                  @click="recommendSettings"
                >
                  Use Recommended Settings</v-btn
                >
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <slot> </slot>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col
      v-if="selectedStrategyName !== null && strategy.style.steps"
      cols="6"
    >
      <v-card flat rounded class="pa-5 mt-2">
        <h3 class="mb-4">{{ selectedStrategyName }}</h3>

        <v-simple-table
          v-if="strategy.style.steps"
          :key="`${strategy.style.name}`"
          dense
          style="overflow-y: auto; max-height: 400px"
        >
          <template>
            <thead>
              <tr>
                <th>
                  <strong class="text-body-1 font-weight-bold basic-text--text"
                    >Step</strong
                  >
                </th>
                <th>
                  <strong class="text-body-1 font-weight-bold basic-text--text"
                    >Drop Rate</strong
                  >
                </th>
                <th>
                  <strong class="text-body-1 font-weight-bold basic-text--text"
                    >Buy Multiplier</strong
                  >
                </th>
                <th>
                  <strong class="text-body-1 font-weight-bold basic-text--text"
                    >Take Profit</strong
                  >
                </th>
                <th>
                  <strong class="text-body-1 font-weight-bold basic-text--text"
                    >Type</strong
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(child, y, key) in strategy.style.steps"
                :key="child.key"
              >
                <td class="text-body-1">{{ y + 1 }}</td>
                <td class="text-body-1">
                  <div class="d-flex align-center">
                    <span>{{ child.drop_rate }}</span>
                    <v-icon x-small slot="append" color="primary">
                      mdi-percent
                    </v-icon>
                  </div>
                </td>
                <td class="text-body-1">
                  <div class="d-flex align-center">
                    <span>{{ child.multiplier }}</span>
                    <v-icon x-small slot="append" color="primary">
                      mdi-close
                    </v-icon>
                  </div>
                </td>
                <td class="text-body-1">
                  <div class="d-flex align-center">
                    <span>{{ child.take_profit }}</span>
                    <v-icon x-small slot="append" color="primary">
                      mdi-percent
                    </v-icon>
                  </div>
                </td>
                <td class="text-body-1">
                  <span>{{ child.type }}</span>
                </td>
              </tr>
              <tr
                v-if="
                  selectedStrategyName == 'Custom' &&
                  strategy.style.steps.length > 0
                "
              >
                <td style="text-align: center" colspan="5">
                  <v-btn x-small @click="resetRowCustom" class="danger--text"
                    >RESET CUSTOM STRATEGY</v-btn
                  >
                </td>
              </tr>
              <tr v-if="selectedStrategyName == 'Custom'">
                <td v-if="selectedStrategyName == 'Custom'">
                  <v-btn
                    class="customGreen basic-text--text"
                    small
                    @click="
                      addRowCustom(
                        customDrop,
                        customBuy,
                        customProfit,
                        customType
                      )
                    "
                    >+</v-btn
                  >
                </td>
                <td>
                  <v-text-field
                    class="text-body-1"
                    v-model="customDrop"
                    placeholder="1.2"
                  >
                    <v-icon x-small slot="append" color="primary">
                      mdi-percent
                    </v-icon>
                  </v-text-field>
                </td>
                <td>
                  <v-text-field
                    class="text-body-1"
                    v-model="customBuy"
                    placeholder="2"
                  >
                    <v-icon x-small slot="append" color="primary">
                      mdi-close
                    </v-icon>
                  </v-text-field>
                </td>
                <td>
                  <v-text-field
                    class="text-body-1"
                    v-model="customProfit"
                    placeholder="1.1"
                  >
                    <v-icon x-small slot="append" color="primary">
                      mdi-percent
                    </v-icon>
                  </v-text-field>
                </td>
                <td>
                  <v-select
                    :items="types"
                    v-model="customType"
                    label="Type"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-list v-if="false">
          <v-list-group
            v-for="(item, i) in styleList"
            :key="item.name"
            v-model="item.active"
            no-action
          >
            <v-list-item class="pl-6 pr-0">
              <v-list-item-content>
                <v-btn color="primary" @click="selectStyle(item)"
                  >Select Style</v-btn
                >

                <v-btn color="primary" @click="selectStyle(item)"
                  >Select Style</v-btn
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["selectedStrategy"],
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

      // RECOMMENDED
      recommendedMaxTradingPair: [0, ""],
    };
  },
  methods: {
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

      this.resetRecommendedSettings()
    },
    onUsdtToApplyChanged(value) {
      this.resetRecommendedSettings()
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
      } else if (this.strategy.usdt_per_order < 16) {
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
    selectedStrategyName: {
      handler(nv, ov) {
        this.recommendedMaxTradingPair = [0, ""];
        this.selectStyleByName(nv);
      },
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
