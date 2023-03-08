<template>
  <v-row class="pa-5" justify="center" align="center">
    <v-col cols="12" class="d-flex flex-column align-center justify-center">
      <template>
        <!-- width and height are optional -->
        <lottie
          :width="350"
          :height="350"
          :options="lottieOptions"
          v-on:animCreated="handleAnimation"
        />
      </template>
      <h5 class="text-center mt-2 mb-5">
        {{ label }}
      </h5>
    </v-col>
  </v-row>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/robot-process-automation.json";

export default {
  props: {
    label: String,
  },
  components: {
    lottie,
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
};
</script>

<style>
</style>