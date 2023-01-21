<template>
  <div class="app">
    <v-row
      no-gutters
      class="noGutters"
    >
      <v-col
        cols="12"
        md="8"
        class="d-none d-sm-flex"
      >
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <div
          class="cardColor"
          elevation="8"
        >
          <div
            class="pa-md-12 pa-8"
          >
            <v-img
              :src="$vuetify.theme.dark ? '/bitzenius-logo-white.png' : '/bitzenius-logo.png'"
              height="32"
              contain
              position="center"
            />
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="mt-10"
            >
              <div class="text-center my-5">
                Don’t you have an account? <a @click="$router.push('/signup')">Sign up</a>
              </div>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    outlined
                    required
                  />
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    label="Password"
                    outlined
                    required
                  />
                  <v-btn
                    :loading="isLoading"
                    :disabled="isLoading"
                    style="width: 100%"
                    color="primary"
                    x-large
                    class="text-capitalize"
                    depressed
                    @click.stop="signIn"
                  >
                    Sign in
                  </v-btn>
                </v-col>
              </v-row>
              <div
                class="text-center subtitle-1 my-2"
              >
                OR
              </div>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-btn
                    style="width: 100%"
                    color="error"
                    x-large
                    class="text-capitalize mb-10"
                    depressed
                    outlined
                    @click.stop="googleSignin"
                  >
                    <v-icon
                      left
                    >
                      mdi-google
                    </v-icon>
                    Sign in with Google
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
          <MiniFooter />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be greater than 8 characters'
    ],
    isLoading: false
  }),
  head: {
    title: 'Login'
  },
  computed: {
    isLoggedIn () {
      return true
      // return this.$store.getters.isLoggedIn
    }
  },
  watch: {
    isLoggedIn (val) {
      val && this.$router.push('/')
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()

      if (this.valid) {
        this.$router.push('/')
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    signIn () {
      this.isLoading = true
      this.$fire.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      ).then((r) => {
        this.isLoading = false
        this.$router.go({ path: '/' })
      }).catch((e) => {
        alert(e)
      }).finally(() => {
        this.isLoading = false
      })
    },
    async googleSignin () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      await this.$fire.auth.signInWithRedirect(provider)
    }
  }
}
</script>

<style>
  .noGutters {
    height: 100%;
  }

  .cardColor {
    background-color: rgba(49, 45, 75, 0.9) !important;
    border-color: white !important;
    height: 100%;
  }

  .app {
    background-image: url('/background.jpg');
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
