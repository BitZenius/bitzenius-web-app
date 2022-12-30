<template>
  <v-row>
    <v-col
      cols="12"
    >
      <v-card
        class="pa-5"
        elevation="8"
      >
        Coming soon
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'account',
  data () {
    return {
      title: 'Setup'
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  mounted () {
    this.$store.commit('setTitle', this.title)
  }
}
</script>
