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
          Today's Profit
        </v-list-item-subtitle>
        <v-list-item-title class="text-h5 font-weight-bold indigo--text text--lighten-2">
          {{profit | currency('$', 3)}}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default{
  props:['profit'],
  data(){
    return{
      value:0
    }
  },
  mounted(){},
  methods:{ }
}
</script>
