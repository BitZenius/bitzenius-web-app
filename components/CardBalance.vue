<template>
  <v-card flat class="no-padding">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <v-card class="pa-2 custom-card" flat>
          <v-list-item two-line>
            <v-list-item-avatar size="40" color="#F4F7FD">
              <v-img
                max-width="25px"
                max-height="25px"
                :src="require('~/assets/images/wallet-icon.svg')"
                position="center"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle
                class="white--text font-weight-bold text-body-1 mb-1"
              >
                Credit Balance
              </v-list-item-subtitle>
              <v-list-item-title>
                <span
                  class="text-h5 font-weight-black white--text text--lighten-2"
                >
                  <v-skeleton-loader v-if="isLoading" loading type="heading" />
                  <div v-else>{{ balance | currency("$", 2) }}</div>
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-card class="py-10" flat>
          <v-row align="center">
            <v-col cols="12" md="12" class="d-flex justify-center">
              <v-btn
                class="mx-1 text-capitalize d-flex"
                rounded
                color="primary"
                depressed
                @click="showDeposit"
              >
                Deposit
              </v-btn>
              <v-btn
                rounded
                class="text-capitalize"
                color="primary"
                depressed
                @click="$router.push('/wallet')"
              >
                Withdraw
              </v-btn>
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
                  <v-row align="center">
                    <v-col cols="12" md="4">
                      <qr-code :text="userData.wallet_va"></qr-code>
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
                      <div class="text-chip font-weight-bold off-white">
                        To make deposit <b>USDT</b> to your account, please
                        transfer amount to your
                        <b>Virtual Account Wallet</b> with the following
                        information. Minimum transfer amount is <b>$10</b> and
                        <b>$1</b> of admin fee will be applied. For example, if
                        you transfer $100, so $99 will be added to your balance.
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
                  To make deposit <b>USDT</b> to your account, please transfer
                  amount to your <b>Virtual Account Wallet</b> with the
                  following information. Minimum transfer amount is
                  <b>$10</b> and <b>$1</b> of admin fee will be applied. For
                  example, if you transfer $100, so $99 will be added to your
                  balance.
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
      </v-col>
    </v-row>
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
      copied: false,
      styleElement: null,
      isLoading: false,
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
.no-padding {
  padding: 0px !important;
}

.text-chip {
  padding: 20px;
  background-color: #f4f7fd;
  border-radius: 20px;
}
</style>
