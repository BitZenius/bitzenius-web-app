<template>
  <div class="app">
    <v-row no-gutters class="pa-10 noGutters" align="center">
      <v-col cols="12" md="7"> </v-col>
      <v-col cols="12" md="5">
        <v-row class="pa-8 black--text main-card" justify="start">
          <v-col cols="12" style="max-width: 80%" class="mb-8">
            <div class="text-h4 font-weight-bold decorated-text">
              Create new account.
            </div>
          </v-col>

          <v-col cols="12">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    placeholder="Full name"
                    hide-details
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-4 black--text"
                        >mdi-arrow-up-circle</v-icon
                      >
                    </template>
                  </v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    placeholder="Email"
                    hide-details
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-4 black--text"
                        >mdi-arrow-up-circle</v-icon
                      >
                    </template>
                  </v-text-field>
                  <v-text-field
                    v-model="password"
                    :value="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    :rules="passwordRules"
                    required
                    @click:append="show1 = !show1"
                    placeholder="Password"
                    hide-details
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-4 black--text"
                        >mdi-arrow-up-circle</v-icon
                      >
                    </template>
                  </v-text-field>
                  <v-text-field
                    v-model="referral"
                    required
                    placeholder="Referral code"
                    hide-details
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon class="mr-4 black--text"
                        >mdi-arrow-up-circle</v-icon
                      >
                    </template>
                  </v-text-field>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    required
                  >
                    <template v-slot:label>
                      <span
                        >By checking the checkbox you're agree on our policy
                        <a class="customGreen--text" href="#"
                          >read more about the ToS</a
                        ></span
                      >
                    </template>
                  </v-checkbox>
                  <base-button-animated
                    :disabled="!checkbox"
                    style="width: 100%"
                    color="customGreen"
                    depressed
                    @click.native="signUp"
                    class="mt-5"
                    :text="'Sign Up'"
                  ></base-button-animated>
                </v-col>
                <v-col cols="12">
                  <div class="my-5 font-weight-bold">
                    Already have an account?
                    <a class="primary--text" @click="$router.push('/signin')"
                      ><b>Log in</b></a
                    >
                  </div>
                </v-col>
              </v-row>
              <div v-show="false" class="text-center subtitle-1 my-2">OR</div>
              <v-row v-show="false">
                <v-col cols="12">
                  <v-btn
                    style="width: 100%"
                    color="error"
                    x-large
                    class="text-capitalize mb-10"
                    depressed
                    outlined
                    @click.stop="googleSignin"
                  >
                    <v-icon left> mdi-google </v-icon>
                    Sign up with Google
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col cols="12" v-if="message">
            <v-alert
              transition="slide-y-transition"
              rounded
              v-show="message"
              :color="message.color"
            >
              <v-row>
                <v-col class="grow">
                  {{ message.text }}
                </v-col>
                <v-col class="shrink">
                  <v-btn icon @click.stop="message = null">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
          <v-col cols="12">
            <div class="font-weight-bold">
              By registering, you agree to the
              <a class="primary--text" @click="$router.push('/signin')"
                ><b>Terms of Use</b></a
              >
              and
              <a class="primary--text" @click="$router.push('/signin')"
                ><b>Privacy Policy</b></a
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- ORNAMENTS -->
    <v-img
      :src="
        $vuetify.theme.dark
          ? '/bitzenius-logo-white.png'
          : '/bitzenius-logo-white.png'
      "
      height="32"
      contain
      position="left"
      class="header"
    />
    <v-img class="ornament-1" src="/images/signin-vector.svg"></v-img>
    <v-img class="ornament-2" src="/images/dot-ornament.svg"></v-img>
    <v-img
      class="ornament-3"
      :src="require('assets/images/bitzy trading.png')"
      contain
    ></v-img>
    <div class="text-subtitle white--text footer">
      ©2023 - BitZenius. All rights reserved.
    </div>
    <!-- ORNAMENTS END -->
  </div>
</template>

<script>
export default {
  layout: "default",
  data: () => ({
    show1: false,
    checkbox: false,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Name must be greater than 3 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
    referral: "",
    isLoading: false,
    message: null,
  }),
  head: {
    title: "Signup",
  },
  mounted() {
    this.referral = this.$route.query.referral;
  },
  methods: {
    validate() {
      this.$refs.form.validate();

      if (this.valid) {
        this.$router.go({ path: "/" });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    signUp() {
      const valid = this.$refs.form.validate();
      alert(valid);

      if (valid) {
        this.$api
          .$post("/user/auth/signup", {
            name: this.name,
            email: this.email,
            password: this.password,
            referral: this.referral,
          })
          .then((result) => {
            this.isLoading = true;
            this.$fire.auth
              .signInWithEmailAndPassword(this.email, this.password)
              .then((r) => {
                this.isLoading = false;
                this.$router.go({ path: "/" });
              })
              .catch((e) => {
                alert(e);
              })
              .finally(() => {
                this.isLoading = false;
              });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = true;
          });
      }
    },
    async googleSignin() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      await this.$fire.auth.signInWithRedirect(provider);
    },
  },
};
</script>

<style>
.noGutters {
  height: 100vh;
}

.cardColor {
  background-color: rgba(51, 148, 248, 1) !important;
  border-color: white !important;
  height: 100%;
}

.app {
  background: linear-gradient(
    90deg,
    rgba(51, 148, 248, 1) 45%,
    rgba(255, 255, 255, 1) 45%
  );
  height: 100%;
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  overflow-y: hidden;
}
.decorated-text {
  position: relative;
}
.decorated-text::after {
  content: "";
  min-height: 8px;
  min-width: 60px;
  position: absolute;
  background: #c3f239;
  color: #c3f239;
  border-radius: 20px;
  top: 110%;
  left: 1%;
}

.ornament-1 {
  position: absolute;
  width: 55%;
  left: -18%;
  top: 30%;
}
.ornament-2 {
  position: absolute;
  width: 7.5%;
  right: 0%;
  bottom: 0%;
}
.ornament-3 {
  position: absolute;
  width: 20%;
  height: 50%;
  border-radius: 20px;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
}
.footer {
  position: absolute;
  left: 2%;
  bottom: 2%;
}
.header {
  position: absolute;
  left: 2%;
  top: 5%;
}
.custom-input {
  background-color: #f4f7fd;
}

.custom-input.v-input .v-input__slot {
  color: black !important;
}

.main-card {
  margin-left: 20px;
  max-width: 90%;
}
</style>
