<template>
  <v-row class="pa-5">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          <v-icon v-if="checkMobile()" @click="$router.push('/advanced-bots')"
            >mdi-arrow-left</v-icon
          >
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <TablesActivePositionAdvanced
        :defaultType="'GRID'"
        @showHowItWorksModal="
          (e) => {
            showHowItWorks = true;
          }
        "
      />
    </v-col>

    <BaseModal
      @close="showHowItWorks = false"
      :parentModel="showHowItWorks"
      :maxWidth="'650'"
    >
      <ModalsLearnHowItWorks
        @close-modal="showHowItWorks = false"
      ></ModalsLearnHowItWorks>
    </BaseModal>
  </v-row>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      title: "Advanced Bots - Grid",
      showHowItWorks: false,
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