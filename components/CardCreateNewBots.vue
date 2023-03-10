<template>
  <v-card v-if="checkMobile() == false" class="px-5 custom-card" flat>
    <v-row
      class="pa-3"
      style="height: 100%; margin: auto !important"
      align="end"
    >
      <v-col cols="4" style="position: relative; height: 100%">
        <img
          contain
          class="create-bot-image"
          :src="require('~/assets/images/bot-operation.png')"
        />
      </v-col>
      <v-col
        cols="8"
        class="d-flex flex-column justify-space-between align-start"
        style="height: 100%"
      >
        <div class="d-flex flex-column">
          <span class="text-h5 font-weight-bold">
            Unleash the Power of Automated Trading
          </span>
          <span
            class="text-body-1 my-3"
            v-if="profileCompletionProgress == 100"
          >
            Revolutionize Your Trading Game No Hassle, All Hustle!
          </span>
          <span class="text-body-1 my-3" v-else>
            Follow our guide to start your very first automated trading bot.
          </span>
        </div>
        <v-btn
          large
          rounded
          dense
          color="primary"
          class="float-right"
          @click="
            checkCompletion(() => {
              $router.push('/bots');
            })
          "
        >
          {{
            profileCompletionProgress == 100
              ? "Create bot"
              : "Create your first bot"
          }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- ORNAMENTS -->
    <!-- <div class="ornament-1"></div> -->
    <!-- ORNAMENTS END -->
  </v-card>
  <v-card v-else flat>
    <v-row
      class="pa-3"
      style="height: 100%; margin: auto !important"
      align="end"
    >
      <v-col cols="12" style="position: relative; height: 100%">
        <img
          contain
          class="create-bot-image-mobile"
          :src="require('~/assets/images/bot-operation.png')"
        />
      </v-col>
      <v-col
        cols="12"
        class="d-flex flex-column justify-space-between align-start"
        style="height: 100%"
      >
        <div class="d-flex flex-column">
          <span class="text-h5 font-weight-bold">
            Unleash the Power of Automated Trading
          </span>
          <span
            class="text-body-1 my-3"
            v-if="profileCompletionProgress == 100"
          >
            Revolutionize Your Trading Game No Hassle, All Hustle!
          </span>
          <span class="text-body-1 my-3" v-else>
            Follow our guide to start your very first automated trading bot.
          </span>
        </div>
        <v-btn
          large
          rounded
          dense
          color="primary"
          class="float-right"
          @click="
            checkCompletion(() => {
              $router.push('/bots');
            })
          "
        >
          {{
            profileCompletionProgress == 100
              ? "Create bot"
              : "Create your first bot"
          }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {},
  computed: {
    profileCompletion() {
      return this.$store.state.profileCompletion;
    },

    profileCompletionProgress() {
      return (
        (this.profileCompletion.step / this.profileCompletion.stepTotal) * 100
      );
    },
  },
};
</script>

<style scoped>
.custom-card {
  position: relative;
  border: thin solid var(--primary);
  /* animation: animation1 3s infinite; */
  height: 100%;
}

.create-bot-image {
  position: absolute;
  top: 10%;
  left: 3%;
  transform: translate(-10%, -25%) scale(1.2);
  width: 100%;
  max-width: 300px;
}

.create-bot-image-mobile {
  position: absolute;
  top: 0;
  right: 0%;
  transform: translate(10%, -20%);
  width: 35%;
}

.ornament-1 {
  position: absolute;
  width: 50%;
  height: 4px;
  border-radius: 8px;
  background: var(--primary);

  left: 50%;
  top: 100%;
  transform: translate(-25%, -50%);
}

/* @keyframes animation1 {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
    background: red;
  }
} */
</style>
