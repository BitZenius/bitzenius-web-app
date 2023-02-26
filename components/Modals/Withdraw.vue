<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold basic--text">
      <v-row v-if="mode == 'ERROR'">
        <v-col cols="6"></v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="basic-text--text" icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="pa-5">
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <template v-if="mode == 'LOADING'">
            <!-- width and height are optional -->
            <lottie
              :width="128"
              :height="128"
              :options="lottieOptions"
              v-on:animCreated="handleAnimation"
            />
            <p
              class="font-weight-bold basic-text--text text-h6 text-center mt-5"
              style="width: 50%"
            >
              Processing
            </p>

            <p
              class="font-weight-bold basic-text--text text-h6 text-center mt-5"
            >
              {{ description }}
            </p>
          </template>
          <template v-else-if="mode == 'OTP'">
            <p
              class="font-weight-bold basic-text--text text-h6 text-center mt-5"
              style="width: 50%"
            >
              Input OTP
            </p>

            <p
              class="font-weight-bold basic-text--text text-h6 text-center mt-5"
            >
              {{ description }}
            </p>

            <v-otp-input
              v-model="otpCode"
              length="6"
              light
              type="number"
              @finish="mainEvent"
            />
          </template>

          <template v-else-if="mode == 'ERROR'">
            <p
              class="font-weight-bold basic-text--text text-h6 text-center mt-5"
              style="width: 50%"
            >
              Failed
            </p>

            <p
              class="font-weight-bold basic-text--text text-h6 text-center mt-5"
            >
              {{ errorMessage }}
            </p>
          </template>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/email-verifying.json";

export default {
  components: {
    lottie,
  },
  props: {
    mode: {
      type: String,
      default: () => {
        return "LOADING";
      },
    },
    description: {
      type: String,
      default: () => {
        return "Default description";
      },
    },
  },
  data() {
    return {
      otpCode: null,
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
      this.$emit("main-event", this.otpCode);
    },
  },
};
</script>

<style>
</style>