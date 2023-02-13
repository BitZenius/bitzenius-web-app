<template>
  <v-row class="pa-5">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h6 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <div class="relative-container">
        <v-card class="card-1 pa-2" flat color="primary">
          <v-img
            width="860"
            class="background-image"
            src="/images/signin-vector.svg"
          >
          </v-img>

          <v-row class="pa-5 pb-10" align="end">
            <v-col cols="12">
              <div v-if="subscription == null || subscription.id == 0">
                <v-card elevation="8" class="pa-8">
                  <v-row>
                    <v-col cols="12" class="align-center justify-center">
                      <v-card v-if="mainPlan" elevation="0">
                        <v-row>
                          <v-col cols="12" md="4">
                            <div
                              class="
                                py-5
                                d-flex
                                flex-column
                                align-center
                                justify-center
                              "
                            >
                              <h3 class="text-center mt-2 primary--text">
                                {{ mainPlan.name }}
                              </h3>
                              <div
                                v-if="mainPlan.config.profit_share > 0"
                                class="text-center mt-5"
                              >
                                <span class="text-h2 font-weight-black"
                                  ><span class="text-h5">$</span
                                  >{{ mainPlan.price
                                  }}<span class="text-h6"
                                    >/{{
                                      mainPlan.cicle == 1 ? "month" : "year"
                                    }}</span
                                  ></span
                                ><br />
                                <span class="text-h6">+</span><br />
                                <span class="text-h6 font-weight-bold">15%</span
                                ><br />
                                <span class="caption">profit share</span>
                              </div>
                              <div v-else class="text-center mt-5">
                                <span class="text-h2 font-weight-black"
                                  ><span class="text-h5">$</span
                                  >{{ mainPlan.price
                                  }}<span class="text-h5"
                                    >/{{
                                      mainPlan.cicle == 1 ? "month" : "year"
                                    }}</span
                                  ></span
                                >
                              </div>
                              <v-btn
                                depressed
                                color="success"
                                class="mt-5"
                                large
                                @click="openOrderDialog(mainPlan.id)"
                              >
                                Subscribe Now
                              </v-btn>
                            </div>
                          </v-col>
                          <v-col cols="12" md="8">
                            <v-list>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Exchanges
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ mainPlan.config.max_exchange }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Fully Automated Bots
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ mainPlan.config.automated_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Smart Trade
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ mainPlan.config.max_smart_trade_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    DCA Bots
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ mainPlan.config.max_dca_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Grid Bots
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ mainPlan.config.max_grid_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Referral Support
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ mainPlan.config.referral }}
                                </v-list-item-action>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
                <!-- Temporary to disable montly plans -->
                <v-card elevation="8" class="pa-5 mt-10">
                  <v-row class="pt-8">
                    <v-col cols="12" class="d-flex justify-center">
                      <div
                        class="d-flex flex-column align-center justify-center"
                        style="max-width: 80%"
                      >
                        <h2>Need more plans?</h2>
                        <p class="text-center mt-2">
                          Take a look of standard plans and select your choice
                        </p>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                      <div class="mb-5">
                        <v-btn
                          depressed
                          class="mr-1"
                          large
                          :color="monthly ? 'primary' : ''"
                          rounded
                          @click="switchCicle"
                        >
                          Monthly
                        </v-btn>
                        <v-btn
                          depressed
                          large
                          :color="monthly ? '' : 'primary'"
                          rounded
                          @click="switchCicle"
                        >
                          Yearly
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-row>
                        <v-col
                          v-for="i in pricings"
                          :key="i.id"
                          cols="12"
                          md="4"
                          class="align-center justify-center"
                        >
                          <v-card elevation="0" class="pa-8" outlined>
                            <div
                              class="
                                py-8
                                d-flex
                                flex-column
                                align-center
                                justify-center
                              "
                            >
                              <h3 class="text-center primary--text">
                                {{ i.name }}
                              </h3>
                              <span
                                class="
                                  text-center
                                  mt-2
                                  text-h3
                                  font-weight-black
                                "
                                ><span class="text-h6">$</span>{{ i.price
                                }}<span class="text-h6"
                                  >/{{ monthly ? "month" : "year" }}</span
                                ></span
                              >
                            </div>
                            <v-list>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Exchanges
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ i.config.max_exchange }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Fully Automated Bots
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ i.config.automated_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Smart Trade
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ i.config.max_smart_trade_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    DCA Bots
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ i.config.max_dca_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Grid Bots
                                  </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                  {{ i.config.max_grid_bot }}
                                </v-list-item-action>
                              </v-list-item>
                              <v-divider />
                            </v-list>
                            <div
                              class="
                                pt-5
                                pb-2
                                d-flex
                                flex-column
                                align-center
                                justify-center
                              "
                            >
                              <v-btn
                                depressed
                                color="primary"
                                large
                                @click="openOrderDialog(i.id)"
                              >
                                Subscribe
                              </v-btn>
                            </div>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                <v-alert
                  v-show="false"
                  icon="mdi-information-outline"
                  text
                  type="info"
                  class="pa-5 mt-10"
                >
                  <strong>All plans are includes :</strong>
                  <ul>
                    <li>Telegram Notifications</li>
                    <li>24x7 Support</li>
                  </ul>
                </v-alert>
              </div>
              <div v-else>
                <span class="text-h4 font-weight-bold primary-text--text"
                  >Premium</span
                >
                <v-chip
                  v-if="subscription.trial"
                  color="customGreen"
                  class="ml-2 primary-text--text"
                  depressed
                >
                  <strong>TRIAL</strong>
                </v-chip>
                <p class="primary-text--text">
                  You're subscribed to our premium membership
                </p>
                <v-btn
                  depressed
                  :ripple="false"
                  color="customPink primary-text--text"
                  class="px-2 py-0"
                >
                  until {{ $moment(subscription.end).format("DD MMM YYYY") }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <!-- ORNAMENT -->
          <v-img
            width="90"
            class="ornament-1"
            :src="require('@/assets/images/ornament-green-arrow.svg')"
          >
          </v-img>
          <v-img
            width="60"
            class="ornament-2"
            :src="require('@/assets/images/ornament-thunder.svg')"
          >
          </v-img>
          <!-- ORNAMENT ENDS -->
        </v-card>
        <Invoices class="card-2 pa-2" :invoice_id.sync="invoiceId" />
      </div>
    </v-col>
    <v-col v-if="false" cols="12"> </v-col>
    <v-dialog
      v-model="orderDialog"
      max-width="600"
      scrollable
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <template>
        <v-card v-if="selectedPlan">
          <v-card-title>
            Subscription Order
            <v-spacer></v-spacer>
            <v-btn icon @click="closeOrderDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="mt-3">
            <table class="invoice">
              <thead>
                <tr>
                  <th class="text-left">Description</th>
                  <th class="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {{ selectedPlan.name }} ({{
                      selectedPlan.cicle == 1
                        ? "Monthly Subscription"
                        : "Yearly Subscription"
                    }})
                  </td>
                  <td class="text-right">
                    {{ selectedPlan.price | currency("$") }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th class="text-right">Subtotal</th>
                  <th class="text-right">
                    {{ selectedPlan.price | currency("$") }}
                  </th>
                </tr>
                <tr>
                  <th class="text-right">Discount</th>
                  <th class="text-right">
                    {{ selectedPlan.discount | currency("$") }}
                  </th>
                </tr>
                <tr>
                  <th class="text-right">Grand Total</th>
                  <th class="text-right">
                    {{ selectedPlan.total | currency("$") }}
                  </th>
                </tr>
              </tfoot>
            </table>
            <div class="my-5">
              <p>Have a promo code?</p>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="promoCode"
                    dense
                    clear-icon="mdi-close-circle"
                    clearable
                    type="text"
                    outlined
                    @click:clear="clearPromoCode"
                  />
                </v-col>
                <v-col cols="6">
                  <v-btn
                    class="py-5 text-capitalize"
                    :loading="isValidatingPromoCode"
                    block
                    depressed
                    @click="validatePromoCode"
                  >
                    Apply Promo
                  </v-btn>
                </v-col>
              </v-row>
              <v-alert
                v-if="promoCodeData"
                class="mt-3"
                dense
                text
                :type="promoCodeData.error ? 'error' : 'success'"
              >
                {{ promoCodeData.message }}
              </v-alert>
            </div>
            <v-btn
              depressed
              color="success"
              :loading="isLoading"
              @click="purchaseSubscription(selectedPlan.id)"
            >
              Purchase
            </v-btn>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      title: "Subscription",
      isLoading: false,
      isValidatingPromoCode: false,
      plans: {
        monthly: [],
        yearly: [],
      },
      pricings: [],
      mainPlan: null,
      selectedPlan: null,
      monthly: true,
      invoiceId: null,
      orderDialog: false,
      promoCode: "",
      promoCodeData: null,
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    },
    subscription() {
      return this.$store.state.subscription;
    },
  },
  watch: {
    monthly(val) {
      this.switchCicleData(val);
    },
  },
  mounted() {
    this.$store.commit("setTitle", this.title);
    this.initialize();
  },
  methods: {
    initialize() {
      this.isLoading = true;
      this.$api
        .$get("/pricing")
        .then((plans) => {
          this.plans.monthly = [];
          this.plans.yearly = [];

          plans.forEach((plan) => {
            plan.config.max_exchange =
              plan.config.max_exchange >= 1000
                ? "Unlimited"
                : plan.config.max_exchange;
            plan.config.max_exchange =
              plan.config.max_exchange == 0 ? "No" : plan.config.max_exchange;

            plan.config.max_dca_bot =
              plan.config.max_dca_bot >= 1000
                ? "Unlimited Pair"
                : plan.config.max_dca_bot;
            plan.config.max_dca_bot =
              plan.config.max_dca_bot == 0 ? "No" : plan.config.max_dca_bot;

            plan.config.max_grid_bot =
              plan.config.max_grid_bot >= 1000
                ? "Unlimited Pair"
                : plan.config.max_grid_bot;
            plan.config.max_grid_bot =
              plan.config.max_grid_bot == 0 ? "No" : plan.config.max_grid_bot;

            plan.config.max_smart_trade_bot =
              plan.config.max_smart_trade_bot >= 1000
                ? "Unlimited Pair"
                : plan.config.max_smart_trade_bot;
            plan.config.max_smart_trade_bot =
              plan.config.max_smart_trade_bot == 0
                ? "No"
                : plan.config.max_smart_trade_bot;

            plan.config.automated_bot = plan.config.automated_bot
              ? "Yes"
              : "No";
            plan.config.referral = plan.config.referral ? "Yes" : "No";

            if (plan.cicle == 1 && !plan.recommended) {
              this.plans.monthly.push(plan);
            } else if (!plan.recommended) {
              this.plans.yearly.push(plan);
            } else if (plan.recommended) {
              this.mainPlan = plan;
            }
          });

          this.isLoading = false;
          this.switchCicleData(true);
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    switchCicle() {
      this.monthly = !this.monthly;
    },
    switchCicleData(val) {
      if (val) {
        this.pricings = this.plans.monthly;
      } else {
        this.pricings = this.plans.yearly;
      }
    },
    purchaseSubscription(planId) {
      this.isLoading = true;
      this.$api
        .$post("/user/subscription/purchase", {
          plan_id: planId,
          promo_code: this.promoCode,
        })
        .then((data) => {
          this.invoiceId = data.result._id;
          this.closeOrderDialog();
        })
        .catch((err) => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: err.response.data.message,
            color: "#E53935",
          });
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openOrderDialog(planId) {
      this.selectedPlan = this.pricings.find((obj) => obj.id == planId);

      if (!this.selectedPlan) {
        this.selectedPlan = this.mainPlan;
      }

      this.selectedPlan.discount = 0;
      this.selectedPlan.total = this.selectedPlan.price;

      this.orderDialog = true;
    },
    closeOrderDialog() {
      this.orderDialog = false;
      this.selectedPlan = null;
      this.promoCode = "";
      this.promoCodeData = null;
    },
    validatePromoCode() {
      this.isValidatingPromoCode = true;
      this.$api
        .$post("/user/subscription/validate-promo-code", {
          plan_id: this.selectedPlan.id,
          promo_code: this.promoCode,
        })
        .then((result) => {
          this.selectedPlan.discount = result.discount;
          this.selectedPlan.total = this.selectedPlan.price + result.discount;

          this.promoCodeData = result.data;
          this.promoCodeData.message = `Yeay! ${result.data.description} has been applied to this order`;
          this.promoCodeData.error = false;
        })
        .catch((err) => {
          this.isValidatingPromoCode = false;

          this.promoCodeData = {};
          this.promoCodeData.message = err.response.data.message;
          this.promoCodeData.error = true;

          this.selectedPlan.discount = 0;
          this.selectedPlan.total = this.selectedPlan.price;
        })
        .finally(() => {
          this.isValidatingPromoCode = false;
        });
    },
    clearPromoCode() {
      this.promoCode = "";
      this.promoCodeData = null;
      this.selectedPlan.discount = 0;
      this.selectedPlan.total = this.selectedPlan.price;
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

.relative-container {
  position: relative;
  padding-top: 60px;
  width: 100%;
  height: 100%;
}

.card-1 {
  position: relative;
  width: 80%;
  height: 314px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-2 {
  position: absolute;
  left: 32%;
  top: 20%;
  width: 68%;
  height: 394px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-1 > .background-image {
  transform: rotate(40deg) scaleX(-1);
  position: absolute;
  top: -60%;
  left: 18%;
}

.card-1 > .ornament-1 {
  position: absolute;
  top: -15%;
  left: 35%;
}

.card-1 > .ornament-2 {
  position: absolute;
  top: 75%;
  left: 25%;
}
</style>
