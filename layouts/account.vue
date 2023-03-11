<template>
  <v-app>
    <GlobalsAddOnLoader />
    <GlobalsAddOnSnackbar />
    <GlobalsAddOnNotification
      :notifications="importantNotifications"
      ref="notification"
    />

    <v-navigation-drawer
      v-if="checkMobile() == false"
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
        <menu-profile :showNextTask="true" :userData="user"></menu-profile>
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
            :to="'/advanced-bots/hybrid'"
            :icon="true"
            :avatar="`$vuetify.icons.CardWithdrawIcon`"
            :cardtitle="`Hybrid`"
            class="ml-2"
          ></base-menu-item>
          <base-menu-item
            :to="'/advanced-bots/grid'"
            :icon="true"
            :avatar="`$vuetify.icons.GridIcon`"
            :cardtitle="`Grid`"
            class="ml-2"
          ></base-menu-item>
          <base-menu-item
            :to="'/advanced-bots/dca'"
            :icon="true"
            :avatar="`$vuetify.icons.CoinIcon`"
            :cardtitle="`DCA`"
            class="ml-2"
          ></base-menu-item>
          <base-menu-item
            :to="'/advanced-bots/smart-trade'"
            :icon="true"
            :avatar="`$vuetify.icons.SmartTradeIcon`"
            :disabled="true"
            :cardtitle="`Smart Trade (Coming Soon)`"
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
          :href="'https://bitzenius.tawk.help/'"
          :target="'_blank'"
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
      :style="
        checkMobile() == false
          ? `top:${topMargin}px`
          : `height:0px !important; visibility:hidden; top:${topMargin}px`
      "
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
      <v-menu offset-y v-if="checkMobile() == false">
        <template #activator="{ on, attrs }">
          <v-btn icon class="mr-2" v-bind="attrs" v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list
          v-if="user && notifications.length > 0"
          style="height: 200px; min-width: 200px"
          class="overflow-y-auto"
        >
          <v-list-item v-for="(notification, i) in notifications" :key="i">
            <v-list-item-avatar>
              <v-icon class="customPink">mdi-alert-circle-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">{{
                notification.title
                  ? notification.title
                  : `Notification ${i + 1}`
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ notification.message }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item class="float-right">
            <v-btn outline @click="readMore()" color="primary" rounded>Read More</v-btn>
          </v-list-item> -->
        </v-list>
      </v-menu>
    </v-app-bar>
    <ThemeToggle
      v-if="checkMobile() == true"
      style="display: none !important"
    ></ThemeToggle>
    <v-main
      class="main-container off-white"
      :style="checkMobile() == true ? 'padding-top:10px !important' : ''"
    >
      <v-container
        v-if="checkMobile() == false"
        class="main-container off-white"
        :style="`padding-top:${topMargin}px`"
        fluid
      >
        <nuxt :class="$vuetify.breakpoint.mobile ? 'pb-5' : 'px-3'" />

        <!-- ORNAMENTS -->
        <v-img class="ornament-2" src="/images/dot-ornament.svg"></v-img>
        <!-- ORNAMENTS END -->
      </v-container>
      <v-container
        v-else
        fluid
        class="off-white pa-0"
        style="padding-bottom: 80px !important"
      >
        <nuxt class="pa-0" />
      </v-container>
    </v-main>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.mobile"
      v-model="bottomNav"
      fixed
      app
      grow
      height="72"
      style="z-index: 10000 !important"
    >
      <div class="bottom-relative-container">
        <div
          :class="
            $vuetify.theme.dark
              ? 'bottom-svg-container dark'
              : 'bottom-svg-container light'
          "
        >
          <v-btn
            :ripple="false"
            plain
            active-class="active-icon"
            class="bottom-button-navigation"
            value="home"
            to="/"
          >
            <span>Home</span>
            <v-icon>$vuetify.icons.HomeIcon</v-icon>
          </v-btn>
          <v-btn
            :ripple="false"
            plain
            active-class="active-icon"
            class="bottom-button-navigation"
            value="exchange"
            to="/exchanges"
          >
            <span>Exchanges</span>
            <v-icon>$vuetify.icons.ExchangeIcon</v-icon>
          </v-btn>
          <div class="bot-button-container bottom-button-navigation">
            <v-btn class="bot-button" color="primary" value="bot" to="/bots">
              <span class="white--text">Bots</span>
              <v-icon size="28" color="white">$vuetify.icons.BotIcon</v-icon>
            </v-btn>
          </div>
          <v-btn
            :ripple="false"
            plain
            active-class="active-icon"
            class="bottom-button-navigation"
            value="trading"
            to="/advanced-bots"
          >
            <span>Advanced</span>
            <v-icon>$vuetify.icons.AdvancedBotIcon</v-icon>
          </v-btn>
          <v-btn
            :ripple="false"
            plain
            active-class="active-icon"
            class="bottom-button-navigation"
            value="account"
            to="/account"
          >
            <span>Account</span>
            <v-icon>$vuetify.icons.SettingsIcon</v-icon>
          </v-btn>
        </div>
      </div>
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
        <v-col
          class="d-flex align-center justify-end"
          style="padding-right: 7%"
          cols="6"
        >
          Download our app
          <v-tooltip color="primary" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                plain
                :ripple="false"
                class="white--text mx-3 pa-0 my-2"
              >
                <v-img
                  contain
                  :src="require('@/assets/images/AS128.png')"
                ></v-img>
              </v-btn>
            </template>
            <span>Coming soon!</span>
          </v-tooltip>

          <v-tooltip color="primary" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                plain
                :ripple="false"
                class="white--text pa-0 my-2"
              >
                <v-img
                  contain
                  :src="require('@/assets/images/GP128.png')"
                ></v-img>
              </v-btn>
            </template>
            <span>Coming soon!</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-footer>
    <EmailVerification />

    <!-- GLOBAL MODAL -->
    <BaseModal
      @close="showTaskModal = false"
      :parentModel="showTaskModal"
      :maxWidth="'650'"
    >
      <ModalsTask @close-modal="showTaskModal = false"></ModalsTask>
    </BaseModal>
    <!-- GLOBAL MODAL ENDS -->
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
      notifications: [],
      importantNotifications: [],

      showTaskModal: false,
    };
  },
  watch: {
    showTaskModal(nv, ov) {
      this.$store.commit("setShowTaskModal", nv);
    },
    showTaskModalStore(nv, ov) {
      this.showTaskModal = nv;
    },
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
    showTaskModalStore() {
      return this.$store.state.showTaskModal;
    },
  },
  beforeCreate() {},
  beforeMount() {
    // IF NOT VERIFIED REDIRECT TO VERIFICATION LINK
    if (!this.user.emailVerified) {
      return this.$router.push("/verification");
    } else {
      this.$store.commit("setIsLoading", false);
    }
  },
  mounted() {
    this.initiateTawkTo();
    if (!this.$vuetify.breakpoint.mobile) {
      this.drawer = true;
    }
    this.listenSubscription();
    this.streamNotification();
    this.getUserNotifications();
    this._fetchUserCompletion();

    if (this.checkMobile()) {
      window.addEventListener("scroll", (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
      });
    }
  },
  beforeDestroy() {
    this.listener();
  },
  methods: {
    async _fetchUserCompletion() {
      this.isLoading = true;
      try {
        let res = await this.$api.$get("/user/profile/completion");
        this.$store.commit("setProfileCompletion", res);
      } catch (error) {
        console.log(error);
      }
      this.$store.commit("setIsLoading", false);
    },
    checkMobile() {
      var check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    readMore() {},
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
    async getUserNotifications() {
      this.$api
        .$get("/user/user-notifications")
        .then((res) => {
          console.log("user-notification", res);
          if (res.success) {
            this.notifications = res.data;
          } else {
            this.$store.commit("setShowSnackbar", {
              show: true,
              message: res.message,
              color: "customPink",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: err.response.message,
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
      let token = await this.currentUser.getIdToken();
      // console.log('currentUser', this.currentUser.getIdToken());
      this.socket = io(process.env.SERVER, {
        path: "/cron-notification",
        auth: { token },
      });

      this.socket.on("notification", (msg) => {
        console.log("notification msg", msg);
        console.log(this.user);
        if (this.user.uid == msg.uid) {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "You received new notification, please check!",
            color: "primary",
          });
          this.getUserNotifications();
        }
      });

      this.socket.on("important-notification", (msg) => {
        if (msg && msg.length > 0) {
          this.importantNotifications = msg;
          this.$refs.notification.show();
        }
      });
    },
  },
};
</script>

<style>
.main-container {
  height: 100%;
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

.active-icon > .v-btn__content > .v-icon {
  color: var(--primary);
}

.bot-button-container {
  position: relative;
  /* min-width: 75px; */
}

.bot-button {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100% !important;
  width: 62px !important;
  height: 62px !important;
  min-width: 62px !important;
  min-height: 62px !important;
  z-index: 20;
}

.bottom-button-navigation {
  min-width: unset !important;
  width: 20% !important;
  max-width: 20% !important;
  min-height: 80px;
}

@media only screen and (min-width: 960px) {
  .main-container {
    min-height: 120vh;
  }
}

.bottom-relative-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.bottom-svg-container {
  width: 96%;
  margin: auto;
  height: 100%;
  display: flex;
  transform: translateY(-10px);
}

.bottom-svg-container.dark {
  background: url("/images/main menu-bg-dark.svg") no-repeat;
  background-position: center;
  background-size: cover;
}
.bottom-svg-container.light {
  background: url("/images/main menu-bg.svg") no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
