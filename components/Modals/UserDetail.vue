<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold mb-5">
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
      <v-row>
        <v-col cols="12">
          <MenuProfile :userData="user"></MenuProfile>
        </v-col>
        <v-col cols="12">
          <CardTask :taskData="taskData"></CardTask>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <!-- <v-btn rounded block color="primary" @click="mainEvent" :ripple="false"
        >Start my free trial now</v-btn
      > -->
    </v-card-actions>
  </v-card>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/Subs me Bot.json";

export default {
  props: {
    taskData: {
      type: Array,
      default: () => {
        return [];
      },
    },
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
  computed: {
    user() {
      return this.$store.state.authUser;
    },
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