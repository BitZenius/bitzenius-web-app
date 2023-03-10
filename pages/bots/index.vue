<template>
  <v-row :class="checkMobile() == false ? 'pa-5' : 'pa-1 ma-0'">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" :class="checkMobile() == false ? '' : 'pa-0 ma-0'">
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
    this.checkCompletion();
    this.$store.commit("setTitle", this.title);
  },
};
</script>

<style>
</style>