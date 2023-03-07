<template>
  <v-dialog
    :persistent="persistent"
    v-model="showDialog"
    max-width="500"
    :fullscreen="$vuetify.breakpoint.mobile"
  >
    <v-card flat rounded>
      <v-card-title class="text-h6 font-weight-bold primary white--text">
        <v-row>
          <v-col cols="8">{{
            detail.type != "AUTOMATED"
              ? `${detail.type == "DCA_GRID" ? "HYBRID" : detail.type} - ${
                  detail.name
                }`
              : "Transaction"
          }}</v-col>
          <v-col cols="4" class="d-flex justify-end">
            <v-btn color="white" icon @click="closeModal">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <!-- <v-btn @click="logger" x-small rounded> logger </v-btn> -->
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="my-3">
        <v-row>
          <v-col cols="12">
            <v-list-item>
              <v-list-item-avatar>
                <img
                  style="width: 60px"
                  :alt="pair.logo"
                  :src="'/token_logo/' + pair.pair_from.toUpperCase() + '.png'"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <h4>{{ pair.pair_from }} / {{ pair.pair_to }}</h4>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12">
            <v-tabs v-model="tab" color="primary" height="40px" class="px-2">
              <v-tab
                :ripple="false"
                v-for="item in availableOptions"
                :key="item.text"
              >
                <!-- <v-icon small class="mr-1">
                  {{ item.icon }}
                </v-icon> -->
                <span class="text-capitalize font-weight-bold">
                  {{ item.text.toLowerCase() }}
                </span>
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12">
            <v-row v-show="tab == 3">
              <v-col cols="12">
                <v-row>
                  <v-col cols="6" class="d-flex justify-start align-center">
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon class="mr-2" v-bind="attrs" v-on="on"
                          >mdi-information-outline</v-icon
                        >
                        <strong>Floating P&L</strong>
                      </template>
                      <span
                        >Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.</span
                      >
                    </v-tooltip>
                  </v-col>
                  <v-col
                    cols="6"
                    class="d-flex flex-column justify-center align-center"
                    v-if="pair.floatingProfit"
                  >
                    <div class="d-flex flex-column align-start justify-center">
                      <strong
                        class="danger--text text-subtitle-2 font-weight-bold"
                        v-if="parseFloat(pair.floatingProfit.percentage) < 0"
                        >{{ pair.floatingProfit.percentage }}%</strong
                      >
                      <strong
                        class="success--text text-subtitle-2 font-weight-bold"
                        v-if="parseFloat(pair.floatingProfit.percentage) > 0"
                        >{{ pair.floatingProfit.percentage }}%</strong
                      >

                      <span
                        v-if="parseFloat(pair.floatingProfit.value) < 0"
                        class="danger--text text-subtitle-2 font-weight-bold"
                        >{{ pair.floatingProfit.value }} USDT</span
                      >
                      <span
                        v-else
                        class="success--text text-subtitle-2 font-weight-bold"
                        >{{ pair.floatingProfit.value }} USDT</span
                      >
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" class="d-flex justify-start align-center">
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon class="mr-2" v-bind="attrs" v-on="on"
                          >mdi-information-outline</v-icon
                        >
                        <strong>Realized P&L</strong>
                      </template>
                      <span
                        >Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.</span
                      >
                    </v-tooltip>
                  </v-col>
                  <v-col
                    cols="6"
                    class="d-flex flex-column justify-center align-center"
                    v-if="pair.realizedProfit"
                  >
                    <div class="d-flex flex-column align-start justify-center">
                      <strong
                        class="danger--text text-subtitle-2 font-weight-bold"
                        v-if="parseFloat(pair.realizedProfit.percentage) < 0"
                        >{{ pair.realizedProfit.percentage }}%</strong
                      >
                      <strong
                        class="success--text text-subtitle-2 font-weight-bold"
                        v-if="parseFloat(pair.realizedProfit.percentage) > 0"
                        >{{ pair.realizedProfit.percentage }}%</strong
                      >

                      <span
                        v-if="parseFloat(pair.realizedProfit.value) < 0"
                        class="danger--text text-subtitle-2 font-weight-bold"
                        >{{ pair.realizedProfit.value }} USDT</span
                      >
                      <span
                        v-else
                        class="success--text text-subtitle-2 font-weight-bold"
                        >{{ pair.realizedProfit.value }} USDT</span
                      >
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" class="d-flex justify-start align-center">
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon class="mr-2" v-bind="attrs" v-on="on"
                          >mdi-information-outline</v-icon
                        >
                        <strong>Total P&L</strong>
                      </template>
                      <span
                        >Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.</span
                      >
                    </v-tooltip>
                  </v-col>
                  <v-col
                    v-if="pair.profit"
                    cols="6"
                    class="d-flex flex-column justify-center align-center"
                  >
                    <div class="d-flex flex-column align-start justify-center">
                      <strong
                        class="danger--text text-subtitle-2 font-weight-bold"
                        v-if="parseFloat(pair.profit.percentage) < 0"
                        >{{ pair.profit.percentage }}%</strong
                      >
                      <strong
                        class="success--text text-subtitle-2 font-weight-bold"
                        v-if="parseFloat(pair.profit.percentage) > 0"
                        >{{ pair.profit.percentage }}%</strong
                      >

                      <span
                        v-if="parseFloat(pair.profit.value) < 0"
                        class="danger--text text-subtitle-2 font-weight-bold"
                        >{{ pair.profit.value }} USDT</span
                      >
                      <span
                        v-else
                        class="success--text text-subtitle-2 font-weight-bold"
                        >{{ pair.profit.value }} USDT</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row v-show="tab == 0">
              <v-col
                v-for="(item, i) in detailItems"
                :key="`detailItems-${i}`"
                cols="6"
              >
                <v-list-item>
                  <v-list-item-avatar size="20">
                    <span
                      style="width: 10px; height: 10px; border-radius: 5px"
                      :class="[
                        item.value > 0 || item.value.length > 1
                          ? 'success'
                          : 'grey',
                      ]"
                    ></span>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-2">
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong
                        v-if="item.key == 'total_step'"
                        class="text-body-1 font-weight-bold basic-text--text"
                      >
                        {{
                          item.value - 1 == 0 ? "Initial Order" : item.value - 1
                        }}
                      </strong>
                      <strong
                        v-else
                        class="text-body-1 font-weight-bold basic-text--text"
                      >
                        {{ item.value }}
                      </strong>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>

            <v-row v-show="tab == 1">
              <v-col
                v-for="(item, i) in conditionItems"
                :key="`conditionItems-${i}`"
                cols="6"
              >
                <v-list-item>
                  <v-list-item-avatar size="20">
                    <span
                      style="width: 10px; height: 10px; border-radius: 5px"
                      :class="[
                        item.value > 0 || item.value !== '0%'
                          ? 'success'
                          : 'grey',
                      ]"
                    ></span>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-2">
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong
                        class="text-body-1 font-weight-bold basic-text--text"
                        v-if="
                          item.key == 'take_profit_price' ||
                          item.key == 'next_step_price'
                        "
                      >
                        {{ item.value | currency("$", 6) }}
                      </strong>
                      <strong
                        v-else
                        class="text-body-1 font-weight-bold basic-text--text"
                      >
                        {{ item.value }}
                      </strong>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>

            <v-row v-show="tab == 2">
              <v-col cols="12">
                <ModalsBotSetupTechnicalAnalysis
                  :wide="true"
                  v-if="analysis.condition"
                  :selected-technical="analysis"
                  ref="analysisRef"
                  @onAnalysisSelected="onAnalysisSelected"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-show="tab == 10"
              :headers="tableTitle"
              :items="conditionItems"
              hide-default-header
              hide-default-footer
              class="elevation-2 ma-2"
            >
              <template v-slot:item.title="{ item }">
                <v-icon>
                  {{ item.icon }}
                </v-icon>
                <span>{{ item.title }}</span>
              </template>
              <template v-slot:item.value="{ item }">
                <span
                  v-if="
                    item.key == 'take_profit_price' ||
                    item.key == 'next_step_price'
                  "
                >
                  {{ item.value | currency("$", 6) }}
                </span>
                <span v-else>
                  {{ item.value }}
                </span>
              </template>
            </v-data-table>

            <!-- START OF FORMULA -->
            <div v-show="tab == 2" class="pt-0">
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    @click="showAveragingFormula = !showAveragingFormula"
                  >
                    <v-icon small class="mr-1"> mdi-cog </v-icon>
                    Averaging Configuration
                  </v-btn>
                </v-col>
              </v-row>
              <v-card flat rounded class="ma-3" v-show="showAveragingFormula">
                <v-simple-table dense>
                  <template>
                    <thead>
                      <tr>
                        <th>Step</th>
                        <th>Drop Rate</th>
                        <th>Buy Multiplier</th>
                        <th>Take Profit</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-if="steps[0]"
                        class="text-center"
                        v-for="(child, y, key) in steps"
                        :key="child.key"
                      >
                        <td>{{ y + 1 }}</td>
                        <td>
                          <span>{{ child.drop_rate }}</span>
                          <v-icon small slot="append" color="primary">
                            mdi-percent
                          </v-icon>
                        </td>
                        <td>
                          <span>{{ child.multiplier }}</span>
                          <v-icon small slot="append" color="primary">
                            mdi-close
                          </v-icon>
                        </td>
                        <td>
                          <span>{{ child.take_profit }}</span>
                          <v-icon small slot="append" color="primary">
                            mdi-percent
                          </v-icon>
                        </td>
                        <td>
                          <span>{{ child.type }}</span>
                        </td>
                      </tr>
                      <tr v-if="steps.length > 0">
                        <td style="text-align: center" colspan="5">
                          <v-btn
                            x-small
                            @click="resetRowCustom"
                            class="danger--text"
                            >RESET CUSTOM STRATEGY</v-btn
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <v-btn
                            class="customGreen"
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
                          <v-text-field v-model="customDrop" placeholder="1.2">
                            <v-icon small slot="append" color="primary">
                              mdi-percent
                            </v-icon>
                          </v-text-field>
                        </td>
                        <td>
                          <v-text-field v-model="customBuy" placeholder="2">
                            <v-icon small slot="append" color="primary">
                              mdi-close
                            </v-icon>
                          </v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            v-model="customProfit"
                            placeholder="1.1"
                          >
                            <v-icon small slot="append" color="primary">
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
              </v-card>
            </div>
            <!-- END OF FORMULA -->
          </v-col>
        </v-row>
        <v-row v-if="tab != 2">
          <v-col cols="12" md="4">
            <v-btn
              color="customPink white--text"
              block
              rounded
              @click="
                showStopAgreement = !showStopAgreement;
                showSellAgreement = false;
                showAveragingAgreement = false;
              "
            >
              {{ !detail.paused ? "STOP TRADING" : "START TRADING" }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              :disabled="detail.positions.length <= 0"
              color="danger white--text"
              block
              rounded
              @click="
                showSellAgreement = !showSellAgreement;
                showStopAgreement = false;
                showAveragingAgreement = false;
              "
            >
              FORCE SELL
            </v-btn>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              :disabled="detail.positions.length <= 0"
              color="primary"
              block
              rounded
              @click="
                showAveragingAgreement = !showAveragingAgreement;
                showSellAgreement = false;
                showStopAgreement = false;
              "
            >
              AVERAGING: &nbsp;
              <span v-if="!detail.averaging">OFF</span>
              <span v-else>ON</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <v-btn @click="_save" color="primary" style="width: 100%"
              >SAVE</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="showStopAgreement">
          <v-col
            v-if="!detail.paused"
            cols="12"
            md="12"
            class="d-flex flex-column justify-center"
          >
            <h4>
              You're about to stop trading, this action will be stop your
              trading action:
            </h4>
            <ul>
              <li>The bot will stays until all the position are closed</li>
              <li>
                After the positions is empty, the bot won't start any trade
              </li>
            </ul>
            <v-btn @click="_stopTrading" class="primary">I agree</v-btn>
          </v-col>
          <v-col
            v-else
            cols="12"
            md="12"
            class="d-flex flex-column justify-center"
          >
            <h4>
              You're about to start trading, this action will be start your
              trading action:
            </h4>
            <ul>
              <li>The position will start from steps 1</li>
            </ul>
            <v-btn @click="_startTrading" class="primary">I agree</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="showSellAgreement">
          <v-col cols="12" md="12" class="d-flex flex-column justify-center">
            <h4>You're about to force sell this pair:</h4>
            <ul>
              <li>
                All the position will be closed immediately after you click the
                execute button
              </li>
              <li>There's no refund possibility, all risk is on you</li>
            </ul>
            <v-btn @click="_forceSell" class="primary">I agree</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="showAveragingAgreement">
          <v-col cols="12" md="12" class="d-flex flex-column justify-center">
            <h4>You're about to set the averaging to ON/OFF</h4>
            <ul>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
            <v-btn @click="_averaging" class="primary">I agree</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import baseModal from "~/mixins/base-modal";
export default {
  mixins: [baseModal],
  props: {
    pair: {
      type: Object,
      default: null,
    },
    detail: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // TABS
      tab: null,
      availableOptions: [
        { icon: "mdi-pencil", text: "Detail" },
        { icon: "mdi-lightbulb-outline", text: "Strategy" },
        { icon: "mdi-file-table-box-outline", text: "Formula" },
        { icon: "mdi-cog", text: "P&L" },
      ],

      // SHOW HANDLER
      pairDetailShown: false,
      showSetting: false,
      showOverview: true,
      showAveragingFormula: false,
      tabs: {
        detail: true,
        strategy: false,
        formula: false,
      },

      // AVERAGING STEPS
      customDrop: null,
      customBuy: null,
      customProfit: null,
      customType: null,

      // ANALYSIS
      analysis: {
        first_analysis: {
          analysis: null,
        },
        second_analysis: {
          analysis: null,
        },
        condition: null,
        minimum_trading_volume: null,
      },
      steps: this.detail.averaging_steps,
      types: ["DCA", "GRID"],
      showStopAgreement: false,
      showSellAgreement: false,
      showAveragingAgreement: false,

      // TABLE DETAIL
      tableDetailTitle: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        {
          text: "Value",
          align: "center",
          value: "value",
          cellClass: "font-weight-bold",
        },
      ],
      detailItems: [
        {
          title: "Amount (USDT)",
          key: "total_amount",
          value: 0,
        },
        {
          title: "Average Price",
          key: "average",
          value: 0,
        },
        {
          title: "Step",
          key: "total_step",
          value: 0,
        },
        {
          title: "Quantity",
          key: "total_quantity",
          value: 0,
        },
        {
          title: "Change",
          value: 0,
        },
        {
          title: "Exchange",
          key: "exchange",
          value: "-",
        },
      ],

      // TABLE CONDITION
      tableTitle: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        {
          text: "Value",
          align: "center",
          value: "value",
          cellClass: "font-weight-bold",
        },
      ],
      conditionList: [],
      conditionItems: [
        {
          icon: "mdi-arrow-up-drop-circle-outline",
          title: "Next Step Price",
          key: "next_step_price",
          value: 0,
        },
        {
          icon: "mdi-arrow-down-drop-circle-outline",
          title: "Next Step Drop Rate",
          key: "next_step_drop_rate",
          value: 0,
        },
        {
          icon: "mdi-currency-usd",
          title: "Take Profit Price",
          key: "take_profit_price",
          value: 0,
        },
        {
          icon: "mdi-percent-outline",
          title: "Take Profit Ratio",
          key: "take_profit_ratio",
          value: 0,
        },
        {
          icon: "mdi-wallet-outline",
          title: "Buy Amount",
          key: "total_buy_amount",
          value: 0,
        },
        {
          icon: "mdi-car-speed-limiter",
          title: "Averaging Limit",
          key: "averaging_limit",
          value: 0,
        },
      ],
    };
  },
  methods: {
    // TRIGGER
    _logSetup() {},
    onAnalysisSelected(val) {
      console.log(val);
    },
    logger() {
      console.log("pair", this.pair);
      console.log("detail", this.detail);
    },
    onTabSelect(tab) {
      for (let key in this.tabs) {
        if (key == tab) {
          this.tabs[key] = true;
        } else {
          this.tabs[key] = false;
        }
      }
    },
    closeModal() {
      this.$emit("close-modal", false);
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
        strategy.step = this.steps.length;
        strategy.drop_rate = parseFloat(drop);
        strategy.multiplier = parseFloat(multiplier);
        strategy.take_profit = parseFloat(profit);
        strategy.type = type;
        this.steps.push(strategy);
        this.customDrop = null;
        this.customBuy = null;
        this.customProfit = null;
        this.customType = null;
      }
    },
    resetRowCustom() {
      this.types = ["DCA", "GRID"];
      this.steps = [];
      this.$forceUpdate();
    },
    async _startTrading() {},
    async _stopTrading() {
      let query = { id: this.pair._id };
      let paramTemp = { key: "paused" };
      let res = await this.$api.$put("/user/action", paramTemp, {
        params: query,
      });
      console.log(res);
      this.$store.commit("setIsLoading", true);
      if (res.success) {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Stop Trading Successfully Executed!",
            color: "success",
          });
          this.$forceUpdate();
          this.$store.commit("setIsLoading", false);
        });
      } else {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: res.msg,
            color: "customPink",
          });
          this.$store.commit("setIsLoading", false);
        });
      }
    },
    async _averaging() {
      let query = { id: this.pair._id };
      let paramTemp = { key: "averaging" };
      let res = await this.$api.$put("/user/action", paramTemp, {
        params: query,
      });
      console.log("res", res);
      this.$store.commit("setIsLoading", true);
      if (res.success) {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Averaging Successfully Executed!",
            color: "success",
          });
          this.$forceUpdate();
          this.$store.commit("setIsLoading", false);
        });
      } else {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: res.msg,
            color: "customPink",
          });
          this.$forceUpdate();
          this.$store.commit("setIsLoading", false);
        });
      }
    },
    async _forceSell() {
      let query = { id: this.pair._id };
      let paramTemp = { key: "force_sell" };
      let res = await this.$api.$put("/user/action", paramTemp, {
        params: query,
      });
      console.log("res", res);
      this.$store.commit("setIsLoading", true);
      if (res.success) {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Force Sell Successfully Executed!",
            color: "success",
          });
          this.$forceUpdate();
          this.$store.commit("setIsLoading", false);
        });
      } else {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: res.msg,
            color: "customPink",
          });
          this.$store.commit("setIsLoading", false);
        });
      }
    },

    async _save() {
      let query = { id: this.pair._id };
      let analysis = {};
      let averaging_steps = [];
      analysis.condition = this.analysis.condition;
      analysis.indicators = [];

      if (this.analysis.first_analysis) {
        analysis.indicators.push({
          id: this.analysis.first_analysis.analysis,
          timeperiod: this.analysis.first_analysis.time,
        });
      }

      if (this.analysis.second_analysis) {
        analysis.indicators.push({
          id: this.analysis.second_analysis.analysis,
          timeperiod: this.analysis.second_analysis.time,
        });
      }

      averaging_steps = this.steps;
      console.log(this.steps);
      console.log(this.analysis);
      console.log("analysis", analysis);
      console.log("averaging_steps", averaging_steps);
      let res = await this.$api.$put(
        "/user/analysis",
        { averaging_steps: averaging_steps, analysis: analysis },
        {
          params: query,
        }
      );

      this.$store.commit("setIsLoading", true);
      if (res.success) {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Analysis Update Successfully Executed!",
            color: "success",
          });
          this.$forceUpdate();
          this.$store.commit("setIsLoading", false);
        });
      } else {
        setTimeout(() => {
          this.$emit("close-modal", false);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: res.msg,
            color: "customPink",
          });
          this.$store.commit("setIsLoading", false);
        });
      }
    },

    closeModal() {
      this.$emit("close-modal", false);
    },
    _riskSelected(risk) {
      console.log(risk.text);
    },
    setStrategy() {
      for (let data of this.conditionItems) {
        data.value = this.detail[data.key];
      }
    },
    setDetail() {
      this.detailItems[3].title = `Quantity (${this.pair.pair_from})`;

      for (let data of this.detailItems) {
        if (data.key) {
          data.value = this.detail[data.key];
        }
      }
    },
    setAnalysis() {
      let analysis = {};
      analysis.condition = this.detail.analysis.condition;
      analysis.minimum_trading_volume = -1;
      analysis.first_analysis = {};

      let index = 0;
      for (let indicator of this.detail.analysis.indicators) {
        if (index == 0) {
          analysis.first_analysis = {
            analysis: indicator.id,
            time: indicator.timeperiod,
          };
        } else if (index == 1) {
          analysis.second_analysis = {
            analysis: indicator.id,
            time: indicator.timeperiod,
          };
        }
        console.log(indicator);
        index++;
      }

      console.log("tempAnalysis", analysis);
      this.analysis = analysis;
    },
  },
  async mounted() {
    this.$store.commit("setIsLoading", false);
    this.setStrategy();
    this.setDetail();
    this.setAnalysis();
  },
};
</script>

<style scoped>
.summary .v-card__title {
  padding: 0;
  font-size: 0.9rem;
  text-align: center;
  display: block;
}

.summary .v-card__text {
  display: block;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

.setting-container {
  border-radius: 15px 5px;
  padding: 5px 10px;
  transition: 0.3s;
}

.setting-container:hover {
  cursor: pointer;
  box-shadow: 1px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.setting-container:active {
  cursor: pointer;
  box-shadow: 1px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>
