<template>
  <v-row class="pa-1 ma-0">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="d-flex align-center justify-center flex-column">
      <v-list-item-avatar size="125" class="ma-0">
        <v-img :src="user.photoURL" :alt="user.displayName" contain></v-img>
      </v-list-item-avatar>
      <span class="basic-text--text text-h5 font-weight-bold">
        {{ user.displayName }}
      </span>
      <span class="basic-text--text text-body-1 my-3">
        <strong class="primary--text font-weight-bold"
          >{{ profileCompletionProgress }}%</strong
        >
        Task completion
      </span>
      <v-chip small color="primary">
        {{ user.subscription ? "Active" : user.trial ? "Trial" : "Inactive" }}
      </v-chip>
    </v-col>

    <v-col cols="12" class="my-5">
      <v-row>
        <v-col cols="3" class="d-flex align-center justify-center flex-column">
          <v-btn
            depressed
            active-class="active-icon"
            value="home"
            class="py-8 mb-2"
            to="/settings"
          >
            <v-icon color="primary">$vuetify.icons.SettingsIcon</v-icon>
          </v-btn>
          Settings
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-center flex-column">
          <v-btn
            depressed
            active-class="active-icon"
            value="home"
            class="py-8 mb-2"
            to="/wallet"
          >
            <v-icon color="primary">$vuetify.icons.WalletIcon</v-icon>
          </v-btn>
          Wallet
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-center flex-column">
          <v-btn
            depressed
            active-class="active-icon"
            value="home"
            class="py-8 mb-2"
            to="/referral"
          >
            <v-icon color="primary">$vuetify.icons.ReferralIcon</v-icon>
          </v-btn>
          Referral
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-center flex-column">
          <v-btn
            depressed
            active-class="active-icon"
            value="home"
            class="py-8 mb-2"
            to="/subscription"
          >
            <v-icon color="primary">$vuetify.icons.SubscriptionIcon</v-icon>
          </v-btn>
          Subscription
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card
        flat
        rounded
        color="off-white-3"
        class="pa-3 primary-text--text text-body-2 mb-2"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="primary"> $vuetify.icons.TutorialIcon </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> Tutorial </v-list-item-title>
            <v-list-item-subtitle>
              Make it easier for you to trade
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col
          cols="6"
          class="d-flex justify-start align-center text-left text-h6 font-weight-bold"
          >Dark Mode</v-col
        >
        <v-col cols="6" class="d-flex justify-end align-center text-right">
          <ThemeToggle></ThemeToggle>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12 mt-10">
      <v-row justify="center">
        <v-col cols="12" class="text-right">
          <v-btn rounded block depressed @click="logout" color="primary"
            >Logout</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>


<script>
export default {
  layout: "account",
  data() {
    return {
      title: "Account",
      profileCompletionTasks: [],
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        })
        .catch((error) => {
          // console.log(error)
        });
    },
  },
  computed: {
    userToken() {
      return this.$store.state.token;
    },
    user() {
      return this.$store.state.authUser;
    },
    exchange() {
      return this.$store.state.exchange.selectedExchange;
    },
    profileCompletion() {
      return this.$store.state.profileCompletion;
    },
    profileCompletionProgress() {
      return (
        (this.profileCompletion.step / this.profileCompletion.stepTotal) * 100
      );
    },
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