<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="8" class="pa-8">
        <v-row>
          <v-col
            cols="12"
            class="align-center justify-center"
          >
            <v-card v-if="mainPlan" elevation="0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <div class="py-5 d-flex flex-column align-center justify-center">
                    <h3 class="text-center mt-2 primary--text">{{ mainPlan.name }}</h3>
                    <div v-if="mainPlan.config.profit_share > 0" class="text-center mt-5">
                      <span class="text-h2 font-weight-black"><span class="text-h5">$</span>{{ mainPlan.price }}<span class="text-h6">/{{ mainPlan.cicle == 1 ? 'month' : 'year' }}</span></span><br/>
                      <span class="text-h6">+</span><br/>
                      <span class="text-h5 font-weight-bold">15%</span><br/>
                      <span class="caption">profit share</span>
                    </div>
                    <div v-else class="text-center mt-5 ">
                      <span class="text-h2 font-weight-black"><span class="text-h5">$</span>{{ mainPlan.price }}<span class="text-h5">/{{ mainPlan.cicle == 1 ? 'month' : 'year' }}</span></span>
                    </div>
                    <v-btn
                      depressed
                      color="success"
                      class="mt-5"
                      large
                      disabled
                    >
                      Subscribe Now
                    </v-btn>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                >
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
      <v-card v-show="false" elevation="8" class="pa-5 mt-10">
        <v-row class="pt-8">
          <v-col cols="12" class="d-flex justify-center">
            <div class="d-flex flex-column align-center justify-center" style="max-width:80%;">
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
                  <div class="py-8 d-flex flex-column align-center justify-center">
                    <h3 class="text-center primary--text">{{ i.name }}</h3>
                    <span class="text-center mt-2 text-h3 font-weight-black"><span class="text-h6">$</span>{{ i.price }}<span class="text-h6">/{{ monthly ? 'month' : 'year' }}</span></span>
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
                  <div class="pt-5 pb-2 d-flex flex-column align-center justify-center">
                    <v-btn
                      depressed
                      color="primary"
                      large
                      disabled
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
        class="mt-5"
      >
        <strong>All plans are includes :</strong>
        <ul>
          <li>Telegram Notifications</li>
          <li>24x7 Support</li>
        </ul>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'account',
  data () {
    return {
      title: 'Subscription',
      plans: {
        monthly: [],
        yearly: []
      },
      pricings: [],
      plan: {
        title: 'ONE PRICE FOR ALL ( PAY ANNUALLY)',
        tagLine: 'For small to medium businesses',
        price: '$13.3',
        profitSharing: '15%',
      },
      mainPlan: null,
      availableFeatures: [
        'Access To All Features',
        'Unlimited DCA Bot',
        'Unlimited Grid Bot',
        '24/7 Support',
      ],
      monthly: true
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  watch: {
    monthly (val) {
      this.switchCicleData(val)
    }
  },
  mounted () {
    this.$store.commit('setIsLoading', true)
    this.$store.commit('setTitle', this.title)
    this.$store.commit('setIsLoading', false)
    this.$store.commit('setTitle', this.title)
    this.initialize()
  },
  methods: {
    initialize () {
      this.isLoading = true
      this.$api.$get('/pricing').then((plans) => {
        this.plans.monthly = []
        this.plans.yearly = []

        plans.forEach((plan) => {
          plan.config.max_exchange = plan.config.max_exchange >= 1000 ? 'Unlimited' : plan.config.max_exchange
          plan.config.max_exchange = plan.config.max_exchange == 0 ? 'No' : plan.config.max_exchange

          plan.config.max_dca_bot = plan.config.max_dca_bot >= 1000 ? 'Unlimited Pair' : plan.config.max_dca_bot
          plan.config.max_dca_bot = plan.config.max_dca_bot == 0 ? 'No' : plan.config.max_dca_bot

          plan.config.max_grid_bot = plan.config.max_grid_bot >= 1000 ? 'Unlimited Pair' : plan.config.max_grid_bot
          plan.config.max_grid_bot = plan.config.max_grid_bot == 0 ? 'No' : plan.config.max_grid_bot

          plan.config.max_smart_trade_bot = plan.config.max_smart_trade_bot >= 1000 ? 'Unlimited Pair' : plan.config.max_smart_trade_bot
          plan.config.max_smart_trade_bot = plan.config.max_smart_trade_bot == 0 ? 'No' : plan.config.max_smart_trade_bot

          plan.config.automated_bot = plan.config.automated_bot ? 'Yes' : 'No'
          plan.config.referral = plan.config.referral ? 'Yes' : 'No'
          
          if (plan.cicle == 1 && !plan.recommended) {
            this.plans.monthly.push(plan)
          } else if (!plan.recommended) {
            this.plans.yearly.push(plan)
          } else if (plan.recommended) {
            this.mainPlan = plan
          }
        })

        this.isLoading = false
        this.switchCicleData(true)
      }).catch((err) => {
        console.log(err)
        this.isLoading = false
      }).finally(() => {
        this.isLoading = false
      })
    },
    switchCicle () {
      this.monthly = !this.monthly
    },
    switchCicleData (val) {
      if (val) {
        this.pricings = this.plans.monthly
      } else {
        this.pricings = this.plans.yearly
      }
    }
  }
}
</script>
