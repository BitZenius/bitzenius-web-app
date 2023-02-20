<template>
  <v-app>
    <GlobalsAddOnLoader />
    <GlobalsAddOnSnackbar />
    <GlobalsAddOnNotification ref="notification" />
    <v-navigation-drawer
      class="main-nav"
      :style="`top:${topMargin}px`"
      v-model="drawer"
      flat
      app
    >
      <v-list nav v-if="user" rounded class="px-5 no-scrollbar">
        <v-list-item class="ml-1 mb-2" two-line>
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
        <menu-profile :userData="user"></menu-profile>
        <base-menu-item
          :to="'/'"
          :icon="true"
          :avatar="`$vuetify.icons.HomeIcon`"
          :cardtitle="`Dashboard`"
        ></base-menu-item>
        <base-menu-item
          :to="'/exchanges'"
          :icon="true"
          :avatar="`$vuetify.icons.ExchangeIcon`"
          :cardtitle="`My Exchanges`"
        ></base-menu-item>
        <base-menu-item
          :to="'/bots'"
          :icon="true"
          :avatar="`$vuetify.icons.BotIcon`"
          :cardtitle="`Automated Bots`"
        ></base-menu-item>
        <!-- <base-menu-item
          :to="'/transaction-history'"
          :icon="true"
          :avatar="`$vuetify.icons.DailyProfitIcon`"
          :cardtitle="`Daily Profit`"
        ></base-menu-item> -->

        <v-divider class="my-2" />

        <base-menu-item-group
          :icon="true"
          :avatar="`$vuetify.icons.AdvancedBotIcon`"
          :cardtitle="`Advanced Bots`"
        >
          <base-menu-item
            :to="'/grid'"
            :icon="true"
            :avatar="`$vuetify.icons.DailyProfitIcon`"
            :disabled="true"
            :cardtitle="`Grid`"
            class="ml-2"
          ></base-menu-item>
          <base-menu-item
            :to="'/dca'"
            :icon="true"
            :avatar="`$vuetify.icons.CoinIcon`"
            :disabled="true"
            :cardtitle="`DCA`"
            class="ml-2"
          ></base-menu-item>
          <base-menu-item
            :to="'/smart-trade'"
            :icon="true"
            :avatar="`$vuetify.icons.DailyProfitIcon`"
            :disabled="true"
            :cardtitle="`Smart Trade`"
            class="ml-2"
          ></base-menu-item>
        </base-menu-item-group>

        <v-divider class="my-2" />

        <base-menu-item
          :to="'/wallet'"
          :icon="true"
          :avatar="`$vuetify.icons.WalletIcon`"
          :cardtitle="`Wallet`"
        ></base-menu-item>

        <base-menu-item
          :to="'/subscription'"
          :icon="true"
          :avatar="`$vuetify.icons.SubscriptionIcon`"
          :cardtitle="`Subscription`"
        ></base-menu-item>

        <base-menu-item
          :disabled="true"
          :to="'/revamp_'"
          :icon="true"
          :avatar="`$vuetify.icons.TutorialIcon`"
          :cardtitle="`Tutorial`"
        ></base-menu-item>

        <base-menu-item
          :to="'/referral'"
          :icon="true"
          :avatar="`$vuetify.icons.ReferralIcon`"
          :cardtitle="`Referral`"
        ></base-menu-item>

        <base-menu-item
          v-if="false"
          :to="'/wallet'"
          :icon="true"
          :avatar="`$vuetify.icons.WalletIcon`"
          :cardtitle="`Wallet`"
        ></base-menu-item>

        <base-menu-item
          :to="'/settings'"
          :icon="true"
          :avatar="`$vuetify.icons.SettingsIcon`"
          :cardtitle="`Settings`"
        ></base-menu-item>

        <base-menu-item
          @click.native="logout"
          :icon="true"
          :avatar="`$vuetify.icons.LogoutIcon`"
          :cardtitle="`Logout`"
        ></base-menu-item>
      </v-list>

      <!-- <v-row justify="center" class="my-0 py-0">
        <v-col cols="12" class="d-flex justify-center my-0 py-0">

        </v-col>
      </v-row> -->
      <!-- <v-icon
        v-show="drawer"
        class="mr-3 primary--text menu-arrow"
        @click.stop="drawer = !drawer"
        >mdi-arrow-right-drop-circle</v-icon
      > -->
    </v-navigation-drawer>
    <v-app-bar
      :class="$vuetify.theme.dark ? 'custom-app-bar-dark' : 'custom-app-bar'"
      :style="`top:${topMargin}px`"
      fixed
      flat
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-icon
        :class="
          drawer
            ? 'mr-3 primary--text menu-arrow menu-arrow-left'
            : 'mr-3 primary--text menu-arrow menu-arrow-right'
        "
        @click.stop="drawer = !drawer"
        >mdi-arrow-right-drop-circle</v-icon
      >
      <!-- <v-toolbar-title class="text-h5 font-weight-bold" v-text="title" /> -->
      <v-spacer />
      <div class="d-flex align-center">
        <ThemeToggle></ThemeToggle>
      </div>
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
    </v-app-bar>
    <!-- <v-slide-x-transition>
      <v-icon
        v-show="!drawer"
        class="mr-3 primary--text menu-arrow-fixed"
        @click.stop="drawer = !drawer"
        >mdi-arrow-right-drop-circle</v-icon
      >
    </v-slide-x-transition> -->

    <v-main class="main-container off-white">
      <v-container
        class="main-container off-white"
        :style="`padding-top:${topMargin}px`"
        fluid
      >
        <nuxt :class="$vuetify.breakpoint.mobile ? 'pb-5' : 'px-3'" />

        <!-- ORNAMENTS -->
        <v-img class="ornament-2" src="/images/dot-ornament.svg"></v-img>
        <!-- ORNAMENTS END -->
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
    <v-footer v-else fixed>
      <v-row justify="space-between" class="pl-5">
        <v-col cols="2"></v-col>
        <v-col
          class="text-left text--disabled d-flex align-center pl-10"
          cols="4"
        >
          &copy;{{ new Date().getFullYear() }} - BitZenius
        </v-col>
        <v-col class="d-flex align-center justify-end" cols="6">
          Download our app
          <v-btn plain :ripple="false" class="white--text mx-3 pa-0">
            <v-img contain :src="require('@/assets/images/AS128.png')"></v-img>
          </v-btn>
          <v-btn plain :ripple="false" class="white--text pa-0">
            <v-img contain :src="require('@/assets/images/GP128.png')"></v-img>
          </v-btn>
        </v-col>
      </v-row>
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
import io from "socket.io-client";
import MenuProfile from "~/components/MenuProfile.vue";

export default {
  components: { BaseMenuItem, BaseMenuItemGroup, MenuProfile },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      rightDrawer: false,
      bottomNav: "home",
      listener: null,
      showNotification: false,
    };
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
    user() {
      return this.$store.state.authUser;
    },
    currentUser() {
      return this.$store.$fire.auth.currentUser;
    },
    subscription() {
      return this.$store.state.subscription;
    },
    topMargin() {
      return this.$store.state.globalCss.topMargin;
    },
  },
  mounted() {
    this.$store.commit("setIsLoading", true);

    setTimeout(() => {
      // this.getUserIp();
      // IF NOT VERIFIED REDIRECT TO VERIFICATION LINK
      if (!this.user.emailVerified) {
        return this.$router.push("/verification");
      } else {
        this.$store.commit("setIsLoading", false);
      }
    });

    if (!this.$vuetify.breakpoint.mobile) {
      this.drawer = true;
    }
    this.listenSubscription();
    this.streamNotification();
  },
  beforeDestroy() {
    this.listener();
  },
  methods: {
    async writeIp(userIp) {
      console.log(navigator.userAgent);
      this.$api
        .$post("/user/login-histories", {
          user_agent: navigator.userAgent.toString(),
          ip: userIp.toString(),
        })
        .then((res) => {
          console.log("Write IP on database", res);
        })
        .catch((err) => {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: err.response.data.data,
            color: "customPink",
          });
        });
    },

    async getUserIp() {
      console.log("-------------------START-----------------");
      // GET USER IPs record;
      this.$api
        .$get("/user/login-histories")
        .then((res) => {
          if (res.success) {
            let histories = res.data; //--> IP RECORDS
            console.log("histories", histories);
            this.$axios
              .get("https://api.ipify.org/?format=json")
              .then(async (result) => {
                let userIp = result.data.ip; //--> CURRENT USER IP

                // IF HISTORIES LENGTH == 0, WRITE TO DB FIRST RECORD
                if (histories.length == 0) {
                  alert(
                    "Fresh login, allowed to create your first login record!"
                  );
                  await this.writeIp(userIp);
                } else {
                  // IF HISTORIES LONGER THAN 1 THEN CHECK (IS LATEST UP EQUAL TO CURRENT)
                  console.log(`comparing:${userIp} == ${histories[0].ip}`);
                  if (userIp != histories[0].ip) {
                    alert("IP doesnt match, set user status to Unverified!");
                  } else {
                    alert(
                      "IP match against latest login record! good to go :)"
                    );
                  }
                }
              })
              .catch((err) => {
                console.log("ERROR", err);
                this.$store.commit("setShowSnackbar", {
                  show: true,
                  message:
                    "Unable to get user IP address, please disable adblock and other plugins!",
                  color: "customPink",
                });
              })
              .finally(() => {
                console.log("-------------------END-----------------");
              });
          } else {
            this.$store.commit("setShowSnackbar", {
              show: true,
              message: "Unable to load histories!",
              color: "customPink",
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
        })
        .finally(() => {});
    },
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
          // console.log(error)
        });
    },
    async streamNotification() {
      // const currentUser = await store.$fire.auth.currentUser
      let token = await this.currentUser.getIdToken(true);
      // console.log('currentUser', this.currentUser.getIdToken(true));
      this.socket = io(process.env.SERVER, {
        path: "/cron-notification",
        auth: { token },
      });

      this.socket.on("notification", (msg) => {
        this.$refs.notification.show();
      });
    },
  },
};
</script>

<style>
.main-container {
  height: 100%;
  min-height: 120vh;
}
.main-nav {
  overflow: unset !important;
}

.menu-arrow {
  transition: all 0.3s ease-in;
}

.menu-arrow-left {
  transform: rotate(180deg);
}
.custom-app-bar-dark {
  background: linear-gradient(180deg, #212434 0%, #212434 100%) !important;
  opacity: 1;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
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

.ornament-2 {
  position: absolute;
  width: 12%;
  right: 0%;
  bottom: 0%;
  display: none;
}

/* .v-navigation-drawer__content {
  overflow-y: hidden !important;
} */

/* Hide scrollbar for Chrome, Safari and Opera */
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.v-navigation-drawer__content {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
