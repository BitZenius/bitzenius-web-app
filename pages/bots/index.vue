<template>
  <v-row class="py-5">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h6 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <TablesActivePosition />
    </v-col>
  </v-row>
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