<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold basic--text">
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
      <v-row class="pa-5">
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <p
            class="font-weight-bold basic-text--text text-h6 text-center"
            style="width: 50%"
          >
            Input OTP
          </p>

          <v-otp-input
            v-model="otpCode"
            length="6"
            light
            type="number"
            @finish="mainEvent"
          />
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
  props: {},
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