<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold primary basic--text mb-5">
      <v-row>
        <v-col cols="6">
            Learn how it works!
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn color="basic" icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row class="pa-5">
        <v-col cols="12" class="d-flex align-center justify-center">
          <!-- <template v-if="!isLoaded">
            <div class="d-flex flex-column align-center justify-center">
                <lottie
                :width="256"
                :height="256"
                :options="lottieOptions"
                v-on:animCreated="handleAnimation"
                />
                <span>Image is loading..</span>
            </div>
          </template> -->
         <template v-show="isLoaded">
            <v-img
                :src="'/animation/animation-bots.gif'"
                @load="onGifLoaded"
            />
         </template>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <!-- <v-btn rounded block color="primary" :ripple="false"
        >Start my free trial now</v-btn
      > -->
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
    isLoaded:false,
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
    onGifLoaded(){
        alert('loaded');
        this.isLoaded = true;
    }
  },
};
</script>

<style>
</style>