<template>
  <v-card
    elevation="0"
    outlined
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
              Balance
            </v-list-item-subtitle>
            <v-list-item-title>
              <span class="text-h4 font-weight-black primary--text text--lighten-2">{{ balance | currency('$') }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col
        cols="12"
        md="6"
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
    <v-dialog v-model="depositDialog" max-width="600">
      <template>
        <v-card class="pa-3">
          <v-card-title class="text-h5 lighten-2">
            Deposit
          </v-card-title>
          <v-card-text
            v-if="userData"
            class="mt-3"
          >
            To make deposit <b>USDT</b> to your account, please transfer amount to your <b>Virtual Account Wallet</b> with the following information. Minimum transfer amount is <b>$10</b> and <b>$1</b> of admin fee will be applied. For example, if you transfer $100, so $99 will be added to your balance.
            <v-alert
              text
              type="info"
              class="mt-5"
            >
              <p>Network<br/><strong>POLYGON (ERC20)</strong></p>
              <p>Address<br/><strong>{{ userData.wallet_va }}</strong></p>
            </v-alert>
          </v-card-text>
          <v-card-text
            v-else
            class="mt-3"
          >
            You don't have an Virtual Account Wallet. Please contact our customer service for further information.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="depositDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog v-model="withdrawDialog" max-width="600">
      <template>
        <v-card class="pa-3">
          <v-card-title class="text-h5 lighten-2">
            Withdraw
          </v-card-title>
          <v-card-text
            v-if="userData"
            class="mt-3"
          >
            To make deposit <b>USDT</b> to your account, please transfer amount to your <b>Virtual Account Wallet</b> with the following information. Minimum transfer amount is <b>$10</b> and <b>$1</b> of admin fee will be applied. For example, if you transfer $100, so $99 will be added to your balance.
            <v-alert
              text
              type="info"
              class="mt-5"
            >
              <p>Network<br/><strong>POLYGON (ERC20)</strong></p>
              <p>Address<br/><strong>{{ userData.wallet_va }}</strong></p>
            </v-alert>
          </v-card-text>
          <v-card-text
            v-else
            class="mt-3"
          >
            You don't have an Virtual Account Wallet. Please contact our customer service for further information.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="withdrawDialog = false">
              Close
            </v-btn>
          </v-card-actions>
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
      withdrawDialog: false
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
        this.balance = res.result
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    getProfile () {
      this.isLoading = true
      this.$api.$get('/user/profile').then((res) => {
        this.userData = res.result
        console.log(this.userData)
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
    }
  }
}
</script>
