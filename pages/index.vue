<template>
  <v-row v-if="checkMobile() == false" class="py-5 mb-10">
    <!-- TEST -->
    <template v-if="false">
      <v-btn class="mr-2 mb-2" @click="$store.commit('setShowTaskModal', true)"
        >TASK MODAL</v-btn
      >
      <v-btn class="mr-2 mb-2" @click="test2 = true"
        >CREATE BOT FINISH MODAL</v-btn
      >
      <v-btn class="mr-2 mb-2" @click="test3 = true"
        >START YOUR FIRST BOT MODAL</v-btn
      >
      <v-btn class="mr-2 mb-2" @click="test4 = true"
        >VERIFY YOUR EMAIL ADDRESS MODAL</v-btn
      >
      <v-btn class="mr-2 mb-2" @click="test5 = true">VERIFY CODE MODAL</v-btn>
      <v-btn class="mr-2 mb-2" @click="test6 = true">VERIFIED MODAL</v-btn>
      <v-btn class="mr-2 mb-2" @click="test7 = true">SUCCESS MODAL MODAL</v-btn>

      <BaseModal @close="test2 = false" :parentModel="test2" :maxWidth="'450'">
        <ModalsBotSetupFinished
          @close-modal="test2 = false"
        ></ModalsBotSetupFinished>
      </BaseModal>

      <BaseModal @close="test3 = false" :parentModel="test3" :maxWidth="'450'">
        <ModalsBotSetupNew @close-modal="test3 = false"></ModalsBotSetupNew>
      </BaseModal>

      <BaseModal @close="test7 = false" :parentModel="test7" :maxWidth="'450'">
        <ModalsSuccess @close-modal="test7 = false"></ModalsSuccess>
      </BaseModal>
    </template>
    <!-- TEST -->

    <v-col cols="12">
      <v-row class="mb-5">
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
        <v-col cols="12" md="4">
          <GlobalsExchangeList @on-exchange-changed="onExchangeChanged" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <CardCreateNewBots></CardCreateNewBots>
        </v-col>
        <v-col cols="12">
          <CardTask :taskData="profileCompletionTasks" />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <CardCredit :balance="balance" :loading="isLoading" />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <CardAsset :balance="balance" :loading="isLoading" />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <CardProfit :profit="profit" :loading="isLoadingProfit" />
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <CardDeals :deal="deal" :loading="isLoadingProfit" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="12">
              <v-card class="pa-2" flat>
                <v-row>
                  <v-col cols="3" class="d-flex justify-start align-center">
                    <v-btn-toggle rounded v-model="style" color="primary" group>
                      <v-btn value="daily" @click="onStyleSelected('daily')">
                        Daily
                      </v-btn>
                      <v-btn
                        value="monthly"
                        @click="onStyleSelected('monthly')"
                      >
                        Monthly
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                  <v-col cols="3" class="d-flex justify-center align-center">
                    <v-select
                      variant="underlined"
                      v-model="styleValue"
                      item-value="value"
                      item-text="name"
                      :items="
                        style == 'daily' ? styleDailyList : styleMonthlyList
                      "
                      :placeholder="
                        style == 'daily' ? 'Select Month' : 'Select Year'
                      "
                      rounded
                    ></v-select>
                  </v-col>
                  <v-col cols="6" class="d-flex justify-end">
                    <v-sheet class="text-h5 font-weight-bold ma-4">
                      Statistic
                    </v-sheet>
                  </v-col>
                </v-row>
                <apexchart
                  :key="$vuetify.theme.dark"
                  v-if="
                    showChart && exchange && chartData.series[0].data.length > 0
                  "
                  height="300"
                  type="area"
                  :options="chartData.options"
                  :series="chartData.series"
                ></apexchart>

                <template v-else>
                  <BaseNoData :label="`No Statistic Available`"></BaseNoData>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="3" class="mb-10">
          <CardBalance class="px-2 py-5" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row class="px-1 ma-0" v-else>
    <v-col cols="12">
      <v-row>
        <v-col cols="6">
          <MenuProfile
            @click="showUserDetail = true"
            :dataMode="false"
            :userData="user"
          ></MenuProfile>
        </v-col>
        <v-col cols="6">
          <GlobalsExchangeList @on-exchange-changed="onExchangeChanged" />
        </v-col>
        <v-col cols="12" class="mb-5 mt-10 pt-5">
          <CardCreateNewBots></CardCreateNewBots>
        </v-col>
        <v-col cols="12">
          <CardTaskInfo
            @show-task="showUserDetail = true"
            :taskData="profileCompletionTasks"
          ></CardTaskInfo>
        </v-col>
        <v-col cols="12">
          <CardBalanceWallet class="mb-6" />
        </v-col>
        <v-col cols="12" style="overflow-x: auto" class="no-scrollbar">
          <v-row style="flex-wrap: nowrap" class="no-scrollbar">
            <v-col cols="5">
              <CardCredit :balance="balance" :loading="isLoading" />
            </v-col>
            <v-col cols="5">
              <CardAsset :balance="balance" :loading="isLoading" />
            </v-col>
            <v-col cols="5">
              <CardProfit :profit="profit" :loading="isLoadingProfit" />
            </v-col>
            <v-col cols="5">
              <CardDeals :deal="deal" :loading="isLoadingProfit" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="12">
              <v-card class="pa-2" flat>
                <v-row>
                  <v-col
                    cols="12"
                    class="d-flex justify-start text-h6 font-weight-bold px-5 py-3"
                  >
                    Statistic
                  </v-col>
                  <v-col cols="6" class="d-flex justify-start align-center">
                    <v-btn-toggle rounded v-model="style" color="primary" group>
                      <v-btn value="daily" @click="onStyleSelected('daily')">
                        Daily
                      </v-btn>
                      <v-btn
                        value="monthly"
                        @click="onStyleSelected('monthly')"
                      >
                        Monthly
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                  <v-col cols="6" class="d-flex justify-center align-center">
                    <v-select
                      variant="underlined"
                      v-model="styleValue"
                      item-value="value"
                      item-text="name"
                      :items="
                        style == 'daily' ? styleDailyList : styleMonthlyList
                      "
                      :placeholder="
                        style == 'daily' ? 'Select Month' : 'Select Year'
                      "
                      rounded
                    ></v-select>
                  </v-col>
                </v-row>
                <apexchart
                  :key="$vuetify.theme.dark"
                  ref="apexchart"
                  v-if="
                    showChart && exchange && chartData.series[0].data.length > 0
                  "
                  height="300"
                  type="area"
                  :options="chartData.options"
                  :series="chartData.series"
                ></apexchart>

                <template v-else>
                  <BaseNoData :label="`No Statistic Available`"></BaseNoData>
                </template>
              </v-card>
            </v-col>
            <v-col cols="12" v-show="false">
              <TablesActivePosition
                :showTabs="false"
                :showExchangeCards="false"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>

    <BaseModalMobile
      @close="showUserDetail = false"
      :parentModel="showUserDetail"
      :maxWidth="'650'"
    >
      <ModalsUserDetail
        :taskData="profileCompletionTasks"
        @close-modal="showUserDetail = false"
      ></ModalsUserDetail>
    </BaseModalMobile>
  </v-row>
</template>
<script>
export default {
  layout: "account",
  data() {
    return {
      style: "daily",
      styleValue: null,
      startDate: null,
      endDate: null,
      styleDailyList: [
        { value: 0, name: "January" },
        { value: 1, name: "February" },
        { value: 2, name: "March" },
        { value: 3, name: "April" },
        { value: 4, name: "May" },
        { value: 5, name: "June" },
        { value: 6, name: "July" },
        { value: 7, name: "August" },
        { value: 8, name: "September" },
        { value: 9, name: "October" },
        { value: 10, name: "November" },
        { value: 11, name: "December" },
      ],
      styleMonthlyList: [
        { value: 2023, name: "2023" },
        { value: 2024, name: "2024" },
        { value: 2025, name: "2025" },
        { value: 2026, name: "2026" },
      ],
      test1: false,
      test2: false,
      test3: false,
      test4: false,
      test5: false,
      test6: false,
      test7: false,
      testText: false,
      // CHART
      title: "Dashboard",
      series: [
        {
          name: "PnL",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
      e1: 1,
      showChart: false,
      deal: 0,
      // STEPPER VARIABLES
      applyBalance: 100,
      selectedItem: 1,
      items: [
        {
          text: "Conservative",
          subText: "Very Low Risk",
          icon: "mdi-information",
        },
        {
          text: "Moderate",
          subText: "Low Risk",
          icon: "mdi-information",
        },
        {
          text: "Aggressive",
          subText: "Medium Risk",
          icon: "mdi-information",
        },
        {
          text: "Very Aggressive",
          subText: "Very High Risk",
          icon: "mdi-information",
        },
      ],
      chartData: {
        zoom: {
          enabled: true,
        },
        options: {
          // colors: ["#F44336", "#E91E63", "#9C27B0"],
          chart: {
            height: 280,
            type: "area",
          },
          dataLabels: {
            enabled: true,
            formatter: function (value) {
              let val = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
              return "$ " + val;
            },
            textAnchor: "middle",
            style: {
              fontSize: "10px",
              colors: undefined,
            },
          },
          fill: {
            opacity: 1,
          },
          yaxis: {
            style: {
              colors: ["#3394f8"],
            },
            labels: {
              formatter: function (value) {
                let val = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
                return "$ " + val;
              },
            },
          },
          xaxis: {
            categories: [],
            labels: {
              show: false,
            },
          },
          theme: {
            mode: "dark",
            palette: "palette1",
            monochrome: {
              enabled: false,
              color: "#255aee",
              shadeTo: "light",
              shadeIntensity: 0.65,
            },
          },
          annotations: {
            xaxis: [
              {
                x: "",
                borderColor: "#3394F8",
                label: {
                  borderColor: "#3394F8",
                  style: {
                    color: "#fff",
                    background: "#3394F8",
                  },
                  text: "NOW",
                },
              },
            ],
            tooltip: {
              x: {
                format: "dd MMM yyyy",
              },
            },
          },
        },
        series: [
          {
            name: "P&L",
            data: [],
          },
        ],
        responsive: [
          {
            breakpoint: 1000,
            options: {
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
            },
          },
        ],
      },
      profit: 0,
      balance: {},
      profileCompletionTasks: [],

      isLoading: false,
      isLoadingProfit: false,
      isLoadingDeals: false,

      showUserDetail: false,
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    userToken() {
      return this.$store.state.token;
    },
    user() {
      return this.$store.state.authUser;
    },
    exchange() {
      return this.$store.state.exchange.selectedExchange;
    },
  },
  methods: {
    // FETCH API
    async _fetchUserCompletion() {
      this.isLoading = true;
      try {
        let res = await this.$api.$get("/user/profile/completion");
        this.profileCompletionTasks = res.data;
        this.$store.commit("setProfileCompletion", res);
      } catch (error) {
        console.log(error);
      }
      this.$store.commit("setIsLoading", false);
    },
    async _fetchUserBalance() {
      this.isLoading = true;
      let res = await this.$api.$get("/user/user-exchange-balance", {
        params: {
          exchange: this.exchange,
          onlyUser: true,
          range: "daily",
          side: "SELL",
          token: this.userToken,
        },
      });
      this.isLoading = false;
      this.balance = res.data;
      this.$store.commit("setIsLoading", false);
    },
    async _fetchProfit() {
      let current = new Date();
      let y, m, d, start, end;
      y = current.getFullYear();
      m = current.getMonth();
      d = current.getDate();
      start = this.$moment(new Date(y, m, d)).valueOf();
      end = this.$moment(new Date(y, m, d + 1)).valueOf();
      this.isLoadingProfit = true;
      let res = await this.$api.$get("/user/profit", {
        params: {
          exchange: this.exchange,
          onlyUser: true,
          side: "SELL",
          start_date: start,
          end_date: end,
        },
      });
      this.isLoadingProfit = false;
      this.profit = res.data.profit;
      this.$store.commit("setIsLoading", false);
    },
    async _fetchChart() {
      this.showChart = false;
      var params = {
        exchange: this.exchange,
        startdate: this.startDate,
        enddate: this.endDate,
        style: this.style,
      };

      console.log("_fetchChart params: ", params);

      this.$api
        .$get("/user/chart", {
          params: {
            exchange: this.exchange,
            startdate: this.startDate,
            enddate: this.endDate,
            style: this.style,
          },
        })
        .then((res) => {
          this.showChart = true;
          this.$store.commit("setIsLoading", false);
          if (res.success) {
            if (res.series.length <= 0) {
              // IS EMPTY
              this.chartData.options.xaxis.categories = [];
              this.chartData.series = [{ name: "P&L", data: [] }];
            } else {
              // MOBILE AND DESKTOP FORMAT
              var isMobile = this.checkMobile();
              var dailyFormat = isMobile ? "DD-MM-YYYY" : "DD";
              var monthlyFormat = isMobile ? "MMM" : "MMM";

              if (isMobile) {
                this.chartData.options.xaxis.labels.show = false;
              } else {
                this.chartData.options.xaxis.labels.show = true;
              }

              var newCategories = res.categories.map((r) => {
                if (r.includes("-")) {
                  var date = this.$moment(r, "DD-MM-YYYY").format(dailyFormat);
                  var now = this.$moment().format(dailyFormat);
                  if (date == now) {
                    this.chartData.options.annotations.xaxis[0].x = now;
                  }
                  return date;
                } else {
                  var date = this.$moment(r, "MMM").format(monthlyFormat);
                  var now = this.$moment().format(monthlyFormat);
                  if (date == now) {
                    this.chartData.options.annotations.xaxis[0].x = now;
                  }
                  return date;
                }
              });
              this.chartData.options.xaxis.categories = newCategories;
              // this.chartData.options.xaxis.min = 1;
              // this.chartData.options.xaxis.max = 31;
              let value = [];
              res.series.forEach((val) => {
                let convert =
                  "$" +
                  parseFloat(val)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
                value.push(convert);
              });
              this.chartData.series[0].data = res.series;
              console.log(
                "this.chartData.series[0].data",
                this.chartData.series[0].data
              );
            }
            this.$forceUpdate();
          } else {
            this.$store.commit("setShowSnackbar", {
              show: true,
              message: "Unable to fetch chart data properly",
              color: "customPink",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: err,
            color: "customPink",
          });
        });
    },
    async _fetchDailyDeals() {
      this.isLoadingDeals = true;
      let current = new Date();
      let y, m, d, start, end;
      y = current.getFullYear();
      m = current.getMonth();
      d = current.getDate();
      start = this.$moment(new Date(y, m, d)).valueOf();
      end = this.$moment(new Date(y, m, d + 1)).valueOf();
      let res = await this.$api.$get("/user/deal", {
        params: {
          exchange: this.exchange,
          start_date: start,
          end_date: end,
        },
      });
      this.deal = res.data ? res.data : 0;
      this.isLoadingDeals = false;
      this.$store.commit("setIsLoading", false);
    },

    // TRIGGER
    onStyleSelected(style) {
      this.style = style;
      let currentTime, y, m, d;
      currentTime = new Date();
      y = currentTime.getFullYear();
      m = currentTime.getMonth();
      d = currentTime.getDate();
      if (style == "daily") {
        this.styleValue = m;
      } else {
        this.styleValue = y;
      }
    },
    onExchangeChanged() {
      console.log("onExchangeChanged: EXCHANGE CHANGED");

      this.$store.commit("setIsLoading", true);
      this._fetchChart();
      this._fetchDailyDeals();
      this._fetchProfit();
      this._fetchUserBalance();
    },

    setDefaultChart() {
      let current, y, m, d, start_date, end_date;
      current = new Date();
      y = current.getFullYear();
      m = current.getMonth();
      d = current.getDate();
      this.style = "daily";
      this.styleValue = m;
    },
  },
  beforeMount() {
    this.$store.commit("setIsLoading", true);
  },
  async mounted() {
    this.$store.commit("setTitle", this.title);
    this.setDefaultChart();
    // this._fetchChart();
    this._fetchDailyDeals();
    this._fetchUserBalance();
    this._fetchProfit();
    this._fetchUserCompletion();
    setTimeout(() => {
      this.$store.commit("setIsLoading", false);
    }, 500);
  },
  watch: {
    "$vuetify.theme.dark": {
      handler(nv, ov) {
        this.chartData.options.theme.mode = this.$vuetify.theme.dark
          ? "dark"
          : "light";
      },
      immediate: true,
    },
    exchange(nv, ov) {
      console.log("WATCH: exchange");
      this.$store.commit("exchange/setSelectedExchange", nv);
      this._fetchChart();
      this._fetchDailyDeals();
      this._fetchUserBalance();
      this._fetchProfit();
    },
    styleValue(nv, ov) {
      let current, y, m, d;
      current = new Date();
      y = current.getFullYear();
      m = current.getMonth();
      d = current.getDate();

      if (this.style == "daily") {
        this.startDate = this.$moment(
          new Date(y, this.styleValue, 1)
        ).valueOf();
        this.endDate = this.$moment(
          new Date(y, this.styleValue + 1, 1)
        ).valueOf();
      } else {
        this.startDate = this.$moment(
          new Date(this.styleValue, 0, 1)
        ).valueOf();
        this.endDate = this.$moment(
          new Date(this.styleValue + 1, 0, 1)
        ).valueOf();
      }
      this._fetchChart();
    },
  },
};
</script>

<style>
div.apexcharts-theme-dark > svg {
  background: #212434 !important;
}

.mobile-main-container {
}
.mobile-first-container {
  width: 100%;
  height: 300px;
}
</style>