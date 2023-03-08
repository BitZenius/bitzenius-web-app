<template>
  <v-row :class="checkMobile() == false ? 'pa-5' : 'pa-1 ma-0'">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
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
        <v-list-item exact to="/advanced-bots/hybrid">
          <v-list-item-avatar>
            <v-icon color="primary">$vuetify.icons.GridIcon</v-icon>
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
        <v-list-item exact to="/advanced-bots/dca">
          <v-list-item-avatar>
            <v-icon color="primary">$vuetify.icons.GridIcon</v-icon>
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
        <v-list-item exact to="/advanced-bots/grid">
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
        <v-list-item exact to="/advanced-bots/smart-trade">
          <v-list-item-avatar>
            <v-icon color="primary">$vuetify.icons.CardWithdrawIcon</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> Smart Trade (Coming Soon) </v-list-item-title>
            <v-list-item-subtitle>
              Make it easier for you to trade
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col cols="12" :class="checkMobile() == false ? '' : 'pa-0 ma-0'">
      <TablesActivePositionAdvanced
        :tableOnly="true"
      ></TablesActivePositionAdvanced>
    </v-col>
  </v-row>
</template>


<script>
export default {
  layout: "account",
  data() {
    return {
      title: "Advanced Bots",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      bots: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
    };
  },
  head() {
    return {
      title: this.title,
    };
  },

  mounted() {
    if (this.checkMobile() == false) {
      this.$router.push("/settings");
    }
  },
};
</script>

<style>
.summary .v-card__title {
  padding: 0;
  font-size: 0.9rem;
  text-align: center;
  display: block;
}

.summary .v-card__text {
  display: block;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

.custom-chip {
  cursor: pointer;

  width: 100%;
  display: flex;
  justify-content: center;
  max-width: fit-content;
}
.custom-input {
  margin-top: 0px !important;
  padding: 0px !important;
}
.chip-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}
.custom-stepper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 5px !important;
  justify-content: flex-start;
  border-radius: 25px 0% 0% 25px;
}
.custom-stepper-container {
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  border-radius: 10px 0px 0px 10px;
}
.custom-input {
}

.custom-input.v-input .v-input__slot {
  color: black !important;
}

.custom-alert
  > .v-alert__wrapper
  > .v-alert__border.v-alert__border--left.v-alert__border--has-color {
  border-radius: 25% !important;
}
</style>