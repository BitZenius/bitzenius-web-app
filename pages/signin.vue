<template>
  <div class="app">
    <v-overlay absolute :value="isLoading" opacity="0.8" class="text-center">
      <v-progress-circular
        indeterminate
        color="customGreen"
        size="50"
        width="7"
      />
      <p v-if="loadingText" class="mt-3">{{ loadingText }}</p>
    </v-overlay>
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
        <v-alert
            v-if="message"
            tile
            :color="message.color"
          >
            <v-row>
              <v-col class="grow">
                {{ message.text }}
              </v-col>
              <v-col class="shrink">
                <v-btn
                  icon
                  @click.stop = "message = null"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
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
              v-if="showOtp"
              v-model="valid"
              lazy-validation
              class="mt-10"
            >
              <div class="text-center my-5">
                Please input verification code that we've sent to your {{ otpMethod }} account
              </div>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-otp-input
                    v-model="otpCode"
                    length="6"
                    light
                    type="number"
                    :disabled="isLoading"
                    @finish="onOtpCompleted"
                  />
                </v-col>
              </v-row>
            </v-form>
            <v-form
              v-else
              ref="form"
              v-model="valid"
              lazy-validation
              class="mt-10"
            >
              <div class="text-center my-5">
                Does not have an account? <a class="white--text" @click="$router.push('/signup')"><b>Sign up</b></a>
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
                    class="mb-2"
                  />
                  <v-text-field
                    v-model="password"
                    :value="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    :rules="passwordRules"
                    label="Password"
                    outlined
                    required
                    class="mb-2"
                    @click:append="show1 = !show1"
                  />
                  <v-btn
                    :loading="isLoading"
                    :disabled="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    x-large
                    class="text-capitalize black--text"
                    depressed
                    @click.stop="signIn"
                  >
                    Sign in
                  </v-btn>
                  <p class="mt-5 text-center">Forgot your password? Click <router-link class="white--text" to="/forgot-password">here</router-link></p>
                </v-col>
              </v-row>
              <div
                v-show="false"
                class="text-center subtitle-1 my-2"
              >
                OR
              </div>
              <v-row
                v-show="false"
              >
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
    show1: false,
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
    isLoading: false,
    showOtp: false,
    otpCode: null,
    message: null,
    loadingText: null,
    otpMethod: ''
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
      this.loadingText = 'Please wait...'
      this.$api.$post('/user/auth/signin', {
        email: this.email,
        password: this.password
      }).then((result) => {
        console.log('result login', result);
        if (result.method == 'token') {
          this.$fire.auth.signInWithCustomToken(result.token).then((r) => {
            console.log(r)
            this.$router.go({ path: '/' })
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            this.isLoading = false
          })
        } else {
          // show otp
          this.loadingText = ''
          this.isLoading = false
          this.showOtp = true
          this.otpMethod = result.method
        }
      }).catch((err) => {
        console.log(err.response)
        if(err.response.data.not_verified){
          return this.$router.go('/verification');
        }else{
          this.message = {
            text: 'Invalid credentials. Please try again',
            color: 'error'
          }
        }
      }).finally(() => {
        this.loadingText = ''
        this.isLoading = false
      })
    },
    async googleSignin () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      await this.$fire.auth.signInWithRedirect(provider)
    },
    onOtpCompleted (result) {
      this.isLoading = true
      this.loadingText = 'Verifying OTP. Please wait...'
      this.$api.$post('/user/auth/otp-verify', {
        otp: result
      }).then((result) => {
        if (result.token) {
          this.message = null
          this.otpCode = ''
          this.isLoading = true
          this.loadingText = 'Verification success. Logging in...'
          this.$fire.auth.signInWithCustomToken(result.token).then((r) => {
            console.log(r)
            this.otpCode = ''
            this.$router.go({ path: '/' })
          }).catch((e) => {
            console.log(e)
            this.loadingText = ''
            this.isLoading = false
          })
        } else {
          this.otpCode = ''
          this.message = {
            text: 'Your OTP code is invalid purpose',
            color: 'error'
          }
        }
      }).catch((err) => {
        console.log(err)
        this.otpCode = ''
        this.message = {
          text: 'Your OTP code is wrong. Please try again',
          color: 'error'
        }
      }).finally(() => {
        this.loadingText = ''
        this.isLoading = false
      })
    }
  }
}
</script>

<style>
  .noGutters {
    height: 100%;
  }

  .cardColor {
    background-color: rgba(51, 148, 248, 0.9) !important;
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
