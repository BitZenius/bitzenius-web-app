<template>
  <v-row v-if="checkMobile() == false" class="pa-5">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-tabs hide-slider :show-arrows="true" v-model="currentItem">
        <v-tab
          :disabled="disabledTables.includes(item)"
          :ripple="false"
          v-for="item in tables"
          :key="item"
        >
          <span class="text-body-1 text-capitalize">{{ item }}</span>
        </v-tab>
      </v-tabs>
    </v-col>

    <v-col cols="12" v-if="!isLoading">
      <v-tabs-items
        v-model="currentItem"
        style="min-height: 1200px; background: unset !important"
      >
        <v-tab-item key="My Plan">
          <div class="relative-container-subs">
            <v-card
              class="card-1 overflow-y-hidden overflow-x-hidden pa-2"
              flat
              color="primary"
            >
              <v-img
                width="860"
                class="background-image"
                src="/images/signin-vector.svg"
              >
              </v-img>

              <v-row class="pa-5 py-10" align="end">
                <v-col cols="12" class="d-flex align-end justify-start">
                </v-col>
                <v-col cols="12">
                  <div>
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
                      until
                      {{ $moment(subscription.end).format("DD MMM YYYY") }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <Invoices
              class="card-2 pa-2"
              :invoice_id.sync="invoiceId"
              :promoCodeData="promoCodeData"
              :isValidatingPromoCode="isValidatingPromoCode"
              @clearPromoCode="
                (e) => {
                  clearPromoCode();
                }
              "
              @validatePromoCode="
                (promoCode, plan_id) => validatePromoCode(promoCode, plan_id)
              "
            />

            <!-- ORNAMENT -->
            <v-img
              width="90"
              class="ornament-1-subs"
              :src="require('@/assets/images/ornament-green-arrow.svg')"
            >
            </v-img>
            <v-img
              width="60"
              class="ornament-2-subs"
              :src="require('@/assets/images/ornament-thunder.svg')"
            >
            </v-img>

            <div class="lottie-container-subs">
              <template>
                <!-- width and height are optional -->
                <lottie
                  :width="256"
                  :height="256"
                  :options="lottieOptions"
                  v-on:animCreated="handleAnimation"
                />
              </template>
            </div>
            <!-- ORNAMENT ENDS -->
          </div>
        </v-tab-item>
        <v-tab-item key="Other Plans">
          <TablesPricingPlans
            :pricings="pricings"
            :isTrial="
              (subscription == null || subscription.id == 0) && !hasTrial
            "
            @subscribeAction="
              (id) => {
                openOrderDialog(id);
              }
            "
            @subscribeFreeAction="
              (plan) => {
                freePlan = plan;
                freeTrialDialog = true;
              }
            "
          ></TablesPricingPlans>
          <Invoices
            class="pa-2 mt-5"
            ref="invoices"
            :promoCodeData="promoCodeData"
            :isValidatingPromoCode="isValidatingPromoCode"
            @clearPromoCode="
              (e) => {
                clearPromoCode();
              }
            "
            @validatePromoCode="
              (promoCode, plan_id) => validatePromoCode(promoCode, plan_id)
            "
            :invoice_id.sync="invoiceId"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-col>
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
    <BaseModal
      @close="freeTrialDialog = false"
      :parentModel="freeTrialDialog"
      :maxWidth="'750'"
    >
      <ModalsFreeTrial
        @main-event="purchaseSubscription(freePlan.id)"
        @close-modal="freeTrialDialog = false"
        :planName="freePlan.name"
      ></ModalsFreeTrial>
    </BaseModal>
    <BaseModal
      @close="successDialog = false"
      :parentModel="successDialog"
      :maxWidth="'450'"
    >
      <ModalsSuccess
        @main-event="successDialog = false"
        @close-modal="successDialog = false"
      ></ModalsSuccess>
    </BaseModal>
  </v-row>
  <v-row v-else class="pa-1 ma-0">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          <v-icon @click="$router.push('/account')">mdi-arrow-left</v-icon>
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-tabs
        :disabled="disabledTables.includes(item)"
        hide-slider
        :show-arrows="true"
        v-model="currentItem"
      >
        <v-tab :ripple="false" v-for="item in tables" :key="item">
          <span class="text-body-1 text-capitalize">{{ item }}</span>
        </v-tab>
      </v-tabs>
    </v-col>
    <v-col cols="12" v-if="!isLoading">
      <v-tabs-items
        :touchless="true"
        v-model="currentItem"
        style="min-height: 1200px; background: unset !important"
      >
        <v-tab-item key="My Plan">
          <v-row>
            <v-col cols="12">
              <v-card flat color="primary">
                <v-row align="center">
                  <v-col cols="6" class="d-flex align-end justify-start">
                    <template>
                      <!-- width and height are optional -->
                      <lottie
                        :width="256"
                        :height="256"
                        :options="lottieOptions"
                        v-on:animCreated="handleAnimation"
                      />
                    </template>
                  </v-col>
                  <v-col cols="6">
                    <div>
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
                        until
                        {{ $moment(subscription.end).format("DD MMM YYYY") }}
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12">
              <Invoices
                class="pa-2"
                :invoice_id.sync="invoiceId"
                :promoCodeData="promoCodeData"
                :isValidatingPromoCode="isValidatingPromoCode"
                @clearPromoCode="
                  (e) => {
                    clearPromoCode();
                  }
                "
                @validatePromoCode="
                  (promoCode, plan_id) => validatePromoCode(promoCode, plan_id)
                "
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item key="Other Plans">
          <TablesPricingPlans
            :pricings="pricings"
            :isTrial="
              (subscription == null || subscription.id == 0) && !hasTrial
            "
            @subscribeAction="
              (id) => {
                openOrderDialog(id);
              }
            "
            @subscribeFreeAction="
              (plan) => {
                freePlan = plan;
                freeTrialDialog = true;
              }
            "
          ></TablesPricingPlans>
          <Invoices
            class="pa-2 mt-5"
            ref="invoices"
            :promoCodeData="promoCodeData"
            :isValidatingPromoCode="isValidatingPromoCode"
            @clearPromoCode="
              (e) => {
                clearPromoCode();
              }
            "
            @validatePromoCode="
              (promoCode, plan_id) => validatePromoCode(promoCode, plan_id)
            "
            :invoice_id.sync="invoiceId"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-col>

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
    <BaseModalMobile
      @close="freeTrialDialog = false"
      :parentModel="freeTrialDialog"
      :maxWidth="'650'"
    >
      <ModalsFreeTrial
        @main-event="purchaseSubscription(freePlan.id)"
        @close-modal="freeTrialDialog = false"
      ></ModalsFreeTrial>
    </BaseModalMobile>
    <BaseModalMobile
      @close="successDialog = false"
      :parentModel="successDialog"
      :maxWidth="'450'"
    >
      <ModalsSuccess
        @main-event="successDialog = false"
        @close-modal="successDialog = false"
      ></ModalsSuccess>
    </BaseModalMobile>
  </v-row>
</template>



<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/Subs me Bot.json";

export default {
  layout: "account",
  components: {
    lottie,
  },
  data() {
    return {
      currentItem: "My Plan",
      tables: ["My Plan", "Other Plans"],
      disabledTables: ["My Plan", "Other Plans"],
      title: "Subscription",
      isLoading: false,
      plans: {
        monthly: [],
        yearly: [],
      },
      pricings: [],
      mainPlan: null,
      freePlan: {
        id: "1",
        name: "DEFAULT",
      },
      selectedPlan: null,
      monthly: false,
      invoiceId: null,
      orderDialog: false,
      promoCode: "",
      promoCodeData: null,
      isValidatingPromoCode: false,

      // LOTTIE
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },

      freeTrialDialog: false,
      successDialog: false,
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
      return this.$store.state.subscription || { trial: null, id: 0 };
    },
    hasTrial() {
      return this.$store.state.hasTrial;
    },
  },
  watch: {
    monthly(val) {
      this.switchCicleData(val);
    },
    isLoading(val) {
      this.$store.commit("setIsLoading", val);
    },
  },
  async mounted() {
    await this._fetchUserSubscription();
    this.$store.commit("setTitle", this.title);
    this.initialize();

    // Determine tabs
    if (this.hasTrial) {
      this.disabledTables = [];
      this.currentItem = 0;
    } else {
      this.disabledTables = ["My Plan"];

      this.currentItem = 1;
    }
  },
  methods: {
    async refetch() {
      await this._fetchUserSubscription();

      this.initialize();

      // Determine tabs
      if (this.hasTrial) {
        this.disabledTables = [];
        this.currentItem = 0;
      } else {
        this.disabledTables = ["My Plan"];

        this.currentItem = 1;
      }
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    // FETCHING API
    async _fetchUserSubscription() {
      this.isLoading = true;
      console.log(this.user);
      try {
        let res = await this.$api.$get("/user/subscription/user-trial", {
          params: {
            uid: this.user.uid,
            // uid:'xxx'
          },
        });
        this.$store.commit("setHasTrial", res);
        if (res) {
          console.log(res);
          // this.$store.commit("setShowSnackbar", {
          //   show: true,
          //   message: "User has subscription, check console",
          //   color: "success",
          // });
        }
      } catch (error) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "User doesn't have subscription",
          color: "danger",
        });
      }
    },
    // END OF FETCHING API
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

            plan.config.referral_bonus = plan.config.referral;
            plan.config.referral = plan.config.referral ? "Yes" : "No";

            console.log(plan);

            if (plan.cicle == 1) {
              this.plans.monthly.push(plan);
            } else if (plan.cicle == 12) {
              this.plans.yearly.push(plan);
            }
            if (plan.recommended) {
              this.mainPlan = plan;
            }
          });

          this.isLoading = false;
          this.switchCicleData(false);
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
      this.freeTrialDialog = false;
      this.isLoading = true;
      this.$api
        .$post("/user/subscription/purchase", {
          plan_id: planId,
          promo_code: this.promoCode,
        })
        .then((data) => {
          this.invoiceId = data.result._id;
          this.successDialog = true;
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
          this.refetch();
          this.isLoading = false;
        });
    },
    openOrderDialog(planId) {
      this.openOrderDialogProcess(planId);

      this.orderDialog = true;
    },
    openOrderDialogProcess(planId) {
      this.selectedPlan = this.pricings.find((obj) => obj.id == planId);

      if (!this.selectedPlan) {
        this.selectedPlan = this.mainPlan;
      }

      this.selectedPlan.discount = 0;
      this.selectedPlan.total = this.selectedPlan.price;
    },
    closeOrderDialog() {
      this.orderDialog = false;
      this.selectedPlan = null;
      this.promoCode = "";
      this.promoCodeData = null;
    },
    validatePromoCode(promoCode = "", planId = null) {
      //  Populate props
      if (promoCode != "") {
        this.promoCode = promoCode;
      }

      if (planId) {
        this.openOrderDialogProcess(planId);
      }

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

          this.$refs.invoices.invokeDiscount("promo", result.discount);
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

.relative-container-subs {
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

.relative-container-subs > .ornament-1-subs {
  position: absolute;
  top: 0%;
  left: 25%;
}

.relative-container-subs > .ornament-2-subs {
  position: absolute;
  top: 82%;
  left: 20%;
}
.lottie-container-subs {
  position: absolute;
  top: -5%;
  left: 0%;
}
</style>
