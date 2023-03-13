<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold primary white--text">
      <v-row align="center">
        <v-col cols="8"> Create bots </v-col>
        <v-col cols="4" class="d-flex justify-end align-center">
          <v-btn color="white" icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="py-5">
      <v-row>
        <v-col
          cols="12"
          :class="checkMobile() == false ? 'my-5' : ' my-5 pa-2 ma-0'"
        >
          <v-card
            flat
            rounded
            color="off-white-3"
            class="pa-3 primary-text--text text-body-2 mb-2"
          >
            <v-list-item exact to="/bots?c=1">
              <v-list-item-avatar>
                <v-icon color="primary">$vuetify.icons.BotIcon</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> Automated Bots </v-list-item-title>
                <v-list-item-subtitle>
                  Suitable for beginners
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            flat
            rounded
            color="off-white-3"
            class="pa-3 primary-text--text text-body-2 mb-2"
          >
            <v-list-item exact to="/advanced-bots/hybrid?c=1">
              <v-list-item-avatar>
                <v-icon color="primary">$vuetify.icons.CardWithdrawIcon</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> Hybrid Bots </v-list-item-title>
                <v-list-item-subtitle>
                  DCA + Grid based advanced bots
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            flat
            rounded
            color="off-white-3"
            class="pa-3 primary-text--text text-body-2 mb-2"
          >
            <v-list-item exact to="/advanced-bots/dca?c=1">
              <v-list-item-avatar>
                <v-icon color="primary">$vuetify.icons.CoinIcon</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> DCA Bots </v-list-item-title>
                <v-list-item-subtitle>
                  DCA based advanced bots
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            flat
            rounded
            color="off-white-3"
            class="pa-3 primary-text--text text-body-2 mb-2"
          >
            <v-list-item exact to="/advanced-bots/grid?c=1">
              <v-list-item-avatar>
                <v-icon color="primary">$vuetify.icons.GridIcon</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> Grid Bots </v-list-item-title>
                <v-list-item-subtitle>
                  Grid based advanced bots
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card
            flat
            rounded
            color="off-white-3"
            class="pa-3 primary-text--text text-body-2 mb-2"
          >
            <v-list-item disabled exact to="/advanced-bots/smart-trade?c=1">
              <v-list-item-avatar>
                <v-icon color="primary">$vuetify.icons.SmartTradeIcon</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Smart Trade (Coming Soon)
                </v-list-item-title>
                <v-list-item-subtitle>
                  Make it easier for you to trade
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close-modal", false);
    },
  },
  computed: {
    profileCompletion() {
      return this.$store.state.profileCompletion;
    },
    nextTask() {
      var result = null;

      if (!this.profileCompletion.data) return result;

      for (let index = 0; index < this.profileCompletion.data.length; index++) {
        const task = this.profileCompletion.data[index];
        if (!task.completed) {
          result = task;
          break;
        }
      }

      return result;
    },
    profileCompletionProgress() {
      return (
        (this.profileCompletion.step / this.profileCompletion.stepTotal) * 100
      );
    },
  },
  beforeDestroy() {
    this.$store.commit("setShowTaskModal", false);
  },
};
</script>

<style>
</style>