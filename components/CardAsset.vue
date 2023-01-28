<template>
  <v-card class="pa-2" elevation="8">
    <v-list-item two-line>
      <v-list-item-avatar size="60" color="primary">
        <v-icon large dark>
          mdi-currency-btc
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>
          Crypto Assets
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
            <span>All crypto assets on your exchange equivalent to USDT</span>
          </v-tooltip>
        </v-list-item-subtitle>
        <v-list-item-title class="text-h5 font-weight-bold indigo--text text--lighten-2">
          <v-skeleton-loader
            v-if="loading"
            loading
            type="heading"
          />
          <div v-else>{{balance.equivalent_usdt | currency('$', 3)}}</div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
    props:['balance', 'loading'],
    data() {
        return {
            value: 0
        }
    },
    computed: {
    },
    mounted() {},
    methods: {

    }
}
</script>
