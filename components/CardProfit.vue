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
          mdi-cash-plus
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>
          Today's Profit
        </v-list-item-subtitle>
        <v-list-item-title class="text-h5 font-weight-bold indigo--text text--lighten-2">
          <v-skeleton-loader
            v-if="loading"
            loading
            type="heading"
          />
          <div v-else>
            <!-- {{ profit | currency('$', 4) }} -->
            <span v-if="convertFinished">${{value.first}}<small>.{{value.second}}</small></span>                
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default{
  props:['profit', 'loading'],
  data(){
    return{
      value:0,
      convertFinished:false
    }
  },
  mounted(){
    if(this.profit <= 0){
      this.value = {first:0, second:'00'};
      this.convertFinished = true;
    }
  },
  methods:{
    processValue(){
      let value = {};
      let string = String(parseFloat(this.profit).toFixed(2)).split(".");
      value.first = parseFloat(string[0]);
      value.second = parseFloat(string[1]);
      this.value = value;
      this.convertFinished = true;
    }
  },
  watch:{
    profit(ov,nv){
      this.processValue();
    }
  }
}
</script>
