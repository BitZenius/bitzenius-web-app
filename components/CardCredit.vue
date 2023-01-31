<template>
  <v-card
    class="pa-2"
    elevation="8"
  >
    <v-list-item two-line>
      <v-list-item-avatar
        size="60"
        color="primary"
      >
        <v-icon large dark>
          mdi-currency-usd
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>
          USDT Balance
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                size="18"
              >
                mdi-help-circle
              </v-icon>
            </template>
            <span>USDT asset in your exchange</span>
          </v-tooltip>
        </v-list-item-subtitle>
        <v-list-item-title class="text-h5 font-weight-bold indigo--text text--lighten-2">
          <v-skeleton-loader
            v-if="loading"
            loading
            type="heading"
          />
          <div v-else>
            <!-- {{ balance.free_usdt | currency('$', 4) }} -->
            <span v-if="convertFinished">${{value.first}}<small>.{{value.second}}</small></span>                
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default{
  props:['balance', 'loading'],
  data(){
    return{
      value:0,
      convertFinished:false
    }
  },
  mounted(){
    if(this.balance.free_usdt <= 0){
      this.value = {first:0, second:'0000'};
      this.convertFinished = true;
    }
  },
  methods:{
    processValue(){
      let value = {};
      if(this.balance.free_usdt > 0){
        let string = String(parseFloat(this.balance.free_usdt).toFixed(4)).split(".");
        value.first = parseFloat(string[0]);
        value.second = parseFloat(string[1]);
        this.value = value;
        this.convertFinished = true;
      }else{
        this.value = {first:0, second:0};
      }
    }
  },
  watch:{
    balance(ov,nv){
      this.processValue();
    }
  }
}
</script>
