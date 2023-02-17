<template>
  <v-theme-provider root>
    <div class="d-flex">
      <v-icon v-show="$vuetify.theme.dark == false" color="warning" class="mr-3"
        >mdi-white-balance-sunny</v-icon
      >
      <v-icon v-show="$vuetify.theme.dark == true" color="info" class="mr-3"
        >mdi-moon-waning-crescent</v-icon
      >
      <v-switch inset color="primary" v-model="darkMode"></v-switch>
    </div>
    <!-- <v-btn
      icon
      class="mr-2"
      @click="(darkMode = !darkMode)"
    >
      <v-icon>mdi-{{ darkMode ? 'white-balance-sunny' : 'weather-night' }}</v-icon>
    </v-btn> -->
  </v-theme-provider>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
    };
  },
  watch: {
    darkMode(oldval, newval) {
      this.toggleDarkMode();
    },
  },
  mounted() {
    if (process.browser) {
      if (localStorage.getItem("darkmode")) {
        const cookieValue = localStorage.getItem("darkmode") === "true";
        this.darkMode = cookieValue;
        this.$vuetify.theme.dark = cookieValue;
      } else {
        this.toggleDarkMode();
      }
    }

    console.log(this.darkMode, this.$vuetify.theme.dark);
  },
  methods: {
    toggleDarkMode(force = "") {
      if (process.browser) {
        if (force == "DARK") {
          this.$vuetify.theme.dark = true;
          this.$store.commit("setTheme", "dark");
          localStorage.setItem("darkmode", true);
        } else if (force == "LIGHT") {
          this.$vuetify.theme.dark = false;
          this.$store.commit("setTheme", "light");
          localStorage.setItem("darkmode", false);
        } else {
          if (this.darkMode === true) {
            this.$vuetify.theme.dark = true;
            this.$store.commit("setTheme", "dark");
            localStorage.setItem("darkmode", true);
          } else if (this.darkMode === false) {
            this.$vuetify.theme.dark = false;
            this.$store.commit("setTheme", "light");
            localStorage.setItem("darkmode", false);
          }
        }
      }
    },
  },
};
</script>
