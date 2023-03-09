<template>
  <v-row class="py-5 pa-3">
    <v-col
      v-if="checkMobile() == false"
      cols="12"
      style="position: relative"
      class="mb-5"
    >
      <v-icon @click="$router.push('/advanced-bots/dca')">
        mdi-arrow-left
      </v-icon>
    </v-col>
    <v-col v-if="checkMobile()" cols="12" class="text-h5 font-weight-bold">
      <v-icon @click="$router.push('/advanced-bots/dca')">
        mdi-arrow-left
      </v-icon>
      {{ title }} for {{ selectedExchange }}
    </v-col>
    <v-col v-else cols="12" class="text-center text-h5 font-weight-bold">
      {{ title }} for {{ selectedExchange }}
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col :cols="checkMobile() ? 12 : 7">
          <ExternalTradingView
            :key="tvKey"
            :symbol="selected_token"
          ></ExternalTradingView>
        </v-col>
        <v-col :cols="checkMobile() ? 12 : 5">
          <v-row>
            <v-col cols="12">
              <v-card
                flat
                rounded
                :class="checkMobile() ? 'mb-4' : 'mb-4 px-4'"
              >
                <v-row justify="space-around" class="pa-3">
                  <v-col
                    cols="2"
                    class="pa-1 d-flex justify-center align-center"
                  >
                    <v-progress-circular
                      :rotate="270"
                      :size="checkMobile() ? 50 : 60"
                      :width="7"
                      :value="e1 >= 0 ? 100 : 0"
                      color="primary"
                      class="d-flex align-center justify-center step-button"
                      @click="e1 = 0"
                    >
                      <v-icon
                        size="20"
                        :color="e1 >= 0 ? 'primary' : ''"
                        v-html="`$vuetify.icon.ProfitBarChartIcon`"
                      ></v-icon>
                    </v-progress-circular>
                  </v-col>
                  <v-col
                    cols="2"
                    class="pa-1 d-flex justify-center align-center"
                  >
                    <v-progress-circular
                      :rotate="270"
                      :size="checkMobile() ? 50 : 60"
                      :width="7"
                      :value="e1 >= 1 ? 100 : 0"
                      color="primary"
                      class="d-flex align-center justify-center step-button"
                      @click="e1 = 1"
                    >
                      <v-icon
                        size="20"
                        :color="e1 >= 1 ? 'primary' : ''"
                        v-html="`$vuetify.icon.ChartArrowUpIcon`"
                      ></v-icon>
                    </v-progress-circular>
                  </v-col>
                  <v-col
                    cols="2"
                    class="pa-1 d-flex justify-center align-center"
                  >
                    <v-progress-circular
                      :rotate="270"
                      :size="checkMobile() ? 50 : 60"
                      :width="7"
                      :value="e1 >= 2 ? 100 : 0"
                      color="primary"
                      class="d-flex align-center justify-center step-button"
                      @click="e1 = 2"
                    >
                      <v-icon
                        size="20"
                        :color="e1 >= 2 ? 'primary' : ''"
                        v-html="`$vuetify.icon.CopyCheckIcon`"
                      ></v-icon>
                    </v-progress-circular>
                  </v-col>
                  <v-col
                    cols="2"
                    class="pa-1 d-flex justify-center align-center"
                  >
                    <v-progress-circular
                      :rotate="270"
                      :size="checkMobile() ? 50 : 60"
                      :width="7"
                      :value="e1 >= 3 ? 100 : 0"
                      color="primary"
                      class="d-flex align-center justify-center step-button"
                      @click="e1 = 3"
                    >
                      <v-icon
                        size="20"
                        :color="e1 >= 3 ? 'primary' : ''"
                        v-html="`$vuetify.icon.DocumentTextIcon`"
                      ></v-icon>
                    </v-progress-circular>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-tabs-items
                v-model="e1"
                :touchless="true"
                style="height: 100%; min-height: 500px; border-radius: 10px"
                class="pa-3"
              >
                <v-tab-item key="0">
                  <ModalsAdvancedBotSetupFormAmount
                    v-if="showStrategySetup"
                    :selected-strategy="bot.strategy"
                    ref="amountRef"
                    @onSelected="onStrategySelected"
                    @changedSelectedToken="
                      (token) => {
                        tokenSelected(token);
                      }
                    "
                    :tokens="tokens"
                  >
                    <v-btn
                      width="120"
                      rounded
                      color="primary"
                      @click="_continue(2)"
                    >
                      Continue
                    </v-btn>
                  </ModalsAdvancedBotSetupFormAmount>
                </v-tab-item>
                <v-tab-item key="1">
                  <ModalsAdvancedBotSetupFormStrategy
                    v-if="showStrategySetup"
                    :advancedBotsType="['DCA']"
                    :selected-strategy="bot.strategy"
                    ref="strategyRef"
                    @onSelected="onStrategySelected"
                  >
                    <v-row justify="center">
                      <v-col cols="12">
                        <div class="d-flex float-left my-4">
                          <v-btn
                            width="120"
                            color="primary"
                            @click="e1 = 0"
                            rounded
                            outlined
                          >
                            Back
                          </v-btn>
                        </div>
                        <div class="d-flex float-right my-4">
                          <v-btn
                            width="120"
                            rounded
                            color="primary"
                            @click="_continue(3)"
                          >
                            Continue
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </ModalsAdvancedBotSetupFormStrategy>
                </v-tab-item>

                <v-tab-item key="2">
                  <ModalsAdvancedBotSetupFormTechnicalAnalysis
                    v-if="showTechnicalAnalysis"
                    :selected-technical="bot.analysis"
                    ref="analysisRef"
                    @onAnalysisSelected="onAnalysisSelected"
                  >
                    <v-row>
                      <v-col cols="12">
                        <div class="d-flex float-left my-4">
                          <v-btn
                            width="120"
                            color="primary"
                            @click="e1 = 1"
                            rounded
                            outlined
                          >
                            Back
                          </v-btn>
                        </div>
                        <div class="d-flex float-right my-4">
                          <v-btn
                            width="120"
                            rounded
                            color="primary"
                            @click="_continue(4)"
                          >
                            Continue
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </ModalsAdvancedBotSetupFormTechnicalAnalysis>
                </v-tab-item>
                <v-tab-item key="3">
                  <v-card
                    min-height="500px"
                    flat
                    class="d-flex flex-column align-start pa-3"
                  >
                    <h3 class="mb-4 text-h6 font-weight-bold">
                      Bot Setup Summary
                    </h3>
                    <v-row
                      class="mt-1"
                      style="width: 100%"
                      justify="center"
                      align="center"
                    >
                      <v-col cols="12">
                        <v-row justify="start" align="center">
                          <v-col
                            cols="6"
                            v-for="(item, i) in summary"
                            :key="`item-summary-${i}`"
                          >
                            <v-card flat rounded color="off-white">
                              <v-list-item>
                                <v-icon size="20" class="mr-4" color="primary">
                                  {{ _determineIcon(item.title) }}
                                </v-icon>

                                <v-list-item-content>
                                  <v-list-item-title class="text-body-2">
                                    {{ item.title }}
                                  </v-list-item-title>

                                  <v-list-item-subtitle
                                    class="text-body-1 font-weight-bold basic-text--text"
                                  >
                                    {{ item.value }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-data-table
                          v-if="false"
                          :headers="summaryHeaders"
                          :items="summary"
                          hide-default-header
                          hide-default-footer
                          class="elevation-1"
                        >
                        </v-data-table>
                      </v-col>
                      <v-col cols="12">
                        <v-row justify="center">
                          <v-col cols="12">
                            <div class="d-flex float-left my-4">
                              <v-btn
                                width="120"
                                color="primary"
                                @click="e1 = 2"
                                rounded
                                outlined
                              >
                                Back
                              </v-btn>
                            </div>

                            <div class="d-flex float-right my-4">
                              <v-btn
                                width="120"
                                rounded
                                color="customPink"
                                class="white--text"
                                @click="_submitBotSetup(isUpdateMode)"
                                :disabled="
                                  !user.subscription ||
                                  user.subscription == false
                                "
                                v-if="!isUpdateMode"
                              >
                                Submit
                              </v-btn>
                              <v-btn
                                width="120"
                                rounded
                                color="customPink"
                                class="white--text"
                                @click="_submitBotSetup(isUpdateMode)"
                                :disabled="
                                  !user.subscription ||
                                  user.subscription == false
                                "
                                v-else
                              >
                                Update
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

  <script>
import { exec } from "apexcharts";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import VStepperIcon from "@/components/VuetifyCustomComponents/VStepperIcon.vue";
import VStepperStepIcon from "@/components/VuetifyCustomComponents/VStepperIcon.vue";
import { match } from "assert";

export default {
  components: {
    VStepperIcon: VStepperIcon,
    VStepperStepIcon: VStepperStepIcon,
  },
  layout: "account",
  data() {
    return {
      title: "Create new bots",
      // STORE PARAM
      botProp: {},
      exchange: "",

      // STATE
      isUpdateMode: false,

      tokens: [],
      shownTokens: [],
      tokensCopy: [],
      tokenException: [],

      // BOT
      bot_type: "DCA",
      bot: {
        name: "Test Bot",
        selected_exchange: null,
        strategy: {
          style: {
            name: null,
          },
          usdt_to_apply: 0,
          usdt_per_order: 0,
          max_concurrent_trading_pair: 0,
        },
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
        token_exception: null,
      },
      e1: 0,
      summaryHeaders: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        {
          text: "Value",
          align: "start",
          value: "value",
          cellClass: "font-weight-bold",
        },
      ],
      searchTerm: "",
      summary: [
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Name",
          value: null,
        },
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Exchange",
          value: null,
        },
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Token",
          value: null,
        },
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Strategy",
          // value: 'Moderate'
          value: null,
        },
        {
          color: "green",
          icon: "mdi-buffer",
          title: "Total USDT",
          // value: '$2000'
          value: null,
        },
        {
          color: "indigo",
          icon: "mdi-buffer",
          title: "Technical Analysis",
          // value: 'Bollinger & RSI'
          value: null,
        },
        // {
        //   color: "green",
        //   icon: "mdi-buffer",
        //   title: "Minimum Trading Volume",
        //   // value: '$10,000,000'
        //   value: null,
        // },
      ],

      // VALIDATION
      stepsValidation: [false, false, false, false],

      // PROPS FOR COMPONENTS
      showStrategySetup: false,
      showTechnicalAnalysis: false,

      // TV
      tvKey: 0,
      selected_token: "BTCUSDT",
    };
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    },
    selectedExchange() {
      return this.$store.state.exchange.selectedExchange;
    },
    selectedBot() {
      return this.$store.state.bot.selectedBot;
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    ...mapMutations("exchange", ["setSelectedExchange"]),
    // TV
    tokenSelected(token) {
      this.selected_token = token;
      this.tvKey++;
    },
    // TRIGGER
    _continue(target) {
      console.log(target);
      if (target == 2) {
        let allowed = false;
        if (
          this.bot.strategy.usdt_per_order &&
          this.bot.strategy.usdt_per_order != 0 &&
          this.selected_token != "" &&
          this.$refs.amountRef.bot_name != "" &&
          this.selectedExchange != ""
        ) {
          this.bot.selected_token = this.selected_token;
          this.bot.name = this.$refs.amountRef.bot_name;
          this.bot.exchange = this.selectedExchange;
          allowed = true;
        }
        if (allowed) {
          return (this.e1 = target - 1);
        } else {
          return this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please fill all requirements needed!",
            color: "customPink",
          });
        }
      } else if (target == 3) {
        let allowed = false;

        if (this.bot.strategy.style.name && this.bot.strategy.style.name != 0) {
          allowed = true;
        }
        if (allowed) {
          return (this.e1 = target - 1);
        } else {
          return this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please fill all requirements needed!",
            color: "customPink",
          });
        }
      } else if (target == 4) {
        let allowed = false;

        if (
          this.bot.analysis.first_analysis.analysis &&
          this.bot.analysis.second_analysis.analysis &&
          this.bot.analysis.condition
        ) {
          allowed = true;
        }
        if (allowed) {
          return (this.e1 = target - 1);
        } else {
          return this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please fill all requirements needed!",
            color: "customPink",
          });
        }
      }

      this.e1 = target - 1;
    },
    loggerContinue() {
      console.log("loggerContinue", this.bot);
    },
    onExchangeSelected(val) {
      this.bot.selected_exchange = val;
    },
    onStrategySelected(val) {
      console.log("onStrategySelected", val);
      this.bot.strategy = val;
    },
    onAnalysisSelected(val) {
      console.log("onAnalysisSelected");
      this.bot.analysis = val;
    },
    logger() {
      console.log("logger");
      console.log("botProp", this.botProp);
      console.log("bot", this.bot);
      console.log("end-of logger");
      this.$refs.strategyRef.clearData();
    },
    snackbar() {
      console.log("snackbar");
      this.$store.commit("setShowSnackbar", {
        show: true,
        message: "Hello World",
        color: "success",
      });
    },
    loader() {
      setTimeout(() => {
        this.$store.commit("setIsLoading", true);
      });
    },
    closeModal() {
      this.$emit("close-modal", false);
    },
    _riskSelected(risk) {
      console.log(risk.text);
    },
    searchTokens(e) {
      console.log(e);
      console.log(this.searchTerm);
      console.log(this.tokensCopy);
      if (!this.searchTerm) {
        this.tokens = [...this.tokensCopy];
      }

      this.tokens = this.tokensCopy.filter((exchange) => {
        return (
          exchange.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
        );
      });
    },

    // ADD-ON
    resetModalState() {
      (this.bot = {
        selected_exchange: null,
        strategy: {
          style: {
            name: null,
          },
          usdt_to_apply: null,
        },
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
        token_exception: null,
      }),
        (this.e1 = 1);
      this.tokenException = [];
      this.searchTerm = "";
      this.setSelectedExchange(null);
      console.log(this.bot);
    },

    // CONSUME API
    async _deleteBot(id) {
      this.$store.commit("setIsLoading", true);
      let res = await this.$api.$delete("/user/bot", null, {
        params: {
          id: id,
        },
      });
      setTimeout(() => {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Bot Successfuly Deleted!",
          color: "danger",
        });
        this.$store.commit("setIsLoading", false);
      });
    },
    async _submitBotSetup(isUpdateMode) {
      if (!this.user.subscription) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "You haven't subsrcibe to any plan",
          color: "customPink",
        });
        return;
      }

      // MAP PARAM SELECTED TOKEN
      var split_token = this.bot.selected_token.split(":");
      if (split_token.length > 0) {
        this.bot.selected_token = split_token[1];
      }

      // MAP PARAM STRATEGY
      this.bot.strategy.steps = this.bot.strategy.style.steps;
      this.bot.strategy.style = this.bot.strategy.style.name;

      let paramTemp = {
        ...this.bot,
      };

      let analysis = {};
      analysis.condition = this.bot.analysis.condition;
      analysis.minimum_trading_volume =
        this.bot.analysis.minimum_trading_volume;
      analysis.indicators = [];

      if (this.bot.analysis.first_analysis) {
        analysis.indicators.push({
          indicator: this.bot.analysis.first_analysis.analysis,
          timeperiod: this.bot.analysis.first_analysis.time,
        });
      }

      if (this.bot.analysis.second_analysis) {
        analysis.indicators.push({
          indicator: this.bot.analysis.second_analysis.analysis,
          timeperiod: this.bot.analysis.second_analysis.time,
        });
      }

      delete paramTemp.analysis;
      paramTemp.analysis = analysis;
      paramTemp.type = this.bot_type;

      // return console.log("paramTemp", paramTemp);

      this.$store.commit("setIsLoading", true);

      // DONT MANUALLY CHANGED IS UPDATE MODE
      isUpdateMode = false;

      if (isUpdateMode) {
        delete paramTemp.id;
        let query = {
          id: this.bot.id,
        };

        console.log("paramTemp", paramTemp);
        console.log("query", query);

        let res = await this.$api.$put("/user/advanced-bot", paramTemp, {
          params: query,
        });
        setTimeout(() => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Bot Successfuly Updated!",
            color: "success",
          });
        });

        setTimeout(() => {
          this.$router.push("/advanced-bots/dca");
        }, 1000);
      } else {
        // ON INSERT
        let res = await this.$api.$post("/user/advanced-bot", paramTemp);
        setTimeout(() => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Successfuly Added New Bot!",
            color: "success",
          });
        });

        setTimeout(() => {
          this.$router.push("/advanced-bots/dca");
        }, 1000);
      }

      setTimeout(() => {
        this.$emit("close-modal", false);
        this.$store.commit("setIsLoading", false);
        this.resetModalState();
      });
    },
    async _fetchTokenList() {
      console.log("fetch token");
      console.log("exchange", this.exchange);
      console.log("exchange", this.selectedExchange);
      let paramTemp = {
        exchange: this.selectedExchange,
      };
      let execute = await this.$api.$get("/user/available-tokens", {
        params: paramTemp,
      });
      if (!execute.success) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Failed To Fetch Token List!",
          color: "customPink",
        });
      }
      this.tokens = execute.data.result;
      this.tokensCopy = this.tokens;
      console.log("tokenlist", execute.data.result);
      // this.tokensCopy = [...this.tokens];
    },
    toggleTokenException(val) {
      if (this.tokenException.includes(val)) {
        var array = this.tokenException.filter((v) => {
          return v != val;
        });

        this.tokenException = array;
      } else {
        this.tokenException.push(val);
      }
    },
    _determineIcon(text) {
      console.log("DETERMINE ICON : ", text);
      switch (text) {
        case "Exchange":
          return "$vuetify.icon.ExchangeIcon";
        case "Strategy":
          return "$vuetify.icon.ProfitBarChartIcon";
        case "Total USDT":
          return "$vuetify.icon.CardWithdrawIcon";
        case "Technical Analysis":
          return "$vuetify.icon.ChartArrowUpIcon";
        case "Minimum Trading Volume":
          return "$vuetify.icon.MinimumTradingVolumeIcon";

        default:
          return "$vuetify.icon.ProfitBarChartIcon";
      }
    },
  },
  async mounted() {
    // PARAM FROM STORE
    this.botProp = this.selectedBot;
    this.exchange = this.selectedExchange;

    this.bot.selected_exchange = this.exchange;
    if (this.botProp) {
      this.isUpdateMode = true;
      this.bot.id = this.botProp._id;
      this.bot.strategy = this.botProp.strategy;
      this.bot.analysis.condition = this.botProp.analysis.condition;
      this.bot.analysis.minimum_trading_volume =
        this.botProp.analysis.minimum_trading_volume;
      let index = 0;
      for (let indicator of this.botProp.analysis.indicators) {
        if (index == 0) {
          this.bot.analysis.first_analysis = {
            analysis: indicator.indicator,
            time: indicator.timeperiod,
          };
        } else if (index == 1) {
          this.bot.analysis.second_analysis = {
            analysis: indicator.indicator,
            time: indicator.timeperiod,
          };
        }
        console.log(indicator);
        index++;
      }
      this.tokenException = this.botProp.token_exception;
    }
    this._fetchTokenList();
    setTimeout(() => {
      this.showStrategySetup = true;
      this.showTechnicalAnalysis = true;
    });
  },
  watch: {
    tokenException: {
      handler(nv, ov) {
        this.bot.token_exception = nv;
      },
      deep: true,
    },
    bot: {
      handler(nv, ov) {
        this.summary[0].value = nv.name;
        this.summary[1].value = nv.selected_exchange;
        this.summary[2].value = nv.selected_token;
        this.summary[3].value = nv.strategy.style.name;
        this.summary[4].value = "$" + nv.strategy.usdt_to_apply;
        this.summary[5].value = `${nv.analysis.first_analysis.analysis} ${
          nv.analysis.condition == "AND" ? "&" : "/"
        } ${nv.analysis.second_analysis.analysis}`;
      },
      deep: true,
    },
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

.custom-chip {
  cursor: pointer;

  width: 100%;
  display: flex;
  justify-content: center;
  max-width: fit-content;
}
.custom-input {
  margin-top: 0px !important;
  padding: 0px !important;
}
.chip-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}
.custom-stepper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 5px !important;
  justify-content: flex-start;
  border-radius: 25px 0% 0% 25px;
  width: 150px;
  margin-bottom: 20px !important;
}
.custom-stepper-container {
  display: flex;
  flex-wrap: wrap;
}

.custom-stepper-container-mobile {
  display: flex;
  flex-wrap: wrap;
}
.step-button {
  cursor: pointer;
}
</style>
