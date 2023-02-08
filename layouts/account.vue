<template>
  <v-app>
    <GlobalsAddOnLoader />
    <GlobalsAddOnSnackbar />
    <!-- <GlobalsAddOnNotification /> -->
    <v-navigation-drawer
      class="main-nav"
      :style="`top:${topMargin}px`"
      v-model="drawer"
      flat
      app
    >
      <v-list nav v-if="user" rounded class="px-5">
        <v-list-item class="ml-1 mb-8" two-line>
          <v-list-item-content>
            <v-img
              :src="
                $vuetify.theme.dark
                  ? '/bitzenius-logo-white.png'
                  : '/bitzenius-logo.png'
              "
              height="24"
              contain
              position="left center"
            />
          </v-list-item-content>
        </v-list-item>
        <base-menu-item
          :to="'/'"
          :icon="true"
          :avatar="`$vuetify.icons.HomeIcon`"
          :title="`Dashboard`"
        ></base-menu-item>
        <base-menu-item
          :to="'/exchanges'"
          :icon="true"
          :avatar="`$vuetify.icons.ExchangeIcon`"
          :title="`My Exchanges`"
        ></base-menu-item>
        <base-menu-item
          :to="'/bots'"
          :icon="true"
          :avatar="`$vuetify.icons.BotIcon`"
          :title="`Automated Bots`"
        ></base-menu-item>
        <base-menu-item
          :to="'/transaction-history'"
          :icon="true"
          :avatar="`$vuetify.icons.DailyProfitIcon`"
          :title="`Daily Profit`"
        ></base-menu-item>

        <v-divider class="my-2" />

        <base-menu-item-group
          :icon="true"
          :avatar="`$vuetify.icons.DailyProfitIcon`"
          :title="`Advanced Bots`"
        >
          <base-menu-item
            :to="'/grid'"
            :icon="true"
            :avatar="`$vuetify.icons.DailyProfitIcon`"
            :disabled="true"
            :title="`Grid`"
            class="ml-2"
          ></base-menu-item>
          <base-menu-item
            :to="'/dca'"
            :icon="true"
            :avatar="`$vuetify.icons.DailyProfitIcon`"
            :disabled="true"
            :title="`DCA`"
            class="ml-2"
          ></base-menu-item>
          <base-menu-item
            :to="'/smart-trade'"
            :icon="true"
            :avatar="`$vuetify.icons.DailyProfitIcon`"
            :disabled="true"
            :title="`Smart Trade`"
            class="ml-2"
          ></base-menu-item>
        </base-menu-item-group>

        <v-list-group v-if="false" prepend-icon="mdi-tune-vertical">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Advance Bots</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-group>

        <v-divider class="my-2" />

        <base-menu-item
          :to="'/subscription'"
          :icon="true"
          :avatar="`$vuetify.icons.SubscriptionIcon`"
          :title="`Subscription`"
        ></base-menu-item>

        <base-menu-item
          :disabled="true"
          :to="'/revamp_'"
          :icon="true"
          :avatar="`$vuetify.icons.TutorialIcon`"
          :title="`Tutorial`"
        ></base-menu-item>

        <base-menu-item
          :to="'/referral'"
          :icon="true"
          :avatar="`$vuetify.icons.ReferralIcon`"
          :title="`Referral`"
        ></base-menu-item>

        <base-menu-item
          v-if="false"
          :to="'/wallet'"
          :icon="true"
          :avatar="`$vuetify.icons.WalletIcon`"
          :title="`Wallet`"
        ></base-menu-item>

        <base-menu-item
          :to="'/settings'"
          :icon="true"
          :avatar="`$vuetify.icons.SettingsIcon`"
          :title="`Settings`"
        ></base-menu-item>
      </v-list>
      <v-icon
        v-show="drawer"
        class="mr-3 primary--text menu-arrow"
        large
        @click.stop="drawer = !drawer"
        >mdi-arrow-right-drop-circle</v-icon
      >
    </v-navigation-drawer>
    <v-app-bar
      class="custom-app-bar"
      :style="`top:${topMargin}px`"
      fixed
      flat
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <!-- <v-toolbar-title class="text-h5 font-weight-bold" v-text="title" /> -->
      <v-spacer />
      <ThemeToggle />
      <v-btn v-show="false" icon class="mr-2">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn icon class="mr-2" v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list v-if="user">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="customPink">mdi-alert-circle-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Your account is not secure</v-list-item-title
              >
              <v-list-item-subtitle>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
                Id nostrum ab accusamus nesciunt a error incidunt odit veniam
                nobis, delectus quidem praesentium eius
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="customGreen">mdi-check</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >You received the highest profit all time!</v-list-item-title
              >
              <v-list-item-subtitle>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
                Id nostrum ab accusamus nesciunt a error incidunt odit veniam
                nobis, delectus quidem praesentium eius
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn icon class="mr-2" v-bind="attrs" v-on="on">
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
        </template>
        <v-list v-if="user">
          <v-list-item>
            <v-list-item-avatar>
              <img :src="user.photoURL" :alt="user.displayName" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6 font-weight-bold">{{
                user.displayName
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-chip v-if="user.subscription" class="success mt-2" small>
                  ACTIVE
                </v-chip>
                <v-chip v-else class="mt-2" small> INACTIVE </v-chip>
                <v-chip v-if="user.trial" class="warning mt-2" small>
                  TRIAL
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2" />
          <v-list-item to="/profile" exact>
            <v-list-item-action>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/active-positions" exact>
            <v-list-item-action>
              <v-icon>mdi-power</v-icon>
            </v-list-item-action>
            <v-list-item-content @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-slide-x-transition>
      <v-icon
        v-show="!drawer"
        class="mr-3 primary--text menu-arrow-fixed"
        large
        @click.stop="drawer = !drawer"
        >mdi-arrow-right-drop-circle</v-icon
      >
    </v-slide-x-transition>

    <v-main>
      <v-container
        class="main-container"
        :style="`padding-top:${topMargin}px`"
        fluid
      >
        <nuxt :class="$vuetify.breakpoint.mobile ? 'pb-5' : 'px-3'" />
      </v-container>
    </v-main>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.mobile"
      v-model="bottomNav"
      fixed
      app
      grow
      height="72"
    >
      <v-btn value="home" to="/">
        <span>Home</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn value="exchange" to="/exchanges">
        <span>Exchanges</span>
        <v-icon>mdi-briefcase-outline</v-icon>
      </v-btn>
      <v-btn value="bot" to="/bots">
        <span>Bots</span>
        <v-icon>mdi-robot-outline</v-icon>
      </v-btn>
      <v-btn value="trading" to="/trading-history">
        <span>Trading</span>
        <v-icon>mdi-table-large</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer v-else>
      <v-col class="text-right text--disabled" cols="12">
        &copy;{{ new Date().getFullYear() }} - BitZenius
      </v-col>
    </v-footer>
    <EmailVerification />
  </v-app>
</template>
<style scoped>
.v-list-item .v-list-item__title {
  font-weight: 700;
}
</style>
<script>
import BaseMenuItem from "~/components/Base/BaseMenuItem.vue";
import BaseMenuItemGroup from "~/components/Base/BaseMenuItemGroup.vue";

export default {
  components: { BaseMenuItem, BaseMenuItemGroup },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      rightDrawer: false,
      bottomNav: "home",
      listener: null,
    };
  },
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
  mounted() {
    if (!this.$vuetify.breakpoint.mobile) {
      this.drawer = true;
    }

    this.listenSubscription();
  },
  beforeDestroy() {
    this.listener();
  },
  methods: {
    listenSubscription() {
      if (this.user) {
        this.listener = this.$fire.firestore
          .collection("subscriptions")
          .doc(this.user.uid)
          .onSnapshot(async (onResult, onError) => {
            if (onError) {
              console.log(onError);
            }

            if (onResult.exists) {
              const subscriptionData = onResult.data();

              // save subscription data into store
              await this.$store.commit("setSubscription", {
                ...subscriptionData,
                start: subscriptionData.start.toDate(),
                end: subscriptionData.end.toDate(),
              });

              // also update subscription and trial status into store
              await this.$store.commit("setUser", {
                subscription: subscriptionData.id > 0,
                trial: subscriptionData.trial,
              });
            }
          });
      }
    },
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.main-container {
  background: #f4f7fd !important;
  height: 100%;
}
.main-nav {
  overflow: unset !important;
}

.menu-arrow {
  position: absolute;
  top: 50%;
  left: 100%;
  transition: all 0.4s;
  z-index: 20;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate(180deg);
}
.menu-arrow-fixed {
  position: fixed;
  top: 50%;
  left: 0%;
  transition: all 0.4s;
  z-index: 20;
  transform-origin: center;
  transform: translate(-20%, -50%);
}

.custom-app-bar {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.32) 0%,
    rgba(244, 247, 253, 1) 100%
  ) !important;
  opacity: 1;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}
</style>
