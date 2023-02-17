<template>
  <v-card class="pa-2 custom-card" flat>
    <v-list-item two-line>
      <v-list-item-avatar size="40" color="off-white-2">
        <v-img
          max-width="25px"
          max-height="25px"
          :src="require('~/assets/images/box-icon.svg')"
          position="center"
        ></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle
          class="basic-text--text font-weight-bold text-body-1 mb-1"
        >
          Crypto Assets
        </v-list-item-subtitle>
        <v-list-item-title
          class="text-h5 font-weight-bold basic-text--text text--lighten-2"
        >
          <v-skeleton-loader v-if="loading" loading type="heading" />
          <div v-else>
            <!-- {{balance.equivalent_usdt | currency('$', 2)}} -->
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
  props: ["balance", "loading"],
  data() {
    return {
      value: 0,
      convertFinished: false,
    };
  },
  computed: {},
  mounted() {
    if (this.balance.equivalent_usdt <= 0) {
      this.value = { first: 0, second: "0000" };
      this.convertFinished = true;
    }
  },
  methods: {
    processValue() {
      let value = {};
      if (this.balance.equivalent_usdt > 0) {
        let string = String(
          parseFloat(this.balance.equivalent_usdt).toFixed(2)
        ).split(".");
        value.first = parseFloat(string[0]);
        value.second = parseFloat(string[1]);
        this.value = value;
        this.convertFinished = true;
      } else {
        this.value = { first: 0, second: "0000" };
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
  background: var(--primary);

  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
}
</style>