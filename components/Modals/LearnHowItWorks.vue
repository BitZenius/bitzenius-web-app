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
        <v-col cols="12" class="content d-flex flex-column align-center justify-center">
          <lottie
            :width="256"
            :height="256"
            :options="lottieOptions"
            v-on:animCreated="handleAnimation"
            v-if="!isLoaded"
          />
          <h3 v-if="!isLoaded">Image is loading!</h3>
          <v-img
              :src="'/animation/animation-bots.gif'"
              @load="onGifLoaded"
          />
          <div class="mt-5">
            <p style="text-align:justify;">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas est iusto facilis vel nisi, doloremque perferendis ad quasi repellat tempore recusandae quod aperiam, laboriosam quis nostrum veniam laudantium necessitatibus eius?
            </p>
            <ul>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
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
        this.isLoaded = true;
    }
  },
};
</script>

<style>
  .content{
    height:400px;
    overflow-y: scroll;
  }
</style>