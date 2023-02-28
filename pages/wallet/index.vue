<template>
  <v-row v-if="checkMobile() == false" class="pa-5">
    <v-dialog
      v-model="showDetailDialog"
      width="auto"
    >


      <v-card>
        <v-data-table
            :loading="isLoading"
            :headers="tradingHeadersDetail"
            :items="tradingItemsDetail"
            class="elevation-2 my-2"
          >
            <template v-slot:header.pair="{ header }">
              <strong class="basic-text--text text-body-1 font-weight-bold">{{
                header.text
              }}</strong>
            </template>
            <template v-slot:header.date="{ header }">
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
                <!-- <code>{{item.pair_from}}</code>
                                  <code>{{item.pair_to}}</code> -->
                <v-col cols="12" class="d-flex align-center justify-start">
                  <v-list-item-avatar class="ma-0">
                    <v-img
                      style="width: 28px !important"
                      max-width="28"
                      max-height="28"
                      :alt="item.pair"
                      :src="getImgUrl(item.pair_from)"
                    ></v-img>
                  </v-list-item-avatar>

                  <div class="d-flex flex-column ml-3">
                    <div class="d-flex flex-column">
                      <span class="text-subtitle-2 font-weight-bold">
                        {{ item.pair_from }} /
                        {{ item.pair_to }}
                      </span>
                      <small class="text-body-2">{{ item._id }}</small>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </template>
            <template v-slot:item.date="{ item }">
              <span class="text-subtitle-2 font-weight-bold">
                {{ $moment(item.executed_at).format("DD/MM/YYYY HH:mm") }}
              </span>
            </template>
            <template v-slot:item.price="{ item }">
              <v-chip
                v-if="parseFloat(item.pnl) > 0"
                small
                class="success--text font-weight-bold"
                color="success lighten-4"
                label
              >
                <span
                  >${{ item._profit.first }}.{{ item._profit.second }}</span
                >
              </v-chip>
              <v-chip
                v-else
                small
                class="font-weight-bold"
                color="danger"
                label
              >
                <span
                  >${{ item._profit.first }}.{{ item._profit.second }}</span
                >
              </v-chip>
            </template>
            <template v-slot:item.qty="{ item }">
              <span class="text-subtitle-2 font-weight-bold">{{
                item.amount_coin_filled.toFixed(4)
              }}</span>
            </template>
            <template v-slot:no-data>
              <BaseNoData  :label="`No Transaction`"></BaseNoData>
            </template>
          </v-data-table>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="3">
          <CardBalanceWallet @refetch="refetch" class="mb-6" />
          <!-- <CardActionWallet></CardActionWallet> -->
        </v-col>
        <!-- <v-col cols="6">
        </v-col> -->
        <v-col cols="9">
          <v-card flat rounded class="pa-3">
            <h3 class="text-body-h6 font-weight-bold mb-2">
              Transaction History
            </h3>
            <v-data-table
              :headers="headers"
              :items="transactions"
              :loading="isLoading"
              :options.sync="options"
              :server-items-length="totalItems"
              :items-per-page="rowsPerPage"
              disable-sort
              class="text-body-2"
              loading-text="Loading... Please wait"
              @click:row="onDetailClicked"
            >
              <template v-slot:header.date="{ header }">
                <strong class="basic-text--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.type="{ header }">
                <strong class="basic-text--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.description="{ header }">
                <strong class="basic-text--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.amount="{ header }">
                <strong class="basic-text--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.status="{ header }">
                <strong class="basic-text--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>

              <template #item.date="{ item }">
                <v-alert
                  dense
                  border="left"
                  colored-border
                  color="primary"
                  class="ma-0 py-1 text-body-2"
                  >{{ item.date }}</v-alert
                >
              </template>

              <template #item.type="{ item }">
                <v-chip small label color="primary" class="text-body-2">
                  {{ item.type.toUpperCase() }}
                </v-chip>
              </template>

              <template #item.status="{ item }">
                <v-chip v-if="item.status == 0" small> On Processing </v-chip>
                <v-chip
                  v-if="item.status == 1"
                  small
                  class="white--text font-weight-bold"
                  color="success"
                >
                  Done
                </v-chip>
                <v-chip
                  v-if="item.status == 2"
                  class="orange--text font-weight-bold"
                  color="customYellow lighten-2"
                  small
                >
                  Cancelled
                </v-chip>
              </template>
              <template #item.amount="{ item }">
                <div class="text-right">
                  <span
                    v-if="item.credit > 0"
                    class="success--text text-body-2"
                  >
                    <v-icon color="success" size="16"
                      >mdi-arrow-bottom-left</v-icon
                    >{{ item.amount | currency("$") }}
                  </span>
                  <span v-if="item.debt > 0" class="danger--text text-body-2">
                    <v-icon color="danger" size="16">mdi-arrow-top-right</v-icon
                    >{{ item.amount | currency("$") }}
                  </span>
                </div>
              </template>
              <template v-slot:no-data>
              <BaseNoData  :label="`No Transaction`"></BaseNoData>
            </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" v-if="false">
      <v-row>
        <v-col cols="12"> </v-col>
        <v-col cols="12" v-if="false">
          <CardRecentTransactionWallet> </CardRecentTransactionWallet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-else class="pa-5">
    <v-dialog
      v-model="showDetailDialog"
      width="auto"
    >


      <v-card>
        <v-data-table
            :loading="isLoading"
            :headers="tradingHeadersDetail"
            :items="tradingItemsDetail"
            class="elevation-2 my-2"
          >
            <template v-slot:header.pair="{ header }">
              <strong class="basic-text--text text-body-1 font-weight-bold">{{
                header.text
              }}</strong>
            </template>
            <template v-slot:header.date="{ header }">
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
                <!-- <code>{{item.pair_from}}</code>
                                  <code>{{item.pair_to}}</code> -->
                <v-col cols="12" class="d-flex align-center justify-start">
                  <v-list-item-avatar class="ma-0">
                    <v-img
                      style="width: 28px !important"
                      max-width="28"
                      max-height="28"
                      :alt="item.pair"
                      :src="getImgUrl(item.pair_from)"
                    ></v-img>
                  </v-list-item-avatar>

                  <div class="d-flex flex-column ml-3">
                    <div class="d-flex flex-column">
                      <span class="text-subtitle-2 font-weight-bold">
                        {{ item.pair_from }} /
                        {{ item.pair_to }}
                      </span>
                      <small class="text-body-2">{{ item._id }}</small>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </template>
            <template v-slot:item.date="{ item }">
              <span class="text-subtitle-2 font-weight-bold">
                {{ $moment(item.executed_at).format("DD/MM/YYYY HH:mm") }}
              </span>
            </template>
            <template v-slot:item.price="{ item }">
              <v-chip
                v-if="parseFloat(item.pnl) > 0"
                small
                class="success--text font-weight-bold"
                color="success lighten-4"
                label
              >
                <span
                  >${{ item._profit.first }}.{{ item._profit.second }}</span
                >
              </v-chip>
              <v-chip
                v-else
                small
                class="font-weight-bold"
                color="danger"
                label
              >
                <span
                  >${{ item._profit.first }}.{{ item._profit.second }}</span
                >
              </v-chip>
            </template>
            <template v-slot:item.qty="{ item }">
              <span class="text-subtitle-2 font-weight-bold">{{
                item.amount_coin_filled.toFixed(4)
              }}</span>
            </template>
            <template v-slot:no-data>
              <BaseNoData  :label="`No Transaction`"></BaseNoData>
            </template>
          </v-data-table>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          <v-icon @click="$router.push('/account')">mdi-arrow-left</v-icon>
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <CardBalanceWallet @refetch="refetch" class="mb-6" />
          <!-- <CardActionWallet></CardActionWallet> -->
        </v-col>
        <!-- <v-col cols="6">
        </v-col> -->
        <v-col cols="12">
          <v-card flat rounded class="pa-3">
            <h3 class="text-body-h6 font-weight-bold pa-3">
              Transaction History
            </h3>
            <v-data-table
              :headers="headers"
              :items="transactions"
              :loading="isLoading"
              :options.sync="options"
              :server-items-length="totalItems"
              :items-per-page="rowsPerPage"
              disable-sort
              class="text-body-2"
              loading-text="Loading... Please wait"
              @click:row="onDetailClicked"
            >
            <template v-slot:body="{items}">
                <v-row v-for="item,i in items" :key="`${i}-item`" class="mb-5">
                  <v-col cols="6"></v-col>
                  <v-col cols="6" class="text-right">
                    <v-chip v-if="item.status == 0" small> On Processing </v-chip>
                    <v-chip
                      v-if="item.status == 1"
                      small
                      class="white--text font-weight-bold"
                      color="success"
                    >
                      Done
                    </v-chip>
                    <v-chip
                      v-if="item.status == 2"
                      class="orange--text font-weight-bold"
                      color="customYellow lighten-2"
                      small
                    >
                      Cancelled
                    </v-chip>
                  </v-col>
                  <v-col cols="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                          Date
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.date }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                          Amount
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <span
                    v-if="item.credit > 0"
                    class="success--text text-body-2"
                  >
                    <v-icon color="success" size="16"
                      >mdi-arrow-bottom-left</v-icon
                    >{{ item.amount | currency("$") }}
                  </span>
                  <span v-if="item.debt > 0" class="danger--text text-body-2">
                    <v-icon color="danger" size="16">mdi-arrow-top-right</v-icon
                    >{{ item.amount | currency("$") }}
                  </span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                          Type
                        </v-list-item-title>
                        <v-list-item-subtitle class=" primary--text">
                          {{ item.type.toUpperCase() }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col cols="6">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2">
                          Description
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.description }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
            </template>



              <template v-slot:no-data>
              <BaseNoData  :label="`No Transaction`"></BaseNoData>
            </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" v-if="false">
      <v-row>
        <v-col cols="12"> </v-col>
        <v-col cols="12" v-if="false">
          <CardRecentTransactionWallet> </CardRecentTransactionWallet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      // Detail Dialog
      showDetailDialog: false,
      tradingHeadersDetail: [
        {
          text: "Pair",
          align: "start",
          value: "pair",
        },
        {
          text: "Date",
          align: "start",
          value: "date",
        },
        {
          text: "Profit",
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
      tradingItemsDetail: [],
      // End Of Detail Dialog
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in",
      title: "Wallet Overview",
      isLoading: false,
      availablePair: ["FTM/USDT", "BTC/USDT", "XRP/USDT"],
      availableSorting: ["Date", "Type"],
      showClaimRewardModal: false,
      referralTableHeaders: [
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
      referralItems: [
        {
          title: "Total Deposit",
          value: "$1000",
          type: "money",
        },
        {
          title: "Total Profit",
          value: "$1200",
          type: "money",
        },
        {
          title: "Total Referral Reward",
          value: "$120",
          type: "money",
        },
      ],
      // ID, Type, Date, Profit, Price, Qty
      headers: [
        {
          text: "Date",
          align: "left",
          value: "date",
        },
        {
          text: "Type",
          align: "left",
          value: "type",
        },
        {
          text: "Desc",
          align: "left",
          value: "description",
        },
        {
          text: "Amount",
          align: "right",
          value: "amount",
        },
        {
          text: "Status",
          align: "left",
          value: "status",
        },
      ],
      options: {},
      totalItems: 0,
      rowsPerPage: 10,
      transactions: [],
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    formTitle() {
      return this.id === "" ? "Add User" : "Edit User";
    },
    user() {
      return this.$store.state.authUser;
    },
  },
  watch: {
    options: {
      handler() {
        this.initialize();
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.commit("setTitle", this.title);
    this.initialize();
  },
  methods: {
    initialize() {
      this.isLoading = true;
      const { page, itemsPerPage } = this.options;
      this.rowsPerPage = itemsPerPage;

      this.$api
        .$get("/user/balance", {
          params: {
            limit: itemsPerPage == -1 ? this.totalItems : itemsPerPage,
            page,
          },
        })
        .then((res) => {
          this.totalItems = res.result.total;
          const transactions = [];

          res.result.data.forEach((result) => {
            transactions.push({
              id: result._id,
              date: this.$moment(result.created_at).format("DD MMM YYYY HH:mm"),
              description: result.description,
              amount: result.debt || result.credit,
              debt: result.debt,
              reference: result.reference,
              credit: result.credit,
              type: result.type.replace("_", " "),
              status: result.status,
            });
          });

          this.transactions = transactions;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    // Function
    getImgUrl(val) {
      try {
        let url = require("@/static/token_logo/" + val.toUpperCase() + ".png");
        return "/token_logo/" + val.toUpperCase() + ".png";
      } catch (err) {
        // console.log("img not exist", val);
        return "/token_logo/default.png";
      }
    },

    // Trigger
    async onDetailClicked(val) {
      try {
        let res = await this.$api.$get("/user/balance/detail", {
          params: {
            order_id: val.reference.id,
          },
        });

        let tempArray = [];
        // this.tradingItemsDetail = row.data;
        res.data.forEach((val) => {
          // PROFIT
          val._profit = {};
          let string = String(val.pnl.toFixed(4)).split(".");
          val._profit.first = val.pnl < 0 ? string[0] : parseFloat(string[0]);
          val._profit.second = string[1];

          // SYMBOL TO PAIR
          val.pair_from = val.symbol.substr(0, val.symbol.length - 4);
          val.pair_to = val.symbol.substr(-4);

          tempArray.push(val);
        });
        this.tradingItemsDetail = tempArray;
        this.showDetailDialog = true;
      } catch (error) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: error.message,
          color: "danger",
        });
      }
    },
    closeModal() {
      alert("closeModal");
    },

    refetch() {
      this.initialize();
    },
  },
};
</script>

<style>
</style>
