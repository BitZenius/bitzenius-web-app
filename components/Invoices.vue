<template>
  <v-card v-if="checkMobile() == false" elevation="8" class="pa-5 mt-10">
    <v-row v-if="false" class="py-5">
      <v-col cols="12" class="d-flex justify-center">
        <div
          class="d-flex flex-column align-center justify-center"
          style="max-width: 80%"
        >
          <!-- <h2>Invoices</h2> -->
          <p class="text-center mt-2">
            Track your invoices or subscription history
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
      <template v-slot:header.invoice_id="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.date="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.description="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.totals.total="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.payment.paid="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>
      <template v-slot:header.active="{ header }">
        <strong class="basic-text--text text-body-1 font-weight-bold">{{
          header.text
        }}</strong>
      </template>

      <template #item.type="{ item }">
        <v-chip small label>
          {{ item.type.toUpperCase() }}
        </v-chip>
      </template>

      <template #item.date="{ item }">
        <div class="text-subtitle-2 font-weight-bold">
          {{ item.date }}
        </div>
      </template>

      <template #item.description="{ item }">
        <div class="text-subtitle-2 font-weight-bold">
          {{ item.description }}
        </div>
      </template>

      <template #item.totals.total="{ item }">
        <div class="text-subtitle-2 font-weight-bold">
          {{ item.totals.total | currency("$") }}
        </div>
      </template>

      <template #item.invoice_id="{ item }">
        <span class="text-subtitle-2 font-weight-bold">{{
          item.invoice_id
        }}</span>
      </template>

      <template #item.payment.paid="{ item }">
        <!-- <v-chip v-if="item.payment.paid" small color="success">
          Paid at {{ $moment(item.payment.date).format("DD MMM YYYY HH:mm") }}
        </v-chip> -->
        <v-list-item-avatar v-if="item.payment.paid" size="25" color="success">
          <v-icon color="white" small> mdi-check </v-icon>
        </v-list-item-avatar>
        <v-chip v-else small> Unpaid </v-chip>
      </template>
      <template #item.active="{ item }">
        <v-btn icon color="primary" depressed @click="getInvoice(item._id)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <BaseModal
      :parentModel="invoiceDialog"
      :maxWidth="'600'"
      @close="invoiceDialog = false"
    >
      <template>
        <v-card flat rounded v-if="activeInvoice" style="overflow-x: hidden">
          <v-card-title
            class="text-h6 font-weight-bold primary basic--text mb-5"
          >
            <v-row>
              <v-col cols="6">
                <v-img
                  :src="'/bitzenius-logo-white.png'"
                  height="24"
                  contain
                  position="left center"
                />
              </v-col>
              <v-col cols="4" class="d-flex justify-end">
                <v-btn color="basic" icon @click="closeInvoiceDialog">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row class="pa-5">
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Invoice ID
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong class="text-body-1">
                        {{ activeInvoice.invoice_id }}
                      </strong>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Date
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong class="text-body-1">
                        {{
                          $moment(activeInvoice.created_at).format(
                            "DD MMM YYYY HH:mm"
                          )
                        }}</strong
                      >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Status
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip
                        v-if="activeInvoice.payment.paid"
                        small
                        color="success"
                      >
                        Paid at
                        {{
                          $moment(activeInvoice.payment.date).format(
                            "DD MMM YYYY HH:mm"
                          )
                        }}
                      </v-chip>
                      <v-chip v-else small> Unpaid </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" v-if="activeInvoice.payment.method">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Payment Method
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong class="text-body-1">{{
                        activeInvoice.payment.method
                          .replace("_", " ")
                          .toUpperCase()
                      }}</strong>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
                <v-row justify="space-between">
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Description</strong
                    >
                  </v-col>
                  <v-col cols="6" class="text-right">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Amount</strong
                    >
                  </v-col>
                </v-row>
                <v-row
                  justify="space-between"
                  class="off-white rounded-row mb-2"
                >
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >{{ activeInvoice.description }}</strong
                    >
                  </v-col>
                  <v-col
                    cols="6"
                    class="text-right font-weight-bold basic-text--text"
                  >
                    {{ activeInvoice.totals.subtotal | currency("$") }}
                  </v-col>
                </v-row>
                <v-row justify="space-between" class="off-white rounded-row">
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Subtotal</strong
                    >
                  </v-col>
                  <v-col cols="6" class="text-right">
                    {{ activeInvoice.totals.subtotal | currency("$") }}
                  </v-col>
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >{{
                        translateDiscount(activeInvoice.discount.source)
                      }}</strong
                    >
                  </v-col>
                  <v-col cols="6" class="text-right">
                    {{ (activeInvoice.totals.discount * -1) | currency("$") }}
                  </v-col>
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Grand Total</strong
                    >
                  </v-col>
                  <v-col
                    cols="6"
                    class="text-right font-weight-bold basic-text--text"
                  >
                    {{ activeInvoice.totals.total | currency("$") }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              v-if="!activeInvoice.payment.paid"
              justify="space-between"
              class="mt-5"
            >
              <v-col cols="12">
                <v-radio-group v-model="payment" column>
                  <v-radio
                    label="Pay using crypto currency (USDT)"
                    value="crypto"
                  />
                  <v-radio
                    value="credit_balance"
                    :disabled="balance < activeInvoice.totals.total"
                  >
                    <template v-slot:label>
                      <div>
                        Pay using credit balance
                        <strong class="success--text">{{
                          balance | currency("$")
                        }}</strong>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
                <div v-if="payment == 'crypto'">
                  To make payment to this invoice, please transfer
                  {{ activeInvoice.totals.total | currency("$") }} of USDT to
                  your virtual account with the following details:
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
                          <v-tooltip v-model="copied" top>
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
                            <span>{{ copied ? "Copy" : "Copied" }}</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  <v-btn
                    depressed
                    color="success"
                    :loading="isLoading"
                    @click="payInvoice"
                  >
                    Pay Now
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row v-else justify="space-between" class="mt-5">
              <v-col cols="6" class="d-flex align-center font-weight-bold">
                <v-list-item-avatar size="25" color="success" class="mr-2">
                  <v-icon color="white" small> mdi-check </v-icon>
                </v-list-item-avatar>
                Thank you for your payment
              </v-col>
              <v-col cols="6"> </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </BaseModal>
    <v-dialog> </v-dialog>
  </v-card>
  <v-card v-else elevation="8" class="pa-3">
    <v-row>
      <v-col cols="12">
        <v-list flat color="rgba(0,0,0,0)" two-line>
          <v-list-item>
            <!-- <v-list-item-avatar> -->
            <v-icon size="30" class="primary--text mr-3">
              $vuetify.icons.SubscriptionIcon
            </v-icon>
            <!-- </v-list-item-avatar> -->
            <v-list-item-content>
              <v-list-item-title class="text-h5 font-weight-bold"
                >My Invoices</v-list-item-title
              >
              <v-list-item-subtitle class="text-body-2">
                Payment history
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12">
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
          <template v-slot:body="{ items }">
            <v-row v-for="(item, i) in items" :key="`${i}-item`" class="mb-5">
              <v-col cols="12">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-2">
                      Invoice ID
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.invoice_id }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
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
              <v-col cols="12">
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
              <v-col cols="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-2">
                      Amount
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.totals.total | toCurrency }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item>
                  <v-list-item-content>
                    <!-- <v-list-item-title class="text-body-2">
                      Status
                    </v-list-item-title> -->
                    <v-list-item-subtitle>
                      <v-list-item-avatar
                        v-if="item.payment.paid"
                        size="25"
                        color="success"
                      >
                        <v-icon color="white" small> mdi-check </v-icon>
                      </v-list-item-avatar>
                      <v-chip v-else small> Unpaid </v-chip>
                      <v-btn
                        icon
                        color="primary"
                        depressed
                        @click="getInvoice(item._id)"
                      >
                        <v-icon>mdi-eye</v-icon>
                      </v-btn>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </template>

          <template v-slot:header.invoice_id="{ header }">
            <strong class="basic-text--text text-body-1 font-weight-bold">{{
              header.text
            }}</strong>
          </template>
          <template v-slot:header.date="{ header }">
            <strong class="basic-text--text text-body-1 font-weight-bold">{{
              header.text
            }}</strong>
          </template>
          <template v-slot:header.description="{ header }">
            <strong class="basic-text--text text-body-1 font-weight-bold">{{
              header.text
            }}</strong>
          </template>
          <template v-slot:header.totals.total="{ header }">
            <strong class="basic-text--text text-body-1 font-weight-bold">{{
              header.text
            }}</strong>
          </template>
          <template v-slot:header.payment.paid="{ header }">
            <strong class="basic-text--text text-body-1 font-weight-bold">{{
              header.text
            }}</strong>
          </template>
          <template v-slot:header.active="{ header }">
            <strong class="basic-text--text text-body-1 font-weight-bold">{{
              header.text
            }}</strong>
          </template>

          <template #item.type="{ item }">
            <v-chip small label>
              {{ item.type.toUpperCase() }}
            </v-chip>
          </template>

          <template #item.date="{ item }">
            <div class="text-subtitle-2 font-weight-bold">
              {{ item.date }}
            </div>
          </template>

          <template #item.description="{ item }">
            <div class="text-subtitle-2 font-weight-bold">
              {{ item.description }}
            </div>
          </template>

          <template #item.totals.total="{ item }">
            <div class="text-subtitle-2 font-weight-bold">
              {{ item.totals.total | currency("$") }}
            </div>
          </template>

          <template #item.invoice_id="{ item }">
            <span class="text-subtitle-2 font-weight-bold">{{
              item.invoice_id
            }}</span>
          </template>

          <template #item.payment.paid="{ item }">
            <!-- <v-chip v-if="item.payment.paid" small color="success">
          Paid at {{ $moment(item.payment.date).format("DD MMM YYYY HH:mm") }}
        </v-chip> -->
          </template>
          <template #item.active="{ item }">
            <v-btn icon color="primary" depressed @click="getInvoice(item._id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <BaseModal
      :parentModel="invoiceDialog"
      :maxWidth="'600'"
      @close="invoiceDialog = false"
    >
      <template>
        <v-card flat rounded v-if="activeInvoice" style="overflow-x: hidden">
          <v-card-title
            class="text-h6 font-weight-bold primary basic--text mb-5"
          >
            <v-row>
              <v-col cols="6">
                <v-img
                  :src="'/bitzenius-logo-white.png'"
                  height="24"
                  contain
                  position="left center"
                />
              </v-col>
              <v-col cols="4" class="d-flex justify-end">
                <v-btn color="basic" icon @click="closeInvoiceDialog">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row class="pa-5">
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Invoice ID
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong class="text-body-1">
                        {{ activeInvoice.invoice_id }}
                      </strong>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Date
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong class="text-body-1">
                        {{
                          $moment(activeInvoice.created_at).format(
                            "DD MMM YYYY HH:mm"
                          )
                        }}</strong
                      >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Status
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip
                        v-if="activeInvoice.payment.paid"
                        small
                        color="success"
                      >
                        Paid at
                        {{
                          $moment(activeInvoice.payment.date).format(
                            "DD MMM YYYY HH:mm"
                          )
                        }}
                      </v-chip>
                      <v-chip v-else small> Unpaid </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="6" v-if="activeInvoice.payment.method">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-body-2 font-weight-bold basic-text--text"
                    >
                      Payment Method
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <strong class="text-body-1">{{
                        activeInvoice.payment.method
                          .replace("_", " ")
                          .toUpperCase()
                      }}</strong>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12">
                <v-row justify="space-between">
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Description</strong
                    >
                  </v-col>
                  <v-col cols="6" class="text-right">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Amount</strong
                    >
                  </v-col>
                </v-row>
                <v-row
                  justify="space-between"
                  class="off-white rounded-row mb-2"
                >
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >{{ activeInvoice.description }}</strong
                    >
                  </v-col>
                  <v-col
                    cols="6"
                    class="text-right font-weight-bold basic-text--text"
                  >
                    {{ activeInvoice.totals.subtotal | currency("$") }}
                  </v-col>
                </v-row>
                <v-row justify="space-between" class="off-white rounded-row">
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Subtotal</strong
                    >
                  </v-col>
                  <v-col cols="6" class="text-right">
                    {{ activeInvoice.totals.subtotal | currency("$") }}
                  </v-col>
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >{{
                        translateDiscount(activeInvoice.discount.source)
                      }}</strong
                    >
                  </v-col>
                  <v-col cols="6" class="text-right">
                    {{ (activeInvoice.totals.discount * -1) | currency("$") }}
                  </v-col>
                  <v-col cols="6">
                    <strong
                      class="text-body-1 font-weight-bold basic-text--text"
                      >Grand Total</strong
                    >
                  </v-col>
                  <v-col
                    cols="6"
                    class="text-right font-weight-bold basic-text--text"
                  >
                    {{ activeInvoice.totals.total | currency("$") }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              v-if="!activeInvoice.payment.paid"
              justify="space-between"
              class="mt-5"
            >
              <v-col cols="12">
                <v-radio-group v-model="payment" column>
                  <v-radio
                    label="Pay using crypto currency (USDT)"
                    value="crypto"
                  />
                  <v-radio
                    value="credit_balance"
                    :disabled="balance < activeInvoice.totals.total"
                  >
                    <template v-slot:label>
                      <div>
                        Pay using credit balance
                        <strong class="success--text">{{
                          balance | currency("$")
                        }}</strong>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
                <div v-if="payment == 'crypto'">
                  To make payment to this invoice, please transfer
                  {{ activeInvoice.totals.total | currency("$") }} of USDT to
                  your virtual account with the following details:
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
                          <v-tooltip v-model="copied" top>
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
                            <span>{{ copied ? "Copy" : "Copied" }}</span>
                          </v-tooltip>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  <v-btn
                    depressed
                    color="success"
                    :loading="isLoading"
                    @click="payInvoice"
                  >
                    Pay Now
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row v-else justify="space-between" class="mt-5">
              <v-col cols="6" class="d-flex align-center font-weight-bold">
                <v-list-item-avatar size="25" color="success" class="mr-2">
                  <v-icon color="white" small> mdi-check </v-icon>
                </v-list-item-avatar>
                Thank you for your payment
              </v-col>
              <v-col cols="6"> </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
    </BaseModal>
    <v-dialog> </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    invoice_id: {
      type: String,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      isLoading: false,
      headers: [
        {
          text: "Invoice ID",
          align: "left",
          value: "invoice_id",
        },
        {
          text: "Date",
          align: "left",
          value: "date",
        },
        {
          text: "Description",
          align: "left",
          value: "description",
        },
        {
          text: "Amount",
          align: "right",
          value: "totals.total",
        },
        {
          text: "Status",
          align: "left",
          value: "payment.paid",
        },
        {
          text: "",
          align: "left",
          value: "active",
        },
      ],
      options: {},
      totalItems: 0,
      rowsPerPage: 10,
      invoices: [],
      invoiceDialog: false,
      activeInvoice: null,
      copied: false,
      payment: "crypto",
      balance: 0,
    };
  },
  computed: {
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
    invoice_id: {
      handler(val) {
        this.getInvoice(val);
      },
    },
  },
  mounted() {
    this.countBalance();
    this.initialize();
  },
  methods: {
    initialize() {
      this.isLoading = true;
      const { page, itemsPerPage } = this.options;
      this.rowsPerPage = itemsPerPage;

      this.$api
        .$get("/user/subscription/invoices", {
          params: {
            limit: itemsPerPage,
            page,
          },
        })
        .then((res) => {
          this.totalItems = res.result.total;
          const invoices = [];

          res.result.data.forEach((result) => {
            invoices.push({
              ...result,
              date: this.$moment(result.created_at).format("DD MMM YYYY HH:mm"),
            });
          });

          this.invoices = invoices;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getInvoice(id) {
      this.isLoading = true;
      this.$api
        .$get("/user/subscription/invoices/" + id)
        .then((res) => {
          this.activeInvoice = res.result;
          this.showInvoiceDialog();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    countBalance() {
      this.isLoading = true;
      this.$api
        .$get("/user/balance/total")
        .then((res) => {
          this.balance = res.result;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    payInvoice() {
      this.isLoading = true;
      this.$api
        .$post("/user/subscription/invoices/" + this.activeInvoice._id + "/pay")
        .then((res) => {
          this.closeInvoiceDialog();
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: res.message,
            color: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    closeInvoiceDialog() {
      this.invoiceDialog = false;
      this.initialize();
    },
    showInvoiceDialog() {
      this.invoiceDialog = true;
    },
    onCopy: function (e) {
      this.copied = !this.copied;
    },
    onError: function (e) {
      alert("Failed to copy: " + e.text);
    },
    translateDiscount(source) {
      const sources = {
        "promo-code": "Promo Code Discount",
        trial: "Trial Discount",
        referral: "Referral Discount",
      };

      if (typeof sources[source] == "undefined") {
        return "Discount";
      }

      return sources[source];
    },
  },
};
</script>

<style>
table.invoice {
  width: 100%;
  margin: 25px 0;
}

table.invoice,
table.invoice th,
table.invoice td {
  border: 1px solid rgb(190, 190, 190);
  border-collapse: collapse;
}

table.invoice th {
  font-weight: bold;
}

table.invoice th,
table.invoice td {
  padding: 6px 15px;
}

.rounded-row {
  border-radius: 10px;
}
</style>
