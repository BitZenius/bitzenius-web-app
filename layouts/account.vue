<template>
<v-app>
  <GlobalsAddOnLoader />
  <GlobalsAddOnSnackbar />
  <GlobalsAddOnNotification ref="notification"/>
  <v-navigation-drawer
    :style="`top:${topMargin}px`"
    v-model="drawer"
    flat
    app
  >
    <v-list v-if="user">
      <v-list-item class="ml-1" two-line>
        <v-list-item-content>
          <v-img :src="$vuetify.theme.dark ? '/bitzenius-logo-white.png' : '/bitzenius-logo.png'" height="24" contain position="left center" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-apps</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/exchanges" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-briefcase-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>My Exchanges</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-2" />
      <v-list-item to="/bots" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-robot-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Automated Bots</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-list-item to="/active-positions" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-pin-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Active Positions</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
      <v-list-item to="/transaction-history" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-table-large</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Daily Profit</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-2" />
      <v-list-group prepend-icon="mdi-tune-vertical">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Advance Bots</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item disabled class="ml-3">
          <v-list-item-icon>
            <v-icon>mdi-grid-large</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="d-flex flex-column">
            Grid
            <small style="color:customYellow;">Coming Soon!</small>
          </v-list-item-title>
        </v-list-item>
        <v-list-item disabled class="ml-3">
          <v-list-item-icon>
            <v-icon>mdi-currency-usd</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="d-flex flex-column">
            DCA
            <small style="color:customYellow;">Coming Soon!</small>
          </v-list-item-title>
        </v-list-item>
        <v-list-item disabled class="ml-3">
          <v-list-item-icon>
            <v-icon>mdi-lightbulb-on-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="d-flex flex-column">
            Smart Trade
            <small style="color:customYellow;">Coming Soon!</small>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-divider class="my-2" />
      <v-list-item to="/subscription" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-key-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Subscription</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item disabled target="_" href="#" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-human-male-board</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Tutorial</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/referral" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-account-star-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Referral</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/wallet" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-wallet</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Wallet</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/settings" exact class="my-2">
        <v-list-item-action>
          <v-icon>mdi-cog-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar
    :style="`top:${topMargin}px`"
    fixed
    flat
    app
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title class="text-h5 font-weight-bold" v-text="title" />
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
            <v-list-item-title class="font-weight-bold">Your account is not secure</v-list-item-title>
            <v-list-item-subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.<br /> Id nostrum ab accusamus nesciunt a error incidunt odit veniam nobis, delectus quidem praesentium eius
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon class="customGreen">mdi-check</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">You received the highest profit all time!</v-list-item-title>
            <v-list-item-subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Id nostrum ab accusamus nesciunt a error incidunt odit veniam nobis, delectus quidem praesentium eius
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
            <img :src="user.photoURL" :alt="user.displayName">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold">{{ user.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-chip
                v-if="user.subscription"
                class="success mt-2"
                small
              >
                ACTIVE
              </v-chip>
              <v-chip
                v-else
                class="mt-2"
                small
              >
                INACTIVE
              </v-chip>
              <v-chip
                v-if="user.trial"
                class="warning mt-2"
                small
              >
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
  <v-main>
    <v-container :style="`padding-top:${topMargin}px`" fluid>
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
  <v-footer
    v-else
  >
    <v-col class="text-right text--disabled" cols="12">
      &copy;{{ new Date().getFullYear() }} - BitZenius
    </v-col>
  </v-footer>
  <EmailVerification />
</v-app>
</template>
<style scoped>
.v-list-item .v-list-item__title{
  font-weight:700;
}
</style>
<script>
import io from 'socket.io-client'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      rightDrawer: false,
      bottomNav: 'home',
      listener: null,
      showNotification:false,
    }
  },
  computed: {
    title() {
      return this.$store.state.title
    },
    user() {
      return this.$store.state.authUser
    },
    currentUser(){
      return  this.$store.$fire.auth.currentUser
    },
    subscription() {
      return this.$store.state.subscription
    },
    topMargin() {
      return this.$store.state.globalCss.topMargin
    }
  },
  mounted() {
    this.$store.commit('setIsLoading', true);
    setTimeout(()=>{
      console.log('currentUser', this.user);
      // IF NOT VERIFIED REDIRECT TO VERIFICATION LINK
      if(!this.user.emailVerified){
        return this.$router.push('/verification');
      }else{
        this.$store.commit('setIsLoading', false);
      }
    });

    if (!this.$vuetify.breakpoint.mobile) {
      this.drawer = true
    }
    this.listenSubscription();
    this.streamNotification();
  },
  beforeDestroy () {
    this.listener()
  },
  methods: {
    listenSubscription () {
      if (this.user) {
        this.listener = this.$fire.firestore.collection('subscriptions').doc(this.user.uid).onSnapshot(async(onResult, onError) => {
          if (onError) {
            console.log(onError)
          }

          if (onResult.exists) {
            const subscriptionData = onResult.data()
            
            // save subscription data into store
            await this.$store.commit('setSubscription', {
              ...subscriptionData,
              start: subscriptionData.start.toDate(),
              end: subscriptionData.end.toDate()
            })

            // also update subscription and trial status into store
            await this.$store.commit('setUser', {
              subscription: subscriptionData.id > 0,
              trial: subscriptionData.trial
            })
          }
        })
      }
    },
    logout() {
      this.$fire.auth.signOut().then(() => {
        this.$router.push('/signin')
      }).catch((error) => {
        console.log(error)
      })
    },
    async streamNotification(){
        // const currentUser = await store.$fire.auth.currentUser
        let token = await this.currentUser.getIdToken(); 
        console.log('currentUser', this.currentUser.getIdToken());
        console.log("TOKEN", this.$store.state.token);

        this.socket = io(process.env.SERVER, {
            path: "/cron-notification",
            auth:{token}
        });

        this.socket.on('notification', (msg) => {
          console.log('fromSocket', msg);
          this.$refs.notification.show();
        })
    },
  }
}
</script>
