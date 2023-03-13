<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold primary white--text mb-5">
      <v-row>
        <v-col cols="6"> Learn how it works! </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="white--text" icon @click="closeModal">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="content">
      <v-row class="pa-5">
        <v-col cols="12" v-if="defaultType == 'AUTOMATED'">
          <div
            class="d-flex justify-center align-center"
            style="margin: auto; width: 60%"
          >
            <v-img
              :src="'/animation/animation-bots.gif'"
              @load="onGifLoaded"
              style="width: 100%"
            />
            <lottie
              :width="256"
              :height="256"
              :options="lottieOptions"
              v-on:animCreated="handleAnimation"
              v-if="!isLoaded"
            />
            <h3 v-if="!isLoaded">Image is loading!</h3>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex flex-column align-center">
          <MiscHowItWorksAutomated
            v-if="defaultType == 'AUTOMATED'"
          ></MiscHowItWorksAutomated>
          <MiscHowItWorksHybrid
            v-else-if="defaultType == 'DCA_GRID'"
          ></MiscHowItWorksHybrid>
          <MiscHowItWorksDCA
            v-else-if="defaultType == 'DCA'"
          ></MiscHowItWorksDCA>
          <MiscHowItWorksGrid
            v-else-if="defaultType == 'GRID'"
          ></MiscHowItWorksGrid>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/Subs me Bot.json";

export default {
  props: {
    defaultType: {
      type: String,
      default: () => {
        return "AUTOMATED";
      },
    },
  },
  components: {
    lottie,
  },
  data() {
    return {
      isLoaded: false,
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
    onGifLoaded() {
      this.isLoaded = true;
    },
  },
};
</script>

<style>
.content {
  height: 400px;
  overflow-y: scroll;
}
</style>