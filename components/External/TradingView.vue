<template>
  <vue-trading-view :options="chartOptions"></vue-trading-view>
</template>

<script>
export default {
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
      return { ...this.defaultOptions, symbol: this.symbol };
    },
  },
  mounted() {},
};
</script>

<style>
#vue-trading-view {
  height: 600px;
}
</style>