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

    if (this.checkMobile()) {
      window.addEventListener("scroll", (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
      });
    }
  },
};
</script>
