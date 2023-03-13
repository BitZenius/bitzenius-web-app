<template>
  <v-card v-if="checkMobile() == false" flat class="no-padding">
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
      <v-col cols="12">
        <v-card flat rounded class="pa-4">
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
                @click="showWithdraw"
              >
                Withdraw
              </v-btn>
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
            <v-row justify="center" align="center">
              <v-col cols="12" md="4">
                <qr-code :text="userData.wallet_va"></qr-code>
              </v-col>
              <v-col cols="12" md="8">
                <div class="mb-5">
                  <p class="font-weight-bold">
                    Network<br /><strong>Binance Smart Chain (BEP20)</strong>
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
                  To deposit USDT into your account, transfer the desired amount
                  to your Virtual Account Wallet with the following details. The
                  minimum transfer amount is $10, and an admin fee of $1 will be
                  applied. For instance, if you transfer $100, your balance will
                  be credited with $99.
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
            Withdraw
            <v-spacer></v-spacer>
            <v-btn icon @click="withdrawDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="mt-3">
            <v-row>
              <v-col cols="12">
                <ol>
                  <li>The minimum withdrawal amount is $1</li>
                  <li>
                    If you withdraw your entire remaining balance and subscribed
                    to a profit-sharing package, the bot will be automatically
                    stopped.
                  </li>
                </ol>
              </v-col>
              <v-col cols="12">
                <span class="text-body-1">Amount to withdraw (USDT)</span>
                <v-text-field
                  v-model="withdrawAmount"
                  required
                  placeholder="Amount"
                  hide-details=""
                  rounded
                  type="number"
                  class="my-2 custom-input text-body-1"
                >
                </v-text-field>
                <v-btn
                  class="mt-5"
                  color="primary"
                  flat
                  rounded
                  :disabled="withdrawAmount < 1 || withdrawAmount > balance"
                  block
                  @click="withdraw"
                >
                  Withdraw
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>

    <BaseModal
      @close="withdrawModal = false"
      :parentModel="withdrawModal"
      :maxWidth="'450'"
      :persistent="true"
    >
      <ModalsWithdraw
        :mode="withdrawModalMode"
        :description="withdrawModalDescription"
        @close-modal="withdrawModal = false"
        @main-event="(otpCode) => withdrawWithOTP(otpCode)"
      ></ModalsWithdraw>
    </BaseModal>

    <BaseModal
      @close="successModal = false"
      :parentModel="successModal"
      :maxWidth="'450'"
    >
      <ModalsSuccess
        @close-modal="successModal = false"
        @main-event="successModal = false"
      ></ModalsSuccess>
    </BaseModal>
  </v-card>
  <v-card v-else flat class="no-padding">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <v-card class="pa-4 custom-card" flat>
          <v-row align="center">
            <v-col cols="6" class="d-flex flex-column align-left">
              <v-list-item-avatar
                size="40"
                color="#F4F7FD"
                class="ma-0"
                style="align-self: start !important"
              >
                <v-img
                  max-width="25px"
                  max-height="25px"
                  :src="require('~/assets/images/wallet-icon.svg')"
                  position="center"
                ></v-img>
              </v-list-item-avatar>
              <span class="white--text font-weight-bold text-body-1 mt-3">
                Credit Balance
              </span>
              <span
                class="text-h5 font-weight-black white--text text--lighten-2"
              >
                <v-skeleton-loader v-if="isLoading" loading type="heading" />
                <div v-else>{{ balance | currency("$", 2) }}</div>
              </span>
            </v-col>
            <v-col
              cols="6"
              class="d-flex align-center justify-center"
              style="height: 100%"
            >
              <v-row>
                <v-col
                  cols="6"
                  class="d-flex flex-column align-center justify-center white--text"
                >
                  <v-btn
                    color="white"
                    @click="showDeposit"
                    depressed
                    fab
                    class="mb-2"
                  >
                    <v-icon color="primary">$vuetify.icons.DepositIcon</v-icon>
                  </v-btn>

                  Deposit
                </v-col>
                <v-col
                  cols="6"
                  class="d-flex flex-column align-center justify-center white--text"
                >
                  <v-btn
                    color="white"
                    @click="showWithdraw"
                    depressed
                    fab
                    class="mb-2"
                  >
                    <v-icon color="primary">$vuetify.icons.WithdrawIcon</v-icon>
                  </v-btn>
                  Withdraw
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
      transition="dialog-bottom-transition"
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
            <v-row justify="center" align="center">
              <v-col cols="12" md="4" class="d-flex justify-center">
                <qr-code :text="userData.wallet_va"></qr-code>
              </v-col>
              <v-col cols="12" md="8">
                <div class="mb-5">
                  <p class="font-weight-bold">
                    Network<br /><strong>Binance Smart Chain (BEP20)</strong>
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
                  To deposit USDT into your account, transfer the desired amount
                  to your Virtual Account Wallet with the following details. The
                  minimum transfer amount is $10, and an admin fee of $1 will be
                  applied. For instance, if you transfer $100, your balance will
                  be credited with $99.
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
      transition="dialog-bottom-transition"
    >
      <template>
        <v-card class="pa-3">
          <v-card-title class="text-h5 lighten-2">
            Withdraw
            <v-spacer></v-spacer>
            <v-btn icon @click="withdrawDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="mt-3">
            <v-row>
              <v-col cols="12">
                <ol>
                  <li>The minimum withdrawal amount is $1</li>
                  <li>
                    If you withdraw your entire remaining balance and subscribed
                    to a profit-sharing package, the bot will be automatically
                    stopped.
                  </li>
                </ol>
              </v-col>
              <v-col cols="12">
                <span class="text-body-1">Amount to withdraw (USDT)</span>
                <v-text-field
                  v-model="withdrawAmount"
                  required
                  placeholder="Amount"
                  hide-details=""
                  rounded
                  type="number"
                  class="my-2 custom-input text-body-1"
                >
                </v-text-field>
                <v-btn
                  class="mt-5"
                  color="primary"
                  flat
                  rounded
                  :disabled="withdrawAmount < 1 || withdrawAmount > balance"
                  block
                  @click="withdraw"
                >
                  Withdraw
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <BaseModalMobile
      @close="withdrawModal = false"
      :parentModel="withdrawModal"
      :maxWidth="'450'"
      :persistent="true"
    >
      <ModalsWithdraw
        :mode="withdrawModalMode"
        :description="withdrawModalDescription"
        @close-modal="withdrawModal = false"
        @main-event="(otpCode) => withdrawWithOTP(otpCode)"
      ></ModalsWithdraw>
    </BaseModalMobile>

    <BaseModalMobile
      @close="successModal = false"
      :parentModel="successModal"
      :maxWidth="'450'"
    >
      <ModalsSuccess
        @close-modal="successModal = false"
        @main-event="successModal = false"
      ></ModalsSuccess>
    </BaseModalMobile>
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
      actionMode: "Deposit",
      withdrawAmount: 0,
      withdrawModal: false,
      withdrawModalMode: "LOADING",
      withdrawModalDescription: "",
      otpModal: false,
      successModal: false,
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
    withdrawWithOTP(otpCode) {
      this.isLoading = true;

      setTimeout(() => {
        this.withdrawModalMode = "LOADING";
        this.withdrawModalDescription = "Processing withdraw";

        this.$api
          .$post("/user/balance/withdraw", {
            amount: parseFloat(this.withdrawAmount),
            otp: `${otpCode}`,
          })
          .then((res) => {
            console.log(res);

            this.successModal = true;
            this.withdrawModal = false;
          })
          .catch((err) => {
            console.log(err);
            this.withdrawModalMode = "ERROR";
            if (err.response && err.response.data.message) {
              this.withdrawModalDescription = err.response.data.message;
            }
            this.isLoading = false;
          })
          .finally(() => {
            this.isLoading = false;

            this.$emit("refetch");
          });
      }, 1000);
    },
    withdraw() {
      this.isLoading = true;
      this.withdrawModal = true;
      this.withdrawModalMode = "LOADING";
      this.withdrawModalDescription = "Sending OTP code to your email";

      this.$api
        .$post("/user/balance/withdraw", {
          amount: parseFloat(this.withdrawAmount),
        })
        .then((res) => {
          this.withdrawModalMode = "OTP";
          this.withdrawModalDescription =
            "OTP code has been sent to your email";
        })
        .catch((err) => {
          console.log(err.response);

          this.withdrawModalMode = "ERROR";

          if (err.response && err.response.data.message) {
            this.withdrawModalDescription = err.response.data.message;
          }
          this.isLoading = false;
        })
        .finally(() => {
          this.withdrawDialog = false;
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
  background-image: url("/images/signin-vector.svg");
  background-size: contain;
  background-position: 120% 20px;
  height: 100%;
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
