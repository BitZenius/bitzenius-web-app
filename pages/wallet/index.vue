<template>
<v-row>
  <v-col cols="12">
    <v-card
      elevation="8"
      class="pa-3"
    >
      <v-row>
        <v-col cols="12">
          <CardBalance />
        </v-col>
      </v-row>
      <v-row v-show="false" class="mt-1">
        <v-col cols="12" md="4">
          <v-select :items="availablePair" label="Filter" dense outlined></v-select>
        </v-col>
        <v-col cols="6" md="4">
          <v-select :items="availableSorting" label="Sorting By" dense outlined></v-select>
        </v-col>
        <v-col cols="6" md="4" style="text-align:right;">
          <v-btn class="default">
            <v-icon>
              mdi-chevron-up-circle-outline
            </v-icon>
          </v-btn>
          <v-btn class="ml-2 default">
            <v-icon>
              mdi-chevron-down-circle-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="transactions"
        :loading="isLoading"
        :options.sync="options"
        :server-items-length="totalItems"
        :page="lastPage"
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
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  layout: 'account',
  data() {
    return {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor in',
      title: 'Wallet',
      isLoading: false,
      availablePair: [
        "FTM/USDT",
        "BTC/USDT",
        "XRP/USDT"
      ],
      availableSorting: [
        "Date",
        "Type"
      ],
      showClaimRewardModal: false,
      referralTableHeaders: [{
          text: "Title",
          align: "start",
          value: "title"
        },
        {
          text: "Value",
          align: "start",
          value: "value",
          cellClass: "font-weight-bold"
        },
      ],
      referralItems: [{
          title: 'Total Deposit',
          value: '$1000',
          type: 'money'
        },
        {
          title: 'Total Profit',
          value: '$1200',
          type: 'money'
        },
        {
          title: 'Total Referral Reward',
          value: "$120",
          type: 'money'
        }
      ],
      // ID, Type, Date, Profit, Price, Qty
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
      transactions: []
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  computed: {
    formTitle () {
      return this.id === '' ? 'Add User' : 'Edit User'
    },
    user() {
      return this.$store.state.authUser
    },
    lastPage() {
      return Math.ceil(this.totalItems / this.rowsPerPage)
    }
  },
  watch: {
    options: {
      handler () {
        this.initialize()
      },
      deep: true
    }
  },
  mounted() {
    this.$store.commit('setTitle', this.title)
    this.initialize()
  },
  methods: {
    initialize () {
      this.isLoading = true
      const { page, itemsPerPage } = this.options
      this.rowsPerPage = itemsPerPage

      this.$api.$get('/user/balance', {
        params: {
          limit: itemsPerPage,
          page
        }
      }).then((res) => {
        console.log(res)
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
    }
  }
}
</script>
