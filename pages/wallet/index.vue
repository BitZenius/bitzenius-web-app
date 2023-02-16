<template>
  <v-row class="pa-5">
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
          <CardBalanceWallet class="mb-6" />
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
            >
              <template v-slot:header.date="{ header }">
                <strong class="black--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.type="{ header }">
                <strong class="black--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.description="{ header }">
                <strong class="black--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.amount="{ header }">
                <strong class="black--text text-body-1 font-weight-bold">{{
                  header.text
                }}</strong>
              </template>
              <template v-slot:header.status="{ header }">
                <strong class="black--text text-body-1 font-weight-bold">{{
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
                  class="success--text font-weight-bold"
                  color="success-light"
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
    closeModal() {
      alert("closeModal");
    },
  },
};
</script>

<style>
</style>
