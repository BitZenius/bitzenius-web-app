<template>
  <vue-trading-view :key="compKey" :options="chartOptions"></vue-trading-view>
</template>

<script>
export default {
  data() {
    return {
      compKey: 0,
    };
  },
  props: {
    defaultOptions: {
      type: Object,
      default: () => {
        return {
          allow_symbol_change: false,
          interval: 240,
          theme: "dark",
          autosize: true,
        };
      },
    },
    symbol: {
      type: String,
      default: () => {
        return "BINANCE:BTCUSDT";
      },
    },
  },
  computed: {
    chartOptions() {
      var options = { ...this.defaultOptions, symbol: this.symbol };

      options.theme = this.$vuetify.theme.dark ? "dark" : "light";
      return options;
    },
  },
  watch: {
    "$vuetify.theme.dark": {
      handler(nv, ov) {
        this.compKey++;
      },
    },
  },
  mounted() {},
};
</script>

<style>
#vue-trading-view {
  height: 620px;
}
</style>