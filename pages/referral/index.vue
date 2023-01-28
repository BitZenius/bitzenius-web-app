<template>
<v-row>
  <v-col cols="12">
    <v-card
      :elevation="$vuetify.breakpoint.mobile ? 0 : 8"
      class="pa-3"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-img src="/referral/illustration-john.png" alt="" class="mt-5" />
        </v-col>
        <v-col md="6" cols="12">
          <div class="ma-3">
            <v-row>
              <v-col cols="12">
                <v-card
                  v-if="referralCode"
                  elevation="0"
                  class="pa-2"
                  color="primary"
                  dark
                >
                  <v-list color="primary">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Your Referral Code</v-list-item-title>
                        <v-list-item-subtitle><h1>{{ referralCode }}</h1></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
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
                              v-clipboard:copy="referralCode"
                              v-clipboard:success="onCopy"
                              v-clipboard:error="onError"
                            >
                              <v-icon color="white">
                                mdi-content-copy
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>{{ copied ? 'Copy' : 'Copied' }}</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Referral Link</v-list-item-title>
                        <v-list-item-subtitle>{{ referralLink }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-tooltip
                          v-model="copied2"
                          top
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              icon
                              v-bind="attrs"
                              v-on="on"
                              color="primary"
                              size="16"
                              v-clipboard:copy="referralLink"
                              v-clipboard:success="onCopy2"
                              v-clipboard:error="onError"
                            >
                              <v-icon color="white">
                                mdi-content-copy
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>{{ copied2 ? 'Copy' : 'Copied' }}</span>
                        </v-tooltip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
                <v-alert
                  v-else
                  color="yellow lighten-4"
                  light
                  icon="mdi-alert-outline"
                >
                  <v-row
                    align="center"
                    no-gutters
                  >
                    <v-col cols="12" md="8">
                      You're not eligible for the referral program. Please upgrade your plan.
                    </v-col>
                    <v-col cols="12" md="4" class="text-right">
                      <v-btn
                        color="primary"
                        depressed
                        class="text-capitalize"
                        to="/subscription"
                      >
                        Upgrade Now
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-list
                  two-line
                >
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon
                        color="white"
                        class="primary"
                      >
                        mdi-account-group-outline
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Total Referral</v-list-item-title>
                      <v-list-item-subtitle>Total referred peoples</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      {{ totalReferredUsers }}
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider />
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon
                        color="white"
                        class="primary"
                      >
                        mdi-currency-usd
                      </v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Total Earned</v-list-item-title>
                      <v-list-item-subtitle>Total earned rewards</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      {{ totalRewards | currency('$') }}
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      :elevation="$vuetify.breakpoint.mobile ? 0 : 8"
      class="pa-5 mt-5"
    >
      <v-row class="py-5">
        <v-col cols="12" class="d-flex justify-center">
          <div class="d-flex flex-column align-center justify-center" style="max-width:80%;">
            <h2>Rewards History</h2>
            <p class="text-center mt-2">
              Track your earned rewards of all your referral
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="transactions"
            :loading="isLoading"
            :options.sync="options"
            :server-items-length="totalItems"
            :items-per-page="rowsPerPage"
            disable-sort
            class="elevation-0"
            loading-text="Loading... Please wait"
          >
            <template #item.type="{item}">
              <v-chip
                small
                label
              >
                {{ item.type.toUpperCase() }}
              </v-chip>
            </template>
            <template #item.status="{item}">
              <v-chip
                v-if="item.status == 0"
                small
              >
                On Processing
              </v-chip>
              <v-chip
                v-if="item.status == 1"
                small
                color="success"
                class="white--text"
              >
                Done
              </v-chip>
              <v-chip
                v-if="item.status == 2"
                small
                color="error"
                class="white--text"
              >
                Cancelled
              </v-chip>
            </template>
            <template #item.amount="{item}">
              <div class="text-right">
                <span v-if="item.credit > 0" class="success--text">
                  {{ item.amount | currency('$') }} <v-icon color="success" size="16">mdi-arrow-bottom-left</v-icon>
                </span>
                <span v-if="item.debt > 0" class="danger--text">
                  {{ item.amount | currency('$') }} <v-icon color="danger" size="16">mdi-arrow-top-right</v-icon>
                </span>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  layout: 'account',
  data() {
    return {
      title: 'Referral',
      isLoading: false,
      headers: [
        {
          text: "Date",
          align: "left",
          value: "date"
        },
        {
          text: "Type",
          align: "left",
          value: "type"
        },
        {
          text: "Desc",
          align: "left",
          value: "description"
        },
        {
          text: "Amount",
          align: "right",
          value: "amount"
        },
        {
          text: "Status",
          align: "left",
          value: "status"
        }
      ],
      options: {},
      totalItems: 0,
      rowsPerPage: 10,
      referralCode: "",
      referralLink: '',
      totalRewards: 0,
      totalReferredUsers: 0,
      transactions: [],
      copied: false,
      copied2: false
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  watch: {
    options: {
      handler () {
        this.getRewards()
      },
      deep: true
    },
  },
  mounted() {
    this.$store.commit('setTitle', this.title)
    this.getProfile()
    this.countRewards()
    this.getRewards()
  },
  methods: {
    getProfile () {
      this.isLoading = true
      this.$api.$get('/user/referral').then((res) => {
        this.referralCode = res.code
        this.referralLink = window.location.origin + '/signup?' + res.code
        this.totalReferredUsers = res.total_referred_users
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.isLoading = false
      })
    },
    countRewards () {
      this.isLoading = true
      this.$api.$get('/user/referral/total').then((res) => {
        console.log(res)
        this.totalRewards = res.result
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.isLoading = false
      })
    },
    getRewards () {
      this.isLoading = true
      const { page, itemsPerPage } = this.options
      this.rowsPerPage = itemsPerPage

      this.$api.$get('/user/referral/rewards', {
        params: {
          limit: itemsPerPage == -1 ? this.totalItems : itemsPerPage,
          page
        }
      }).then((res) => {
        this.totalItems = res.result.total
        const transactions = []
        
        res.result.data.forEach((result) => {
          transactions.push({
            id: result._id,
            date: this.$moment(result.created_at).format('DD MMM YYYY HH:mm'),
            description: result.description,
            amount: result.debt || result.credit,
            debt: result.debt,
            credit: result.credit,
            type: result.type.replace('_', ' '),
            status: result.status
          })
        })

        this.transactions = transactions
        this.isLoading = false
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    closeModal() {
      alert('closeModal')
    },
    onCopy: function (e) {
      this.copied = !this.copied
    },
    onCopy2: function (e) {
      this.copied2 = !this.copied2
    },
    onError: function (e) {
      alert('Failed to copy: ' + e.text)
    }
  }
}
</script>
