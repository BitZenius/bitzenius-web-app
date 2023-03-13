<template>
  <v-row align="start" justify="start">
    <v-col :cols="strategy.style.name !== null ? 6 : 12">
      <v-card flat rounded class="pa-5 mt-2">
        <v-form ref="form" lazy-validation>
          <v-row align="center" justify="center">
            <v-col :cols="strategy.style.name !== null ? 12 : 8">
              <div class="d-flex flex-column align-start">
                <h3 class="mb-4 text-h6 font-weight-bold">Choose the Amount</h3>
                <!-- <v-btn small @click="_logger">logger</v-btn> -->

                <v-row class="d-flex align-end" style="width: 100%">
                  <v-col cols="6" md="6" class="text-body-1 font-weight-bold">
                    Total USDT To Apply
                    <v-text-field
                      :rules="rules.usdt_to_apply"
                      v-model="strategy.usdt_to_apply"
                      @blur="onUsdtToApplyChanged(strategy.usdt_to_apply)"
                      required
                      placeholder="Total USDT To Apply"
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
                      :rules="rules.usdt_per_order"
                      @blur="onUsdtPerOrderChanged(strategy.usdt_per_order)"
                      v-model="strategy.usdt_per_order"
                      required
                      placeholder="USDT Per Order"
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

                  <v-col cols="6" md="6" class="text-body-1 font-weight-bold">
                    Max Concurrent Trading Pair
                    <v-text-field
                      v-model="strategy.max_concurrent_trading_pair"
                      :rules="rules.max_concurrent_trading_pair"
                      required
                      placeholder="Max Concurrent Trading Pair"
                      rounded
                      class="my-2 custom-input text-body-1"
                      type="number"
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
                              <v-icon left>
                                mdi-link-box-variant-outline
                              </v-icon>
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
                    <i class="text-body-1"
                      >*{{ recommendedMaxTradingPair[1] }}</i
                    >
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

                <h3 class="mt-4 text-h6 font-weight-bold">
                  Choose the Strategy
                </h3>
                <small class="text-body-1"
                  >Choose a strategy that matches your risk profile.
                  Conservative strategies buy and trade less, while very
                  aggressive strategies involve higher risk and potentially
                  higher returns.</small
                >
                <v-row
                  class="d-flex align-center justify-center pt-0 mt-0 mb-4"
                  style="width: 100%"
                >
                  <v-col cols="12">
                    <v-radio-group
                      :rules="rules.selectedStrategyName"
                      v-model="selectedStrategyName"
                    >
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
        </v-form>
      </v-card>
    </v-col>
    <v-col
      v-if="selectedStrategyName !== null && strategy.style.steps"
      cols="6"
    >
      <v-card flat rounded class="pa-5 mt-2">
        <v-list-item class="mb-5">
          <!-- <v-list-item-avatar> -->
          <v-icon size="30" class="primary--text mr-3">
            $vuetify.icons.ProfitBarChartIcon
          </v-icon>
          <!-- </v-list-item-avatar> -->
          <v-list-item-content>
            <v-list-item-title class="text-h5 font-weight-bold">{{
              isForceCustom ? "Custom" : selectedStrategyName
            }}</v-list-item-title>
            <span class="text-body-1">
              Please note that the initial step (the step before step 1) will
              always have the same take profit percentage as step 1
            </span>
          </v-list-item-content>
        </v-list-item>

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
                @click="selectRow(child, y)"
              >
                <template v-if="editStep == y">
                  <td class="text-body-1">
                    {{ y + 1 }}
                    <div class="d-flex">
                      <v-btn
                        @click="saveRowChanges"
                        x-small
                        class="mx-1"
                        color="success"
                      >
                        <v-icon small>mdi-check</v-icon>
                      </v-btn>
                      <v-btn
                        @click="cancelRowChanges"
                        x-small
                        class="mx-1"
                        color="danger"
                      >
                        <v-icon small>mdi-cancel</v-icon>
                      </v-btn>
                    </div>
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
                </template>
                <template v-else>
                  <td class="text-body-1 d-flex align-center justify-center">
                    <v-btn
                      v-if="y + 1 == strategy.style.steps.length"
                      @click="deleteRow(y)"
                      x-small
                      class="mx-1"
                      color="danger"
                    >
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                    {{ y + 1 }}
                  </td>
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
                </template>
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
                    class="primary basic-text--text"
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
      // RULES
      rules: {
        usdt_to_apply: [
          (v) => !!v || "USDT to apply is required",
          (v) => (v && v > 0) || "USDT to apply must be more than 0",
        ],
        usdt_per_order: [
          (v) => !!v || "USDT to order is required",
          (v) => (v && v > 14) || "Min USDT to order is 15",
        ],
        max_concurrent_trading_pair: [
          (v) => !!v || "Max concurrent trading pair is required",
          (v) => (v && v > 0) || "Min concurrent trading pair is 1",
        ],
        selectedStrategyName: [(v) => !!v || "Strategy required"],
      },

      selectedStrategyName: null,
      isForceCustom: false,
      strategy: {
        usdt_to_apply: 1,
        usdt_per_order: 15,
        max_concurrent_trading_pair: 1,
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
    };
  },
  methods: {
    validateForm() {
      let valid = this.$refs.form.validate();
      console.log("VALIDATE FORM STRATEGY AND AMOUNT", valid);

      return [valid, null];
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
      }

      this.resetRecommendedSettings();
    },
    onUsdtToApplyChanged(value) {
      this.resetRecommendedSettings();
    },
    checkGridDCA(step) {
      if (!this.strategy.style.steps) {
        return;
      }
      var stepsArray = this.strategy.style.steps.map((item) => {
        return item.type;
      });

      var stepsBefore = stepsArray.slice(0, step);
      var stepsAfter = stepsArray.slice(step + 1, stepsArray.length - step);

      var isDCABefore = stepsBefore.includes("DCA");
      var isGridBefore = stepsBefore.includes("GRID");
      var isDCAAfter = stepsAfter.includes("DCA");

      if (isDCABefore && isGridBefore) {
        this.types = ["GRID"];
      } else if (isDCABefore && !isGridBefore && !isDCAAfter) {
        this.types = ["DCA", "GRID"];
      } else if (isDCAAfter) {
        this.types = ["DCA"];
      } else if (isDCAAfter && !isDCABefore) {
        this.types = ["DCA", "GRID"];
      } else if (isDCABefore && !isDCAAfter) {
        this.types = ["DCA", "GRID"];
      } else {
        this.types = ["DCA", "GRID"];
      }
    },
    selectRow(child, step) {
      this.checkGridDCA(step);
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
      this.customStyle.steps = [...this.strategy.style.steps];
      this.customStyle.steps.pop();

      this.isForceCustom = true;
      this.selectedStrategyName = "Custom";
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
      this.isForceCustom = true;
      var temp = [...this.strategy.style.steps];

      console.log("TEMP: ", temp);

      // this.selectStyleByName("Custom");
      this.selectedStrategyName = "Custom";

      setTimeout(() => {
        console.log("TEMP: ", temp);
        this.customStyle.steps = [...temp];

        this.customStyle.steps[this.editStep] = {
          step: this.editStep,
          drop_rate: this.customDrop,
          multiplier: this.customBuy,
          take_profit: this.customProfit,
          type: this.customType,
        };

        this.strategy.style.steps = [...this.customStyle.steps];

        setTimeout(() => {
          this.customDrop = null;
          this.customBuy = null;
          this.customProfit = null;
          this.customType = null;
          this.editStep = null;
        }, 100);
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
        this.customStyle.steps = this.strategy.style.steps;
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
        this.styleList[4] = this.customStyle;
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
      this.strategy.style = { ...val };
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
    this.checkGridDCA();
  },
  watch: {
    strategy: {
      handler(nv, ov) {
        this.$emit("onSelected", nv);
      },
      deep: true,
    },
    selectedStrategyName: {
      handler(nv, ov) {
        this.recommendedMaxTradingPair = [0, ""];
        this.isForceCustom = false;

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
