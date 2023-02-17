<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold primary basic--text mb-5">
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="basic" icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="pa-5">
        <v-col cols="6" class="d-flex align-center justify-center">
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
        <v-col cols="6" class="d-flex flex-column justify-start align-start">
          <h4 class="primary--text text-h5 font-weight-bold mb-3">
            START YOUR FREE TRIAL
          </h4>
          <p class="font-weight-bold basic-text--text text-body-1">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </p>
          <v-list>
            <v-list-item v-for="(step, i) in steps" :key="`step-${i}`">
              <v-list-item-avatar size="20" color="success">
                <v-icon color="white" small> mdi-check </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ step }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn rounded block color="primary" :ripple="false"
        >Start my free trial now</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/Subs me Bot.json";

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