<template>
  <v-card elevation="8" class="pa-5">
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
    <!-- <v-row>
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
        </v-row> -->
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
            <v-card
              elevation="0"
              :class="i.recommended ? 'pa-8 border-primary' : 'pa-8'"
              outlined
            >
              <div class="py-8 d-flex flex-column align-center justify-center">
                <h3 class="text-center primary--text">
                  {{ i.name }}
                </h3>
                <span
                  :class="
                    i.recommended
                      ? 'text-center mt-2 text-h3 font-weight-black primary--text'
                      : 'text-center mt-2 text-h3 font-weight-black'
                  "
                  ><span class="text-h5">$</span
                  >{{ (i.price / 12) | currency("", 2)
                  }}<span class="text-h5">/month</span></span
                >
                <span class="text-center mt-2 text-h6 font-weight-black">
                  Pay annually at {{ i.price | toCurrency }}
                </span>
              </div>
              <v-list>
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Exchanges </v-list-item-title>
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
                    <v-list-item-title> Smart Trade </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    {{ i.config.max_smart_trade_bot }}
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> DCA Bots </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    {{ i.config.max_dca_bot }}
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Grid Bots </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    {{ i.config.max_grid_bot }}
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Profit Share </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    {{ i.config.profit_share }}%
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title> Referral Bonus </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action v-if="i.config.referral == 'Yes'">
                    {{ i.config.referral_bonus }}%
                  </v-list-item-action>
                  <v-list-item-action v-else> - </v-list-item-action>
                </v-list-item>

                <v-divider />
              </v-list>
              <div
                class="pt-5 pb-2 d-flex flex-column align-center justify-center"
              >
                <v-btn
                  v-if="subscription.id == i.id"
                  depressed
                  color="primary"
                  large
                  disabled
                >
                  Subscribed
                </v-btn>
                <v-btn
                  v-else-if="!isTrial"
                  depressed
                  :disabled="subscription.id > i.id"
                  color="primary"
                  large
                  @click="$emit('subscribeAction', i.id)"
                >
                  {{
                    subscription.id > i.id
                      ? "Downgrade"
                      : subscription.id == 0
                      ? "Upgrade"
                      : "Subscribe"
                  }}
                </v-btn>
                <v-btn
                  v-else
                  depressed
                  color="primary"
                  large
                  @click="$emit('subscribeFreeAction', i)"
                >
                  Start Free Trial
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    pricings: Array,
    isTrial: Boolean,
  },
  computed: {
    subscription() {
      return this.$store.state.subscription || { trial: null, id: 0 };
    },
  },
};
</script>

<style>
.border-primary {
  border-color: var(--primary) !important;
  border-width: 5px !important;
}
</style>