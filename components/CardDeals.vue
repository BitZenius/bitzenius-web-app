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
          mdi-star-shooting-outline
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>
          Deals in 24hr
        </v-list-item-subtitle>
        <v-list-item-title class="text-h5 font-weight-bold indigo--text text--lighten-2">
          <v-skeleton-loader
            v-if="loading"
            loading
            type="heading"
          />
          <div v-else>{{ deal }}</div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>

export default({
  props:['deal', 'loading']
})
</script>

