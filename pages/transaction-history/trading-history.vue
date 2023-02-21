<template>
  <div>
    <v-row class="mt-1" justify="end">
      <v-col cols="12" md="3">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              placeholder="Date Range Picker"
              readonly
              v-bind="attrs"
              v-on="on"
              rounded
              dense
              class="mb-2 custom-input py-2"
            >
              <template v-slot:prepend-inner>
                <v-icon class="mr-4 grey-2--text">mdi-calendar</v-icon>
              </template>
            </v-text-field>
          </template>
          <v-date-picker v-model="dates" range no-title scrollable>
            <v-btn text color="customPink" @click="onClearDates()">
              Clear
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="onDateChanged(dates)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <!-- <v-btn x-small @click="logger">logger</v-btn> -->
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchQuery"
          placeholder="Search By Pair"
          rounded
          dense
          class="mb-2 custom-input py-2"
        >
          <template v-slot:prepend-inner>
            <v-icon class="mr-4 grey-2--text">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :loading="isLoading"
      :headers="tradingHeaders"
      :items="tradingItemsFiltered"
      :options.sync="options"
      :server-items-length="totalItems"
      :items-per-page="rowsPerPage"
      class="elevation-2 my-2"
    >
      <template v-slot:header.pair="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.type="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.date="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.desc="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.price="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.qty="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>

      <template v-slot:item.pair="{ item }">
        <v-row>
          <v-col cols="12" class="d-flex align-center justify-start">
            <!-- <img
              style="width: 28px"
              :alt="item.pair"
              :src="
                '/token_logo/' +
                item.pair.replace(/\s/g, '').split('/')[0].toUpperCase() +
                '.png'
              "
            /> -->
            <v-list-item-avatar class="ma-0">
              <v-img
                style="width: 28px !important"
                max-width="28"
                max-height="28"
                :alt="item.logo"
                :src="
                  '/token_logo/' +
                  item.pair.replace(/\s/g, '').split('/')[0].toUpperCase() +
                  '.png'
                "
              ></v-img>
            </v-list-item-avatar>
            <div class="d-flex flex-column ml-3">
              <div class="d-flex flex-column">
                <span class="text-subtitle-2 font-weight-bold">
                  {{ item.pair }}
                </span>
                <small class="text-body-2">{{ item.id }}</small>
              </div>
            </div>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.type="{ item }">
        <v-chip
          small
          label
          v-if="item.type == 'buy'"
          class="success--text font-weight-bold"
          color="success lighten-4"
          rounded
        >
          {{ item.type.toUpperCase() }}
        </v-chip>
        <v-chip
          small
          label
          v-else
          class="orange--text font-weight-bold"
          color="customYellow lighten-2"
          rounded
        >
          {{ item.type.toUpperCase() }}
        </v-chip>
      </template>
      <template v-slot:item.date="{ item }">
        <span class="text-subtitle-2 font-weight-bold">
          {{ $moment(item.date).format("DD/MM/YYYY HH:mm") }}
        </span>
      </template>
      <template v-slot:item.desc="{ item }">
        <div class="d-flex">
          <!-- <v-chip small v-if="item.type == 'buy'" color="info">
                    </v-chip> -->
          <div v-if="item.type == 'buy'" class="d-flex flex-column">
            <small class="text-body-2 font-weight-bold">{{
              item.type.toUpperCase() == "BUY" ? "STEP" : null
            }}</small>
            <span class="text-subtitle-2 font-weight-bold">
              {{ item.desc == 0 ? "Initial Order" : item.desc }}
            </span>
          </div>
          <div v-else class="d-flex flex-column">
            <small class="text-body-2 font-weight-bold">{{
              item.type.toUpperCase() == "SELL" ? "PnL" : null
            }}</small>
            <v-chip
              v-if="parseFloat(item.desc) > 0"
              small
              class="success--text font-weight-bold"
              color="success lighten-4"
              label
            >
              <span>${{ item._desc.first }}.{{ item._desc.second }}</span>
            </v-chip>

            <v-chip v-else small class="font-weight-bold" color="danger" label>
              <span>${{ item._desc.first }}.{{ item._desc.second }}</span>
            </v-chip>
          </div>
        </div>
      </template>
      <template v-slot:item.price="{ item }">
        <!-- {{item.price |currency('$', 6)}} -->
        <span class="text-subtitle-2 font-weight-bold"
          >${{ item._price.first }}.{{ item._price.second }}</span
        >
      </template>
      <template v-slot:item.qty="{ item }">
        <!-- {{item.qty}} -->
        <span class="text-subtitle-2 font-weight-bold"
          >{{ item._qty.first }}.{{ item._qty.second }}</span
        >
        <!-- </br><code>{{item._qty}}</code> -->
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  layout: "trading-history",
  data() {
    return {
      currentItem: "tab-Web",
      tables: ["Trading Report", "Daily Profit"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in",
      title: "Transaction Report",
      isLoading: true,
      // ID, Type, Date, Profit, Price, Qty
      options: {},
      totalItems: 0,
      rowsPerPage: 10,
      tradingHeaders: [
        {
          text: "Pair",
          align: "start",
          value: "pair",
        },
        {
          text: "Type",
          align: "start",
          value: "type",
        },
        {
          text: "Date",
          align: "start",
          value: "date",
        },
        {
          text: "Desc",
          align: "start",
          value: "desc",
        },
        {
          text: "Price",
          align: "center",
          value: "price",
          cellClass: "font-weight-bold",
        },
        {
          text: "Qty",
          align: "center",
          value: "qty",
          cellClass: "font-weight-bold",
        },
      ],
      // ID, Type, Date, Profit, Price, Qty
      tradingItems: [],
      claimHeaders: [
        {
          text: "Date",
          align: "start",
          value: "date",
        },
        {
          text: "Description",
          align: "start",
          value: "description",
        },
        {
          text: "Reward Claimed",
          align: "center",
          value: "amount",
          cellClass: "font-weight-bold",
        },
      ],
      refferalId: "123XYZ",
      // TABLE
      showTradingHistory: false,

      // DATERANGE
      dates: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      // SEARCHING
      searchQuery: null,
      // SORTING PURPOSE
      availablePair: [],
      availableSorting: [
        {
          id: "symbol",
          name: "Trading Pair",
        },
        {
          id: "created_at",
          name: "Date",
        },
        {
          id: "side",
          name: "Type",
        },
      ],
      pairSelected: null,
      sortSelected: null,
      ascending: false,
      descending: false,
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    tradingItemsFiltered() {
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
    exchange() {
      return this.$store.state.exchange.selectedExchange;
    },
  },
  mounted() {
    this.$store.commit("setTitle", this.title);
    if (!this.sortSelected) {
      this.sortSelected = this.availableSorting[1].id;
      this.descending = true;
      this._fetchReport({
        created_at: "descending",
      });
    }
  },
  methods: {
    // FETCH API
    logger() {
      this._fetchReport();
    },
    async _fetchReport(sorting) {
      const { page, itemsPerPage } = this.options;
      this.isLoading = true;
      let tempParams = {};
      tempParams.exchange = this.exchange;
      tempParams.limit = itemsPerPage == -1 ? this.totalItems : itemsPerPage,
      tempParams.page = page;

      if (this.pairSelected) {
        tempParams.symbol = this.pairSelected;
      }
      if (sorting) {
        tempParams.sorting = sorting;
      }

      if (this.dates.length > 0) {
        tempParams.dates = [];
        this.dates.forEach((date, id) => {
          console.log("id", id);
          console.log("date", date);
          if (id == 1) {
            tempParams.dates.push(this.$moment(date).add(1, "days").valueOf());
          } else {
            tempParams.dates.push(this.$moment(date).valueOf());
          }
        });
        console.log("tempParams.dates", tempParams.dates);
      }

      let res = await this.$api.$get("/user/trading-history", {
        params: tempParams,
      });

      this.$store.commit("setIsLoading", false);
      console.log("fetchReportTrading", res);
      if (res.success) {
          this.totalItems = res.count;
        res.data.forEach((val) => {
          // PRICE TO SMALLER AFTER COMMA
          val._price = {};
          let stringPrice = String(parseFloat(val.price).toFixed(4)).split(".");
          // let stringPrice = String(val.price).split(".");
          val._price.first = parseFloat(stringPrice[0]);
          val._price.second = stringPrice[1];

          // QTY TO SMALLER AFTER COMMA
          val._qty = {};
          let stringQty = String(parseFloat(val.qty).toFixed(4)).split(".");
          val._qty.first = parseFloat(stringQty[0]);
          val._qty.second = stringQty[1];

          // DESC SELL TO SMALLER AFTER COMMA
          if (val.type.toUpperCase() == "SELL") {
            val._desc = {};
            let stringDesc = String(parseFloat(val.desc).toFixed(4)).split(".");
            val._desc.first =
              val.desc > 0
                ? parseFloat(stringDesc[0])
                : Math.abs(parseFloat(stringDesc[0]));
            val._desc.second = stringDesc[1];
          }
        });
        this.tradingItems = res.data;
        this.availablePair = res.pairs;
        this.isLoading = false;
        this.showTradingHistory = true;
      } else {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Error",
          color: "customPink",
        });
        this.isLoading = false;
        this.showTradingHistory = true;
      }
    },
    // TRIGGER
    onDateChanged(dates) {
      console.log("dates", dates);
      let sort = {};
      this._fetchReport();
    },
    onClearDates() {
      this.dates = [];
      this.menu = false;
      this._fetchReport();
    },
    onPairSelected(pair) {
      this._fetchReport(null);
    },
    onSortClicked(by, dest) {
      if (dest == "ascending") {
        this.descending = false;
        this.ascending = true;
      } else {
        this.descending = true;
        this.ascending = false;
      }
      if (!by) alert("Please, select atleast one sorting by");
      let sort = {};
      sort[by] = dest;
      this._fetchReport(sort);
    },
    resetFilter() {
      this.descending = false;
      this.ascending = false;
      this.pairSelected = null;
      this.searchQuery = null;
      this.dates = [];
      this._fetchReport(null);
    },
    closeModal() {
      alert("closeModal");
    },
  },
  watch: {
    exchange(nv, ov) {
      this._fetchReport(null);
      this.$store.commit("setIsLoading", true);
    },
    options: {
      handler() {
        this._fetchReport({
          created_at: "descending",
        });
      },
      deep: true,
    },
  },
};
</script>