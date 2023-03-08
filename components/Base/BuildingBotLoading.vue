<template>
  <div class="building-bot-container">
    <div class="building-bot-lottie-container">
      <template>
        <!-- width and height are optional -->
        <lottie
          :width="checkMobile() == false ? 120 : 60"
          :height="checkMobile() == false ? 80 : 40"
          :options="lottieOptions"
          v-on:animCreated="handleAnimation"
        />
      </template>
    </div>
    <h5 class="text-center mb-5 text-body-1">
      {{ label }}
    </h5>
  </div>
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

<style scoped>
</style>