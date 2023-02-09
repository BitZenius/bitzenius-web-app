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
            <v-form class="mt-10" ref="form">
              <div class="text-center mb-5">Already have an account? <a class="white--text" @click="$router.push('/signin')"><b>Log in</b></a></div>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Full Name"
                    outlined
                    class="mb-2"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    outlined
                    class="mb-2"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    outlined
                    class="mb-2"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="referral"
                    label="Referral Code"
                    outlined
                    class="mb-2"
                  ></v-text-field>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    required
                  >
                    <template v-slot:label>
                      <span>By checking the checkbox you're agree on our policy <a class="customGreen--text" href="#">read more about the ToS</a></span>
                    </template>
                  </v-checkbox>
                  <v-btn
                    :disabled="!checkbox"
                    style="width: 100%"
                    color="customGreen"
                    x-large
                    class="text-capitalize black--text"
                    depressed
                    @click.stop="signUp"
                  >
                    Sign Up
                  </v-btn>
                </v-col>
              </v-row>
              <div v-show="false" class="text-center subtitle-1 my-2">OR</div>
              <v-row v-show="false">
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
                    Sign up with Google
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
    checkbox:false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length >= 3) || 'Name must be greater than 3 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
    ],
    referral: '',
    isLoading: false
  }),
  head: {
    title: 'Signup'
  },
  mounted () {
    this.referral = this.$route.query.referral
  },
  methods: {
    validate () {
      this.$refs.form.validate()

      if (this.valid) {
        this.$router.go({ path: '/' })
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    signUp () {
      const valid = this.$refs.form.validate()
      
      if (valid) {
        this.$api.$post('/user/auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          referral: this.referral
        }).then((result) => {
          this.isLoading = true
          this.$fire.auth.signInWithEmailAndPassword(
            this.email,
            this.password
          ).then((r) => {
            this.isLoading = false
            this.$router.go({ path: '/verification' })
          }).catch((e) => {
            alert(e)
          }).finally(() => {
            this.isLoading = false
          })
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          this.isLoading = true
        })
      }
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
