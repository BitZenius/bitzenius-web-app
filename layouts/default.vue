<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.title;
    },
  },
  mounted() {
    this.initiateTawkTo();
    this.streamBinance();
    if (this.checkMobile()) {
      window.addEventListener("scroll", (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
      });
    }
  },
  methods: {
    streamBinance() {
      console.log('streamBinanceFrom Account.vue');
      let streamStatus = this.$store.state.position.streaming;
      if(streamStatus){
        return;
      }
      this.socket = new WebSocket(`wss://stream.bitzenius.com/stream/ticker`);
      this.socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        if(!status){
          console.log('dataStream', data);
          status = true
        }
        let dataStore = this.$store.state.position.activePositions;
        let index = dataStore.findIndex((b) => b.symbol == data.s);
        let c = { 
          "grid_profit": 0,
          "_id": null,
          "bot_id": null,
          "pair_from": data.s.substr(0, data.s.length - 4),
          "pair_to": data.s.substr(-4),
          "symbol": data.s,
          "exchange": "Binance",
          "name": "This is coming from Binance stream!",
          "type": null,
          "price": {
              "value": data.c,
              "percentage": data.P
          },
          "quantity": 0,
          "profit": {
              "value": 0,
              "percentage": 0
          },
          "average": 0,
          "logo": "/default.png",
          "status": null,
          "amountUsd": 0
        }
        this.$store.commit("position/upsert",{index, data:c})
      }
      this.$store.commit("position/setStreaming", true);
    }
  }
};
</script>
