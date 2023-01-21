<template>
  <v-card
    elevation="8"
    class="pa-5 mt-10"
  >
    <v-row class="py-5">
      <v-col cols="12" class="d-flex justify-center">
        <div class="d-flex flex-column align-center justify-center" style="max-width:80%;">
          <h2>Invoices</h2>
          <p class="text-center mt-2">
            Invoices of your subscription history can be manage here
          </p>
        </div>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="invoices"
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
      <template #item.totals.total="{item}">
        <div class="text-right">
          {{ item.totals.total | currency('$') }}
        </div>
      </template>
      <template #item.payment.paid="{item}">
        <v-chip
          v-if="item.payment.paid"
          small
          color="success"
        >
          Paid at {{ $moment(item.payment.date).format('DD MMM YYYY HH:mm') }}
        </v-chip>
        <v-chip
          v-else
          small
        >
          Unpaid
        </v-chip>
      </template>
      <template #item.active="{item}">
        <v-btn
          icon
          color="primary"
          depressed
          @click="getInvoice(item._id)"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="invoiceDialog"
      max-width="600"
      scrollable
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <template>
        <v-card
          v-if="activeInvoice"
        >
          <v-card-title>
            <h2>Invoice</h2>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="closeInvoiceDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text
            class="mt-3"
          >
            <table class="invoice">
              <tbody>
                <tr>
                  <td><b>Invoice ID</b></td>
                  <td class="text-right">{{ activeInvoice.invoice_id }}</td>
                </tr>
                <tr>
                  <td><b>Date</b></td>
                  <td class="text-right">{{ $moment(activeInvoice.created_at).format('DD MMM YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td><b>Status</b></td>
                  <td class="text-right">
                    <v-chip
                      v-if="activeInvoice.payment.paid"
                      small
                      color="success"
                    >
                      Paid at {{ $moment(activeInvoice.payment.date).format('DD MMM YYYY HH:mm') }}
                    </v-chip>
                    <v-chip
                      v-else
                      small
                    >
                      Unpaid
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="invoice">
              <thead>
                <tr>
                  <th class="text-left">
                    Description
                  </th>
                  <th class="text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ activeInvoice.description }}</td>
                  <td class="text-right">{{ activeInvoice.totals.subtotal | currency('$') }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th class="text-right">Subtotal</th>
                  <th class="text-right">{{ activeInvoice.totals.subtotal | currency('$') }}</th>
                </tr>
                <tr>
                  <th class="text-right">{{ activeInvoice.discount.source == 'promo-code' ? 'Promo Code Discount' : (activeInvoice.discount.source == 'referral' ? 'Referral Discount' : 'Discount') }}</th>
                  <th class="text-right">{{ activeInvoice.totals.discount * -1 | currency('$') }}</th>
                </tr>
                <tr>
                  <th class="text-right">Grand Total</th>
                  <th class="text-right">{{ activeInvoice.totals.total | currency('$') }}</th>
                </tr>
              </tfoot>
            </table>
            <div
              v-if="!activeInvoice.payment.paid"
            >
              <v-radio-group
                v-model="payment"
                column
              >
                <v-radio
                  label="Pay using crypto currency (USDT)"
                  value="crypto"
                />
                <v-radio
                  value="credit_balance"
                  :disabled="balance < activeInvoice.totals.total"
                >
                  <template v-slot:label>
                    <div>Pay using credit balance <strong class="success--text">{{ balance | currency('$') }}</strong></div>
                  </template>
                </v-radio>
              </v-radio-group>
              <div
                v-if="payment == 'crypto'"
              >
                To make payment to this invoice, please transfer {{ activeInvoice.totals.total | currency('$') }} of USDT to your virtual account with the following details:
                <table class="invoice">
                  <tbody>
                    <tr>
                      <td><b>Network</b></td>
                      <td>POLYGON (ERC20)</td>
                    </tr>
                    <tr>
                      <td><b>Address</b></td>
                      <td>
                        {{ activeInvoice.wallet_va }}
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
                              v-clipboard:copy="activeInvoice.wallet_va"
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                v-else
              >
                <v-btn
                  depressed
                  color="success"
                  :loading="isLoading"
                  @click="payInvoice"
                >
                  Pay Now
                </v-btn>
              </div>
            </div>
            <div
              v-else
            >
              <p>Thank you for your payment</p>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>
  
<script>
  export default {
    props: {
      invoice_id: {
        type: String,
        default: () => {
          return null
        }
      }
    },
    data() {
      return {
        isLoading: false,
        headers: [
          {
            text: "Invoice ID",
            align: "left",
            value: "invoice_id"
          },
          {
            text: "Date",
            align: "left",
            value: "date"
          },
          {
            text: "Description",
            align: "left",
            value: "description"
          },
          {
            text: "Amount",
            align: "right",
            value: "totals.total"
          },
          {
            text: "Status",
            align: "left",
            value: "payment.paid"
          },
          {
            text: "",
            align: "left",
            value: "active"
          }
        ],
        options: {},
        totalItems: 0,
        rowsPerPage: 10,
        invoices: [],
        invoiceDialog: false,
        activeInvoice: null,
        copied: false,
        payment: 'crypto',
        balance: 0
      }
    },
    computed: {
      user() {
        return this.$store.state.authUser
      }
    },
    watch: {
      options: {
        handler () {
          this.initialize()
        },
        deep: true
      },
      invoice_id: {
        handler (val) {
          this.getInvoice(val)
        }
      }
    },
    mounted () {
      this.countBalance()
      this.initialize()
    },
    methods: {
      initialize () {
        this.isLoading = true
        const { page, itemsPerPage } = this.options
        this.rowsPerPage = itemsPerPage

        this.$api.$get('/user/subscription/invoices', {
          params: {
            limit: itemsPerPage,
            page
          }
        }).then((res) => {
          this.totalItems = res.result.total
          const invoices = []
          
          res.result.data.forEach((result) => {
            invoices.push({
              ...result,
              date: this.$moment(result.created_at).format('DD MMM YYYY HH:mm')
            })
          })

          this.invoices = invoices
          this.isLoading = false
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.isLoading = false
        })
      },
      getInvoice (id) {
        this.isLoading = true
        this.$api.$get('/user/subscription/invoices/' + id).then((res) => {
          this.activeInvoice = res.result
          this.showInvoiceDialog()
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.isLoading = false
        })
      },
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
      payInvoice () {
        this.isLoading = true
        this.$api.$post('/user/subscription/invoices/' + this.activeInvoice._id + '/pay').then((res) => {
          this.closeInvoiceDialog()
          this.$store.commit('setShowSnackbar', {
            show: true,
            message: res.message,
            color: 'success'
          })
        }).catch((err) => {
          console.log(err)
          this.isLoading = false
        }).finally(() => {
          this.isLoading = false
        })
      },
      closeInvoiceDialog () {
        this.invoiceDialog = false
        this.initialize()
      },
      showInvoiceDialog () {
        this.invoiceDialog = true
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

<style>
  table.invoice {
    width: 100%;
    margin: 25px 0;
  }

  table.invoice , table.invoice th, table.invoice td {
    border: 1px solid rgb(190, 190, 190);
    border-collapse: collapse;
  }

  table.invoice th {
    font-weight: bold;
  }

  table.invoice th, table.invoice td {
    padding: 6px 15px;
  }
</style>
  