<template>
  <v-card flat class="pa-3" rounded>
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <v-card flat rounded>
          <v-row align="center" justify="center">
            <v-col cols="4" class="d-flex flex-column justify-center">
              <v-btn
                @click.native="actionMode = 'Deposit'"
                style="width: 45%"
                class="my-2"
                rounded
                depressed
                block
                :color="actionMode == 'Deposit' ? 'primary' : '#F4F7FD'"
              >
                Deposit
              </v-btn>
              <v-btn
                @click.native="actionMode = 'Withdraw'"
                style="width: 45%"
                class="my-2"
                rounded
                depressed
                block
                :color="actionMode == 'Withdraw' ? 'primary' : '#F4F7FD'"
              >
                Withdraw
              </v-btn>
            </v-col>
            <v-col cols="8">
              <v-row align="center" justify="start">
                <v-col cols="12" v-if="actionMode == 'Deposit'">
                  <v-btn
                    class="text-capitalize"
                    rounded
                    color="primary"
                    style="width: 95%"
                    depressed
                    @click="showDeposit"
                    block
                  >
                    Deposit
                  </v-btn></v-col
                >
                <v-col v-else cols="12">
                  <div class="mb-2 font-weight-bold">
                    Total USDT To Withdraw
                  </div>

                  <v-text-field
                    v-model="withdrawAmount"
                    required
                    placeholder="Total USDT To Apply"
                    hide-details=""
                    rounded
                    class="my-2 custom-input text-body-1"
                  >
                  </v-text-field>

                  <v-btn
                    rounded
                    class="text-capitalize"
                    color="primary"
                    style="width: 95%"
                    depressed
                    @click="showWithdraw"
                    block
                  >
                    Withdraw
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="depositDialog"
      max-width="900"
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <template>
        <v-card flat>
          <v-card-title class="text-h5">
            Deposit
            <v-spacer></v-spacer>
            <v-btn icon @click="depositDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-if="userData" class="mt-3">
            <v-row justify="center " align="center">
              <v-col cols="12" md="4">
                <v-img
                  position="center"
                  contain
                  :src="require('~/assets/qrcodeplaceholder.jpg')"
                ></v-img>
              </v-col>
              <v-col cols="12" md="8">
                <div class="mb-5">
                  <p class="font-weight-bold">
                    Network<br /><strong>POLYGON (ERC20)</strong>
                  </p>
                  <p class="font-weight-bold">
                    Address<br /><strong>{{ userData.wallet_va }}</strong>
                    <v-tooltip color="primary" v-model="copied" top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="primary"
                          size="16"
                          v-clipboard:copy="userData.wallet_va"
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onError"
                        >
                          <v-icon color="grey lighten-1">
                            mdi-content-copy
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>{{ copied ? "Copy" : "Copied" }}</span>
                    </v-tooltip>
                  </p>
                </div>
                <div class="text-chip font-weight-bold">
                  To make deposit <b>USDT</b> to your account, please transfer
                  amount to your <b>Virtual Account Wallet</b> with the
                  following information. Minimum transfer amount is
                  <b>$10</b> and <b>$1</b> of admin fee will be applied. For
                  example, if you transfer $100, so $99 will be added to your
                  balance.
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text v-else class="mt-3">
            You don't have an Virtual Account Wallet. Please contact our
            customer service for further information.
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog
      v-model="withdrawDialog"
      max-width="600"
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <template>
        <v-card class="pa-3">
          <v-card-title class="text-h5 lighten-2">
            Whithdraw
            <v-spacer></v-spacer>
            <v-btn icon @click="withdrawDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text v-if="userData" class="mt-3">
            To make deposit <b>USDT</b> to your account, please transfer amount
            to your <b>Virtual Account Wallet</b> with the following
            information. Minimum transfer amount is <b>$10</b> and <b>$1</b> of
            admin fee will be applied. For example, if you transfer $100, so $99
            will be added to your balance.
            <div class="mt-5">
              <p>Network<br /><strong>POLYGON (ERC20)</strong></p>
              <p>
                Address<br /><strong>{{ userData.wallet_va }}</strong>
              </p>
            </div>
          </v-card-text>
          <v-card-text v-else class="mt-3">
            You don't have an Virtual Account Wallet. Please contact our
            customer service for further information.
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      balance: 0,
      depositDialog: false,
      withdrawDialog: false,
      withdrawAmount: 0,
      copied: false,
      styleElement: null,
      isLoading: false,
      actionMode: "Deposit",
    };
  },
  mounted() {
    this.countBalance();
    this.getProfile();
  },
  methods: {
    countBalance() {
      this.isLoading = true;
      this.$api
        .$get("/user/balance/total")
        .then((res) => {
          this.balance = res.result ? res.result : 0;
        })
        .catch((err) => {
          this.balance = 0;
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getProfile() {
      this.isLoading = true;
      this.$api
        .$get("/user/profile")
        .then((res) => {
          this.userData = res.result;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    showDeposit() {
      this.depositDialog = true;
    },
    showWithdraw() {
      this.withdrawDialog = true;
    },
    onCopy: function (e) {
      this.copied = !this.copied;
    },
    onError: function (e) {
      alert("Failed to copy: " + e.text);
    },

    // CSS HIJACK
    applyStyle(styleDef) {
      let styleElement = document.createElement("style");
      styleElement.type = "text/css";
      document.head.appendChild(styleElement);
      styleElement.innerHTML = styleDef;
      return styleElement;
    },
  },
  computed: {
    style() {
      if (this.depositDialog) {
        return `
        .v-overlay--active {
          background: #1a202c4d 0% 0% no-repeat padding-box;
          opacity: 1;
          backdrop-filter: blur(4px);
        }
        `;
      }
      return "";
    },
  },
  watch: {
    style: function (style) {
      if (this.styleElement) {
        this.styleElement.parentNode.removeChild(this.styleElement);
      }
      this.styleElement = this.applyStyle(style);
    },
  },
};
</script>

<style scoped>
.custom-card {
  position: relative;
  background-color: var(--primary);
}

.text-chip {
  padding: 20px;
  background-color: #f4f7fd;
  border-radius: 20px;
}
.custom-input {
  margin-top: 0px !important;
  padding: 0px !important;
}
</style>
