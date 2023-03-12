<template>
  <v-card flat rounded class="pa-3 no-shadow">
    <v-form ref="form" lazy-validation>
      <v-row align="center" justify="center">
        <v-col cols="12" :class="wide ? '' : 'pa-5 mt-2'">
          <div class="d-flex flex-column align-start">
            <h3 v-if="!wide" class="mb-4 text-h6 font-weight-bold">
              Choose First Analysis
            </h3>
            <strong
              v-else
              class="text-body-1 font-weight-bold basic-text--text my-3"
            >
              Choose First Analysis
            </strong>
            <!-- <v-btn small @click="logger">logger</v-btn> -->
            <v-row style="width: 100%">
              <v-col cols="12" md="6">
                <v-select
                  v-model="technical.first_analysis.analysis"
                  :rules="rules.technical.first_analysis.analysis"
                  item-value="id"
                  item-text="name"
                  :items="analysisList"
                  placeholder="Choose Analysis"
                  class="custom-input text-body-1"
                  rounded
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="6" class="mx-0">
                <v-select
                  v-model="technical.first_analysis.time"
                  :rules="rules.technical.first_analysis.time"
                  :items="timeList"
                  placeholder="Timeframe"
                  class="custom-input text-body-1"
                  rounded
                ></v-select>
              </v-col>
            </v-row>
            <h3 v-if="!wide" class="my-4 text-h6 font-weight-bold">
              Condition
            </h3>
            <strong
              v-else
              class="text-body-1 font-weight-bold basic-text--text my-3"
            >
              Condition
            </strong>
            <v-row style="width: 100%">
              <v-col class="d-flex justify-center" cols="12">
                <v-btn
                  @click.native="technical.condition = 'AND'"
                  style="width: 45%"
                  class="mx-2"
                  rounded
                  depressed
                  :color="
                    technical.condition == 'AND' ? 'primary' : 'off-white'
                  "
                >
                  AND
                </v-btn>
                <v-btn
                  @click.native="technical.condition = 'OR'"
                  style="width: 45%"
                  class="mx-2"
                  rounded
                  depressed
                  :color="technical.condition == 'OR' ? 'primary' : 'off-white'"
                >
                  OR
                </v-btn>
              </v-col>
            </v-row>
            <h3 v-if="!wide" class="my-4 text-h6 font-weight-bold">
              Choose Second Analysis
            </h3>
            <strong
              v-else
              class="text-body-1 font-weight-bold basic-text--text my-3"
            >
              Choose Second Analysis
            </strong>
            <v-row style="width: 100%">
              <v-col cols="12" md="6">
                <v-select
                  v-model="technical.second_analysis.analysis"
                  item-value="id"
                  :rules="rules.technical.second_analysis.analysis"
                  item-text="name"
                  :items="analysisList"
                  placeholder="Choose Analysis"
                  class="custom-input text-body-1"
                  rounded
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" class="mx-0">
                <v-select
                  v-model="technical.second_analysis.time"
                  :items="timeList"
                  :rules="rules.technical.second_analysis.time"
                  placeholder="Timeframe"
                  class="custom-input text-body-1"
                  rounded
                ></v-select>
              </v-col>
            </v-row>
          </div>
          <slot></slot>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    selectedTechnical: null,
    wide: false,
  },
  data() {
    return {
      rules: {
        technical: {
          minimum_trading_volume: [
            (v) => !!v || "Minimum trading volume is required",
          ],
          first_analysis: {
            analysis: [(v) => !!v || "First analysis is required"],
            time: [(v) => !!v || "First analysis time period is required"],
          },
          second_analysis: {
            analysis: [(v) => !!v || "Second analysis is required"],
            time: [(v) => !!v || "Second analysis time period is required"],
          },
        },
      },
      technical: {
        first_analysis: {
          analysis: null,
          time: null,
        },
        condition: null,
        second_analysis: {
          analysis: null,
          time: null,
        },
        minimum_trading_volume: 15000000,
      },
      analysisList: [
        {
          id: "EMA",
          name: "Exponential Moving Average",
        },
        {
          id: "SMA",
          name: "Moving Average",
        },
        {
          id: "BB",
          name: "Bollinger Band",
        },
        {
          id: "RSI",
          name: "RSI",
        },
        {
          id: "STOCHASTIC",
          name: "Stochastic",
        },
        {
          id: "MACD",
          name: "MACD",
        },
        {
          id: "STOCHASTIC_RSI",
          name: "Stochastic RSI",
        },
        {
          id: "CCI",
          name: "CCI",
        },
      ],
      timeList: ["5m", "15m", "30m", "1h", "2h", "4h", "12h"],
      tradingVolumeList: [
        {
          value: 5000000,
          name: "5 mil USD",
        },
        {
          value: 10000000,
          name: "10 mil USD",
        },
        {
          value: 15000000,
          name: "15 mil USD",
        },
        {
          value: 20000000,
          name: "20 mil USD",
        },
        {
          value: 30000000,
          name: "30 mil USD",
        },
        {
          value: 50000000,
          name: "50 mil USD",
        },
        {
          value: 75000000,
          name: "75 mil USD",
        },
        {
          value: 100000000,
          name: "100 mil USD",
        },
      ],
      condition: "AND",
    };
  },
  methods: {
    validateForm() {
      let valid = this.$refs.form.validate();
      console.log("VALIDATE FORM TECHNICAL ANALYSIS", valid);

      if (!this.technical.condition) {
        return [false, "Please choose technical condition"];
      }

      return [valid, null];
    },
    logger() {
      console.log(this.technical);
    },
    clearData() {
      this.technical = {
        first_analysis: {
          analysis: null,
          time: null,
        },
        condition: null,
        second_analysis: {
          analysis: null,
          time: null,
        },
        minimum_trading_volume: null,
      };
    },
  },
  mounted() {
    if (this.selectedTechnical) {
      this.technical = this.selectedTechnical;
      console.log("selectedTechnical", this.selectedTechnical);
    }
  },
  watch: {
    technical: {
      handler(nv, ov) {
        nv.minimum_trading_volume = parseFloat(nv.minimum_trading_volume);
        this.$emit("onAnalysisSelected", nv);
      },
      deep: true,
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
