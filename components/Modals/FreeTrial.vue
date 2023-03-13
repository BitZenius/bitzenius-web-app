<template>
  <v-card
    flat
    rounded
    :style="checkMobile() ? 'padding-bottom: 200px !important' : ''"
  >
    <v-card-title class="text-h6 font-weight-bold primary basic--text mb-5">
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="basic-text--text" icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="">
        <v-col cols="12" class="d-flex align-center justify-center">
          <template>
            <!-- width and height are optional -->
            <lottie
              :width="200"
              :height="200"
              :options="lottieOptions"
              v-on:animCreated="handleAnimation"
            />
          </template>
        </v-col>
        <v-col cols="12" class="d-flex flex-column justify-center align-center">
          <h4 class="primary--text text-h5 font-weight-bold mb-3">
            START YOUR FREE {{ planName.toUpperCase() }} PLAN
          </h4>
        </v-col>

        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Exchanges</v-list-item-title>
              <v-list-item-subtitle>{{
                plan.config.max_exchange
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Fully Automated Bots</v-list-item-title>
              <v-list-item-subtitle>{{
                plan.config.automated_bot
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Smart Trade</v-list-item-title>
              <v-list-item-subtitle>{{
                plan.config.max_smart_trade_bot
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Hybrid Bots</v-list-item-title>
              <v-list-item-subtitle>{{
                plan.config.max_grid_bot
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>DCA Bots</v-list-item-title>
              <v-list-item-subtitle>{{
                plan.config.max_dca_bot
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Grid Bots</v-list-item-title>
              <v-list-item-subtitle>{{
                plan.config.max_grid_bot
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Profit Share</v-list-item-title>
              <v-list-item-subtitle
                >{{ plan.config.profit_share }}%</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col md="4" cols="6">
          <v-list-item three-line>
            <v-list-item-avatar size="20" color="success">
              <v-icon color="white" small> mdi-check </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Referral Rewards</v-list-item-title>
              <v-list-item-subtitle v-if="plan.config.referral == 'Yes'">
                {{ plan.config.referral_bonus }}%</v-list-item-subtitle
              >
              <v-list-item-subtitle v-else>-</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn rounded block color="primary" @click="mainEvent" :ripple="false"
        >Start my free trial now</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/Subs me Bot.json";

export default {
  props: {
    planName: String,
    planDesc: {
      type: String,
      default: () => {
        return "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.";
      },
    },
    plan: Object,
  },
  components: {
    lottie,
  },
  data() {
    return {
      steps: [
        "Unlimited Exchanges",
        "Fully Automated Bots",
        "Referral Support",
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
    mainEvent() {
      this.$emit("main-event");
    },
  },
};
</script>

<style>
</style>