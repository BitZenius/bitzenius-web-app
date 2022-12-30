<template>
  <v-theme-provider root>
    <v-btn
      icon
      class="mr-2"
      @click="(darkMode = !darkMode)"
    >
      <v-icon>mdi-{{ darkMode ? 'white-balance-sunny' : 'weather-night' }}</v-icon>
    </v-btn>
  </v-theme-provider>
</template>

<script>
export default {
  data () {
    return {
      darkMode: false
    }
  },
  watch: {
    darkMode (oldval, newval) {
      this.toggleDarkMode()
    }
  },
  mounted () {
    if (process.browser) {
      if (localStorage.getItem('darkmode')) {
        const cookieValue = localStorage.getItem('darkmode') === 'true'
        this.darkMode = cookieValue
        this.$vuetify.theme.dark = cookieValue
      } else {
        this.toggleDarkMode()
      }
    }
  },
  methods: {
    toggleDarkMode () {
      if (process.browser) {
        if (this.darkMode === true) {
          this.$vuetify.theme.dark = true
          this.$store.commit('setTheme', 'dark')
          localStorage.setItem('darkmode', true)
        } else if (this.darkMode === false) {
          this.$vuetify.theme.dark = false
          this.$store.commit('setTheme', 'light')
          localStorage.setItem('darkmode', false)
        }
      }
    }
  }
}
</script>
