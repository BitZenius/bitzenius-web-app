<template>
  <v-card v-if="checkMobile() == false" class="pa-2 custom-card" flat>
    <v-list-item two-line>
      <v-list-item-avatar size="40" color="#F4F7FD">
        <v-img
          max-width="25px"
          max-height="25px"
          src="/token_logo/USDT.png"
          contain
          position="center"
        ></v-img>
        <!-- <v-icon large dark> mdi-currency-usd </v-icon> -->
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle
          class="white--text font-weight-bold text-body-1 mb-1"
        >
          USDT Balance
        </v-list-item-subtitle>
        <v-list-item-title
          class="text-h5 font-weight-bold white--text text--lighten-2"
        >
          <v-skeleton-loader v-if="loading" loading type="heading" />
          <div v-else>
            <!-- {{ balance.free_usdt | currency('$', 4) }} -->
            <span v-if="convertFinished"
              >${{ value.first }}.{{ value.second }}</span
            >
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-tooltip top color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
          size="18"
          color="white"
          class="absolute-tooltip"
        >
          mdi-help-circle
        </v-icon>
      </template>
      <span>USDT asset in your exchange</span>
    </v-tooltip>
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
            src="/token_logo/USDT.png"
            position="center"
          ></v-img>
        </v-list-item-avatar>
        <span class="white--text font-weight-bold text-body-1 mt-3">
          USDT Balance
        </span>
        <span class="text-h6 font-weight-black white--text text--lighten-2">
          <v-skeleton-loader v-if="loading" loading type="heading" />
          <div v-else>
            <!-- {{ balance.free_usdt | currency('$', 4) }} -->
            <span v-if="convertFinished"
              >${{ value.first }}.{{ value.second }}</span
            >
          </div>
        </span>
      </v-col>
    </v-row>

    <v-tooltip top color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
          size="18"
          color="white"
          class="absolute-tooltip"
        >
          mdi-help-circle
        </v-icon>
      </template>
      <span>USDT asset in your exchange</span>
    </v-tooltip>
  </v-card>
</template>

<script>
export default {
  props: ["balance", "loading"],
  data() {
    return {
      value: 0,
      convertFinished: false,
    };
  },
  mounted() {
    if (this.balance.free_usdt <= 0) {
      this.value = { first: 0, second: "0000" };
      this.convertFinished = true;
    }
  },
  methods: {
    processValue() {
      let value = {};
      if (this.balance.free_usdt > 0) {
        let string = String(
          parseFloat(this.balance.free_usdt).toFixed(2)
        ).split(".");
        value.first = parseFloat(string[0]);
        value.second = string[1];
        this.value = value;
        this.convertFinished = true;
      } else {
        this.value = { first: 0, second: 0 };
        this.convertFinished = true;
      }
    },
  },
  watch: {
    balance(ov, nv) {
      this.processValue();
    },
  },
};
</script>

<style scoped>
.custom-card {
  position: relative;
  background-color: var(--primary);
  background-image: url("/images/signin-vector.svg");
  background-size: contain;
  background-position: 120% 20px;
}

.absolute-tooltip {
  position: absolute;
  top: 10%;
  right: 5%;
}
</style>
