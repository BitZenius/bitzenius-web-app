<template>
  <v-card v-if="checkMobile() == false" class="pa-5 custom-card" flat>
    <v-row class="pa-3">
      <v-col cols="6" style="position: relative">
        <v-img
          contain
          class="create-bot-image"
          :src="require('~/assets/images/advance features.png')"
        >
        </v-img>
      </v-col>
      <v-col cols="6" class="d-flex justify-center">
        <v-btn
          x-large
          rounded
          dense
          color="primary"
          @click="
            checkCompletion(() => {
              $router.push('/bots');
            })
          "
        >
          Create your first bot
        </v-btn>
      </v-col>
    </v-row>
    <!-- ORNAMENTS -->
    <!-- <div class="ornament-1"></div> -->
    <!-- ORNAMENTS END -->
  </v-card>
  <v-card v-else flat>
    <v-row class="pa-3">
      <v-col cols="6" style="position: relative">
        <v-img
          contain
          class="create-bot-image"
          :src="require('~/assets/images/advance features.png')"
        >
        </v-img>
      </v-col>
      <v-col cols="6" class="d-flex justify-center">
        <v-btn x-large rounded dense flat color="primary">
          Create your first bot
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
.custom-card {
  position: relative;
  border: thin solid var(--primary);
  animation: animation1 3s infinite;
}

.create-bot-image {
  position: absolute;
  top: 0%;
  left: -5%;
  transform: translate(-10%, -45%);
  width: 100%;
  height: 300%;
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
