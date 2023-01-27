<template>
  <div class="app" v-if="config">
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
            <v-form class="mt-10" ref="form">
              <div class="text-center mb-5">{{ title }}</div>
              <v-row v-if="config.mode == 'resetPassword'">
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    outlined
                    class="mb-2"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                    label="Re-type Password"
                    outlined
                    class="mb-2"
                  ></v-text-field>
                  <v-btn
                    :loading="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    x-large
                    class="text-capitalize black--text"
                    depressed
                    @click.stop="handleResetPassword"
                  >
                    Change Password
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-else-if="config.mode == 'verifyEmail'">
                <v-col
                  cols="12"
                >
                  <v-btn
                    :loading="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    x-large
                    class="text-capitalize black--text"
                    depressed
                    @click.stop="handleVerifyEmail"
                  >
                    Verify Now
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-else-if="config.mode == 'requestEmailVerify'">
                <v-col
                  cols="12"
                >
                  <v-btn
                    :loading="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    x-large
                    class="text-capitalize black--text"
                    depressed
                    @click.stop="requestVerifyEmail"
                  >
                    Send Verification
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
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

export default {
  layout: 'default',
  data: () => ({
    config: null,
    auth: null,
    isLoading: false,
    title: '',
    email: null,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
    ],
    confirmPassword: '',
    message: null
  }),
  head: {
    title: 'Auth Action'
  },
  computed: {
    confirmPasswordRules() {
      return [
        (v) => !!v || 'Senha não informada',
        (v) => (v && v.length >= 8) || 'A senha deve ter no mínimo 8 caracteres',
        (v) => (v === this.password) || 'Senhas diferentes!',
      ];
    },
    user() {
      return this.$store.state.authUser
    },
    subscription() {
      return this.$store.state.subscription
    }
  },
  mounted () {
    const config = {
      mode: this.$route.query.mode,
      oobCode: this.$route.query.oobCode,
      apiKey: this.$route.query.apiKey,
      continueUrl: this.$route.query.continueUrl,
      lang: this.$route.query.lang,
      email: this.$route.query.email
    }

    const app = !getApps().length ? initializeApp(config) : getApp()
    const auth = getAuth(app)

    this.auth = auth
    this.config = config

    switch (config.mode) {
      case 'verifyEmail':
        this.title = 'Verify your email'
        break
      case 'requestVerifyEmail':
        this.title = 'Request verify email'
        break
      case 'resetPassword':
        this.title = 'Reset your password'
        break
      case 'recoverEmail':
        this.title = 'Recover your email'
        break
      default:
        // this.$router.push('/')
        break
    }
  },
  methods: {
    handleVerifyEmail () {
      this.isLoading = true
      applyActionCode(this.auth, this.config.oobCode).then(() => {
        this.$api.$post('/user/auth/verify', {
          email: this.config.email
        }).then((result) => {
          this.message = result.message
          this.$router.go({ path: '/' })
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.isLoading = true
        })
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.isLoading = false
      })
    },
    requestVerifyEmail () {
      this.isLoading = true
      this.$api.$post('/user/auth/verify', {
        email: this.user.email
      }).then((result) => {
        console.log(result)
        // this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.isLoading = false
      })
    },
    handleResetPassword () {
      const valid = this.$refs.form.validate()

      if (valid) {
        verifyPasswordResetCode(this.auth, this.config.oobCode).then((email) => {
          confirmPasswordReset(this.auth, this.config.oobCode, this.password).then(() => {
            this.isLoading = true
            this.$fire.auth.signInWithEmailAndPassword(
              email,
              this.password
            ).then((r) => {
              this.$router.go({ path: '/' })
            }).catch((e) => {
              alert(e)
            }).finally(() => {
              this.isLoading = false
            })
          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => {
          console.log(error)
        })
      }
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
