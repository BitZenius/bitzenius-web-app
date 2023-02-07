export default {
  computed: {
    title() {
      return this.$store.state.title;
    },
    user() {
      return this.$store.state.authUser;
    },
    subscription() {
      return this.$store.state.subscription;
    },
    topMargin() {
      return this.$store.state.globalCss.topMargin;
    },
  },
}