<template>
  <v-card flat rounded v-if="activeInvoice">
    <v-card-title class="text-h6 font-weight-bold primary basic--text mb-5">
      <v-row>
        <v-col cols="6">
          <v-img
            :src="'/bitzenius-logo-white.png'"
            height="24"
            contain
            position="left center"
          />
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
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
                class="text-body-2 font-weight-bold black--text"
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
                class="text-body-2 font-weight-bold black--text"
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
                class="text-body-2 font-weight-bold black--text"
              >
                Status
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip v-if="activeInvoice.payment.paid" small color="success">
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
                class="text-body-2 font-weight-bold black--text"
              >
                Payment Method
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong class="text-body-1">{{
                  activeInvoice.payment.method.replace("_", " ").toUpperCase()
                }}</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12">
          <v-row justify="space-between">
            <v-col cols="6">
              <strong class="text-body-1">Description</strong>
            </v-col>
            <v-col cols="6">
              <strong class="text-body-1 text-right">Amount</strong>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="off-white rounded-row">
            <v-col cols="6">
              <strong class="text-body-1">{{
                activeInvoice.description
              }}</strong>
            </v-col>
            <v-col cols="6">
              <strong class="text-body-1 text-right">{{
                activeInvoice.totals.subtotal | currency("$")
              }}</strong>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="off-white rounded-row">
            <v-col cols="6">
              <strong class="text-body-1">{{
                activeInvoice.description
              }}</strong>
            </v-col>
            <v-col cols="6">
              <strong class="text-body-1 text-right">{{
                activeInvoice.totals.subtotal | currency("$")
              }}</strong>
            </v-col>
          </v-row>
          <v-row justify="space-between" class="off-white rounded-row">
            <v-col cols="6">
              <strong class="text-body-1">Subtotal</strong>
            </v-col>
            <v-col cols="6">
              <span class="text-body-1 text-right">{{
                activeInvoice.totals.subtotal | currency("$")
              }}</span>
            </v-col>
            <v-col cols="6">
              <strong class="text-body-1">{{
                translateDiscount(activeInvoice.discount.source)
              }}</strong>
            </v-col>
            <v-col cols="6">
              <span class="text-body-1 text-right">{{
                (activeInvoice.totals.discount * -1) | currency("$")
              }}</span>
            </v-col>
            <v-col cols="6">
              <strong class="text-body-1">Grand Total</strong>
            </v-col>
            <v-col cols="6">
              <span class="text-body-1 text-right">{{
                activeInvoice.totals.total | currency("$")
              }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="space-between" class="mt-5">
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

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/create new bot.json";

export default {
  components: {
    lottie,
  },
  data() {
    return {
      steps: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      // LOTTIE
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    closeModal() {
      this.$emit("close-modal", false);
    },
  },
};
</script>

<style>
</style>