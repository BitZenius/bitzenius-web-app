<template>
  <v-card
    elevation="8"
    class="pa-3"
  >
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>
              Credit Balance
            </v-list-item-subtitle>
            <v-list-item-title>
              <span class="text-h4 font-weight-black primary--text text--lighten-2">
                <v-skeleton-loader
                  v-if="isLoading"
                  loading
                  type="heading"
                />
                <div v-else>{{ balance | currency('$', 2) }}</div>
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-end"
      >
        <v-btn
          class="mx-1 text-capitalize"
          color="primary"
          depressed
          @click="showDeposit"
        >
          <v-icon class="mr-1">mdi-arrow-up-circle</v-icon>
          Deposit
        </v-btn>
        <v-btn
          class="text-capitalize"
          color="primary"
          depressed
          disabled
          @click="showWithdraw"
        >
          <v-icon class="mr-1">mdi-arrow-down-circle</v-icon>
          Withdraw
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="depositDialog" max-width="600" :fullscreen="$vuetify.breakpoint.mobile">
      <template>
        <v-card class="pa-3">
          <v-card-title class="text-h5 lighten-2">
            Deposit
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="depositDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text
            v-if="userData"
            class="mt-3"
          >
            To make deposit <b>USDT</b> to your account, please transfer amount to your <b>Virtual Account Wallet</b> with the following information. Minimum transfer amount is <b>$10</b> and <b>$1</b> of admin fee will be applied. For example, if you transfer $100, so $99 will be added to your balance.
            <div
              class="mt-5"
            >
              <p>Network<br/><strong>POLYGON (ERC20)</strong></p>
              <p>
                Address<br/><strong>{{ userData.wallet_va }}</strong>
                <v-tooltip
                  v-model="copied"
                  top
                >
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
                  <span>{{ copied ? 'Copy' : 'Copied' }}</span>
                </v-tooltip>
              </p>
            </div>
          </v-card-text>
          <v-card-text
            v-else
            class="mt-3"
          >
            You don't have an Virtual Account Wallet. Please contact our customer service for further information.
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog v-model="withdrawDialog" max-width="600" :fullscreen="$vuetify.breakpoint.mobile">
      <template>
        <v-card class="pa-3">
          <v-card-title class="text-h5 lighten-2">
            Whithdraw
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="withdrawDialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text
            v-if="userData"
            class="mt-3"
          >
            To make deposit <b>USDT</b> to your account, please transfer amount to your <b>Virtual Account Wallet</b> with the following information. Minimum transfer amount is <b>$10</b> and <b>$1</b> of admin fee will be applied. For example, if you transfer $100, so $99 will be added to your balance.
            <div
              class="mt-5"
            >
              <p>Network<br/><strong>POLYGON (ERC20)</strong></p>
              <p>Address<br/><strong>{{ userData.wallet_va }}</strong></p>
            </div>
          </v-card-text>
          <v-card-text
            v-else
            class="mt-3"
          >
            You don't have an Virtual Account Wallet. Please contact our customer service for further information.
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
      copied: false,
      isLoading: false
    }
  },
  mounted() {
    this.countBalance()
    this.getProfile()
  },
  methods: {
    countBalance () {
      this.isLoading = true
      this.$api.$get('/user/balance/total').then((res) => {
        this.balance = res.result ? res.result : 0
      }).catch((err) => {
        this.balance = 0
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    getProfile () {
      this.isLoading = true
      this.$api.$get('/user/profile').then((res) => {
        this.userData = res.result
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    showDeposit() {
      this.depositDialog = true
    },
    showWithdraw() {
      this.withdrawDialog = true
    },
    onCopy: function (e) {
      this.copied = !this.copied
    },
    onError: function (e) {
      alert('Failed to copy: ' + e.text)
    }
  }
}
</script>
