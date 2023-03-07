<template>
  <v-row :class="checkMobile() == false ? 'pa-5' : 'pa-1 ma-0'">
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
        :defaultType="'DCA'"
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
      title: "Advanced Bots - DCA",
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