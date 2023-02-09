<template>
  <v-row align="start" justify="start">
    <v-col cols="12">
      <v-card flat rounded class="pa-5 mt-2">
        <v-row align="center" justify="center">
          <v-col cols="8">
            <div class="d-flex flex-column align-start">
              <h3 class="mb-4 text-body-1 font-weight-bold">
                Choose First Analysis
              </h3>
              <!-- <v-btn small @click="logger">logger</v-btn> -->
              <v-row style="width: 100%">
                <v-col cols="6">
                  <v-select
                    v-model="technical.first_analysis.analysis"
                    item-value="id"
                    item-text="name"
                    :items="analysisList"
                    placeholder="Choose Analysis"
                    class="custom-input text-body-2"
                    rounded
                  >
                  </v-select>
                </v-col>
                <v-col cols="6" class="mx-0">
                  <v-select
                    v-model="technical.first_analysis.time"
                    :items="timeList"
                    placeholder="Timeframe"
                    class="custom-input text-body-2"
                    rounded
                  ></v-select>
                </v-col>
              </v-row>
              <h3 class="my-4 text-body-1 font-weight-bold">Condition</h3>
              <v-row style="width: 100%">
                <v-col class="d-flex justify-center" cols="12">
                  <v-btn
                    @click.native="technical.condition = 'AND'"
                    style="width: 45%"
                    class="mx-2"
                    rounded
                    depressed
                    :color="
                      technical.condition == 'AND' ? 'primary' : '#F4F7FD'
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
                    :color="technical.condition == 'OR' ? 'primary' : '#F4F7FD'"
                  >
                    OR
                  </v-btn>
                </v-col>
              </v-row>
              <h3 class="my-4 text-body-1 font-weight-bold">
                Choose Second Analysis
              </h3>
              <v-row style="width: 100%">
                <v-col cols="6">
                  <v-select
                    v-model="technical.second_analysis.analysis"
                    item-value="id"
                    item-text="name"
                    :items="analysisList"
                    placeholder="Choose Analysis"
                    class="custom-input text-body-2"
                    rounded
                  ></v-select>
                </v-col>
                <v-col cols="6" class="mx-0">
                  <v-select
                    v-model="technical.second_analysis.time"
                    :items="timeList"
                    placeholder="Timeframe"
                    class="custom-input text-body-2"
                    rounded
                  ></v-select>
                </v-col>
              </v-row>

              <h3
                class="my-4 text-body-1 font-weight-bold"
                v-if="technical.minimum_trading_volume != -1"
              >
                Minimum trading volume in 24h
              </h3>
              <v-row
                style="width: 100%"
                v-if="technical.minimum_trading_volume != -1"
              >
                <v-col class="d-flex justify-center" cols="12">
                  <v-select
                    v-model="technical.minimum_trading_volume"
                    item-value="value"
                    item-text="name"
                    :items="tradingVolumeList"
                    placeholder="Trading Volume"
                    class="custom-input text-body-2"
                    rounded
                  ></v-select>
                </v-col>
              </v-row>
            </div>
            <slot></slot>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["selectedTechnical"],
  data() {
    return {
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
        minimum_trading_volume: null,
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
          value: 1000000,
          name: "1 mil USD",
        },
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
      ],
      condition: "AND",
    };
  },
  methods: {
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
  background-color: #f4f7fd !important;
  padding: 0px !important;
}
</style>
