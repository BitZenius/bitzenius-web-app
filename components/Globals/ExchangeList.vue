<template>
  <div v-if="checkMobile() == false">
    <v-chip
      style="width: 100%"
      v-if="!exist"
      @click="exist = !exist"
      class=""
      color="danger"
      label
      text-color="white"
    >
      <v-icon left> mdi-label </v-icon>
      You don't have any exchanges registered!
    </v-chip>
    <v-select
      v-else
      v-model="selected"
      :items="exchangeItems"
      @change="onExchangeChange(selected)"
      required
      solo
      flat
    >
      <template v-slot:prepend-inner>
        <v-icon color="primary" size="20" class="mr-2"
          >$vuetify.icons.ExchangeIcon</v-icon
        >
      </template></v-select
    >
    <!-- <v-btn small @click="logger">logger</v-btn> -->
  </div>
  <div v-else>
    <v-chip
      style="width: 100%"
      v-if="!exist"
      @click="exist = !exist"
      class=""
      color="danger"
      label
      text-color="white"
    >
      <v-icon left> mdi-label </v-icon>
      You don't have any exchanges registered!
    </v-chip>
    <v-select
      v-else
      v-model="selected"
      :items="exchangeItems"
      @change="onExchangeChange(selected)"
      required
      solo
      flat
    >
      <template v-slot:prepend-inner>
        <v-icon color="primary" size="20" class="mr-2"
          >$vuetify.icons.ExchangeIcon</v-icon
        >
      </template></v-select
    >
    <!-- <v-btn small @click="logger">logger</v-btn> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      exchangeItems: [],
      exist: true,
      selected: null,
    };
  },
  computed: {
    selectedExchange() {
      return this.$store.state.exchange.selectedExchange;
    },
  },
  methods: {
    onExchangeChange(val) {
      this.$store.commit("exchange/setSelectedExchange", val);
      this.$emit("on-exchange-changed", val);
    },
    logger() {
      console.log(this.selected);
      console.log("state", this.$store.state.exchange.selectedExchange);
    },
    async fetchAvailableExchanges() {
      let res = await this.$api.$get("/user/exchange");
      let tempArray = ["Binance"];
      res.data.forEach((val) => {
        tempArray.push(val.title);
      });
      this.exchangeItems = tempArray;
      if (!this.selectedExchange)
        this.$store.commit("exchange/setSelectedExchange", tempArray[0]);
      this.selected = this.selectedExchange;
    },
  },
  mounted() {
    this.fetchAvailableExchanges();
  },
  watch: {
    selectedExchange: {
      handler(nv, ov) {
        this.selected = nv;
      },
      immediate: true,
    },
  },
};
</script>

<style>
.v-select {
  width: 100%;
}
</style>
