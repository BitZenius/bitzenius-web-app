<template>
  <div class="app">
    <v-row
      no-gutters
      class="noGutters"
    >
      <v-col
        cols="12"
        md="9"
        class="d-none d-sm-flex"
      >
      </v-col>
      <v-col
        cols="12"
        md="3"
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
              height="64"
              contain
              position="center"
            />
            <v-form class="mt-10">
              <div class="text-center mb-5">Already have an account? <a @click="$router.push('/signin')">Log in</a></div>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Full Name"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    outlined
                  ></v-text-field>
                  <v-btn
                    style="width: 100%"
                    color="primary"
                    x-large
                    class="text-capitalize"
                    depressed
                    @click.stop="signUp"
                  >
                    Sign Up
                  </v-btn>
                </v-col>
              </v-row>
              <div class="text-center subtitle-1 my-2">OR</div>
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
    isLoading: false
  }),
  head: {
    title: 'Daftar'
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
      this.isLoading = true
      this.$fire.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      ).then((userCredential) => {
        this.updateProfile()
      }).catch((e) => {
        alert(e)
      }).finally(() => {
        this.isLoading = false
      })
    },
    updateProfile () {
      const photo = 'https://cdn.vuetifyjs.com/images/john.jpg'
      const user = this.$fire.auth.currentUser
      this.isLoading = true
      user.updateProfile({
        displayName: this.name,
        photoURL: photo
      }).then(async () => {
        await this.$store.commit('setUser', {
          displayName: this.name,
          photoURL: photo
        })

        this.isLoading = false
        this.$router.go({ path: '/' })
      }).catch((err) => {
        console.warn(err)
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
