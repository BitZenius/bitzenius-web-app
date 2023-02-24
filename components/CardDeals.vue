<template>
  <v-card v-if="isMobile() == false" class="pa-2 custom-card" flat>
    <v-list-item two-line>
      <v-list-item-avatar size="40" color="off-white-2">
        <v-img
          max-width="25px"
          max-height="25px"
          :src="require('~/assets/images/deal.svg')"
          position="center"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle
          class="basic-text--text font-weight-bold text-body-1 mb-1"
        >
          Today's Deals
        </v-list-item-subtitle>
        <v-list-item-title
          class="text-h5 font-weight-bold basic-text--text text--lighten-2"
        >
          <v-skeleton-loader v-if="loading" loading type="heading" />
          <div v-else>{{ deal }}</div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-tooltip top color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
          size="18"
          color="primary"
          class="absolute-tooltip"
        >
          mdi-help-circle
        </v-icon>
      </template>
      <span>All crypto assets in your exchange equivalent to USDT</span>
    </v-tooltip>

    <!-- ORNAMENTS -->
    <div class="ornament-1"></div>
    <!-- ORNAMENTS END -->
  </v-card>
  <v-card v-else class="pa-2 custom-card" flat>
    <v-row align="center">
      <v-col cols="12" class="d-flex flex-column align-left">
        <v-list-item-avatar
          size="40"
          color="#F4F7FD"
          class="ma-0"
          style="align-self: start !important"
        >
          <v-img
            max-width="25px"
            max-height="25px"
            :src="require('~/assets/images/deal.svg')"
            position="center"
          ></v-img>
        </v-list-item-avatar>
        <span class="basic-text--text font-weight-bold text-body-1 mt-3">
          Today's Deals
        </span>
        <span class="text-h6 font-weight-black basic-text--text">
          <v-skeleton-loader v-if="loading" loading type="heading" />
          <div v-else>{{ deal }}</div>
        </span>
      </v-col>
    </v-row>

    <v-tooltip top color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
          size="18"
          color="primary"
          class="absolute-tooltip"
        >
          mdi-help-circle
        </v-icon>
      </template>
      <span>All crypto assets in your exchange equivalent to USDT</span>
    </v-tooltip>

    <!-- ORNAMENTS -->
    <div class="ornament-1"></div>
    <!-- ORNAMENTS END -->
  </v-card>
</template>

<script>
export default {
  props: ["deal", "loading"],
};
</script>


<style scoped>
.custom-card {
  position: relative;
}
.absolute-tooltip {
  position: absolute;
  top: 10%;
  right: 5%;
}

.ornament-1 {
  position: absolute;
  width: 50%;
  height: 4px;
  border-radius: 8px;
  background: #fe759f;

  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
}
</style>