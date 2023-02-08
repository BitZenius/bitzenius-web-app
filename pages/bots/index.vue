<template>
  <TablesActivePosition />
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      title: "Automated Bots",
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  mounted() {
    this.$store.commit("setTitle", this.title);
  },
};
</script>

<style>
</style>