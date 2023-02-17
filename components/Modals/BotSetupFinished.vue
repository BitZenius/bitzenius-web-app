<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold basic--text">
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="black" icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="pa-5">
        <v-col cols="12" class="d-flex flex-column align-center justify-center">
          <template>
            <!-- width and height are optional -->
            <lottie
              :width="128"
              :height="128"
              :options="lottieOptions"
              v-on:animCreated="handleAnimation"
            />
          </template>

          <p
            class="font-weight-bold basic-text--text text-h6 text-center mt-5"
            style="width: 50%"
          >
            New bots for Binance has been created
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex justify-center pb-5">
      <v-btn rounded style="width: 60%" color="primary" :ripple="false"
        >Continue</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/check-mark-blue.json";

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