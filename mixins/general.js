export default {
  computed: {
    user() {
      return this.$store.state.authUser;
    },
    subscription() {
      return this.$store.state.subscription;
    }
  },
}