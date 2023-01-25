<template>
<v-app>
    <GlobalsAddOnLoader />
    <GlobalsAddOnSnackbar />
    <v-navigation-drawer
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
            <v-list-item to="/trading-history" exact class="my-2">
                <v-list-item-action>
                    <v-icon>mdi-table-large</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Trading History</v-list-item-title>
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
            <v-list-item target="_" href="#" exact class="my-2">
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
      fixed
      flat
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title class="text-h5 font-weight-bold" v-text="title" />
        <v-spacer />
        <v-btn v-show="false" icon class="mr-2">
            <v-icon>mdi-translate</v-icon>
        </v-btn>
        <ThemeToggle />
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
      <v-container fluid>
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
</v-app>
</template>
<style scoped>
.v-list-item .v-list-item__title{
    font-weight:700;
}
</style>
<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            right: true,
            rightDrawer: false,
            buttomNav: 'home'
        }
    },
    computed: {
        title() {
            return this.$store.state.title
        },
        user() {
            return this.$store.state.authUser
        }
    },
    methods: {
        logout() {
            this.$fire.auth.signOut().then(() => {
                this.$router.push('/signin')
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {
      if (!this.$vuetify.breakpoint.mobile) {
        this.drawer = true
      }
    }
}
</script>
