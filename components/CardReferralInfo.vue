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
          :src="require('~/assets/images/bitzy to the moon.png')"
        />
      </v-col>
      <v-col
        cols="8"
        class="d-flex flex-column justify-space-between align-start"
        style="height: 100%"
      >
        <div class="d-flex flex-column">
          <span class="text-h4 font-weight-bold">Referral Discount!</span>

          <span class="text-body-1 my-3">
            We noticed that you signed up using a referral code, and the
            discount associated with it has been applied to the pricing below.
          </span>
          <strong class="text-body-1 font-weight-bold mb-3">
            Please note that it is not possible to use any additional
            promotional codes on top of this discount.
          </strong>
        </div>
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
          :src="require('~/assets/images/bitzy to the moon.png')"
        />
      </v-col>
      <v-col
        cols="12"
        class="d-flex flex-column justify-space-between align-start"
        style="height: 100%"
      >
        <div class="d-flex flex-column">
          <span class="text-h4 font-weight-bold">Referral Discount!</span>

          <span class="text-body-1 my-3">
            We noticed that you signed up using a referral code, and the
            discount associated with it has been applied to the pricing below.
          </span>
          <strong class="text-body-1 font-weight-bold mb-3">
            Please note that it is not possible to use any additional
            promotional codes on top of this discount.
          </strong>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {};
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
  transform: translate(50%, -20%);
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
