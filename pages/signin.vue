<template>
  <div :class="$vuetify.theme.dark ? 'app dark ' : 'app'">
    <v-overlay absolute :value="isLoading" opacity="0.8" class="text-center">
      <v-progress-circular
        indeterminate
        color="customGreen"
        size="50"
        width="7"
      />
      <p v-if="loadingText" class="mt-3">{{ loadingText }}</p>
    </v-overlay>

    <v-row no-gutters class="pa-10 noGutters" align="center">
      <v-col cols="12" md="7"> </v-col>
      <v-col cols="12" md="5">
        <v-row class="pa-8 basic-text--text main-card" justify="start">
          <v-col cols="12" style="max-width: 80%" class="mb-8">
            <div class="text-h4 font-weight-bold decorated-text">
              Sign in to your account.
            </div>
          </v-col>

          <v-col cols="12">
            <v-form v-if="showOtp" v-model="valid" lazy-validation>
              <div class="text-center my-5">
                Verify your account by entering the 4 digits code we sent to
                ****@mail.com
                {{ otpMethod }}
              </div>
              <v-row>
                <v-col cols="12">
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
            <v-form v-else ref="form" v-model="valid" lazy-validation>
              <v-row class="basic-text--text">
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    required
                    placeholder="Email..."
                    dense
                    rounded
                    class="mb-2 custom-input py-2"
                    prepend-inner-icon="$vuetify.icons.MailIcon"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="password"
                    :value="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    :rules="passwordRules"
                    dense
                    required
                    @click:append="show1 = !show1"
                    rounded
                    class="mb-2 custom-input py-2"
                    prepend-inner-icon="$vuetify.icons.LockIcon"
                  >
                  </v-text-field>
                  <p class="mt-5 mb-10">
                    <router-link
                      class="
                        font-weight-bold
                        primary--text
                        text-decoration-none
                      "
                      to="/forgot-password"
                      >Forgot your password?
                    </router-link>
                  </p>
                  <base-button-animated
                    :loading="isLoading"
                    :disabled="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    depressed
                    @click.native="signIn"
                    class="mt-5"
                    :text="'Sign in'"
                  ></base-button-animated>
                  <!-- <v-btn
                    :loading="isLoading"
                    :disabled="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    x-large
                    class="text-capitalize basic-text--text"
                    depressed
                    @click.stop="signIn"
                  >
                    Sign in
                  </v-btn> -->
                </v-col>
                <v-col cols="12">
                  <div class="my-5 font-weight-bold">
                    Does not have an account?
                    <a class="primary--text" @click="$router.push('/signup')"
                      ><b>Sign up</b></a
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
                    Sign in with Google
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
      width="650"
      class="ornament-3"
      :src="require('assets/images/bitzy trading.png')"
      contain
    ></v-img>
    <div class="text-subtitle white--text footer d-flex flex-column">
      <div>
        Download our app
        <div class="my-5">
          <v-btn plain :ripple="false" class="white--text pa-0">
            <v-img contain :src="require('@/assets/images/AS128.png')"></v-img>
          </v-btn>
          <v-btn plain :ripple="false" class="white--text pa-0">
            <v-img contain :src="require('@/assets/images/GP128.png')"></v-img>
          </v-btn>
        </div>
      </div>
      ©2023 - BitZenius. All rights reserved.
    </div>
    <!-- ORNAMENTS END -->
  </div>
</template>

<script>
import BaseButtonAnimated from "~/components/Base/BaseButtonAnimated.vue";
export default {
  components: { BaseButtonAnimated },
  layout: "default",
  data: () => ({
    show1: false,
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Password must be greater than 8 characters",
    ],
    isLoading: false,
    showOtp: false,
    otpCode: null,
    message: null,
    loadingText: null,
    otpMethod: "",
  }),
  head: {
    title: "Sign In",
  },
  computed: {
    isLoggedIn() {
      return true;
      // return this.$store.getters.isLoggedIn
    },
  },
  watch: {
    isLoggedIn(val) {
      val && this.$router.push("/");
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();

      if (this.valid) {
        this.$router.push("/");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    signIn() {
      this.isLoading = true;
      this.loadingText = "Please wait...";
      this.$api
        .$post("/user/auth/signin", {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          console.log("result login", result);
          if (result.method == "token") {
            this.$fire.auth
              .signInWithCustomToken(result.token)
              .then((r) => {
                console.log(r);
                this.$router.go({ path: "/" });
              })
              .catch((e) => {
                console.log(e);
              })
              .finally(() => {
                this.isLoading = false;
              });
          } else {
            // show otp
            this.loadingText = "";
            this.isLoading = false;
            this.showOtp = true;
            this.otpMethod = result.method;
          }
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.not_verified) {
            return this.$router.go("/verification");
          } else {
            this.message = {
              text: "Invalid credentials. Please try again",
              color: "error",
            };
          }
        })
        .finally(() => {
          this.loadingText = "";
          this.isLoading = false;
        });
    },
    async googleSignin() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      await this.$fire.auth.signInWithRedirect(provider);
    },
    onOtpCompleted(result) {
      this.isLoading = true;
      this.loadingText = "Verifying OTP. Please wait...";
      this.$api
        .$post("/user/auth/otp-verify", {
          otp: result,
        })
        .then((result) => {
          if (result.token) {
            this.message = null;
            this.otpCode = "";
            this.isLoading = true;
            this.loadingText = "Verification success. Logging in...";
            this.$fire.auth
              .signInWithCustomToken(result.token)
              .then((r) => {
                console.log(r);
                this.otpCode = "";
                this.$router.go({ path: "/" });
              })
              .catch((e) => {
                console.log(e);
                this.loadingText = "";
                this.isLoading = false;
              });
          } else {
            this.otpCode = "";
            this.message = {
              text: "Your OTP code is invalid purpose",
              color: "error",
            };
          }
        })
        .catch((err) => {
          console.log(err);
          this.message = {
            text: "Invalid credentials. Please try again",
            color: "error",
          };
        })
        .finally(() => {
          this.loadingText = "";
          this.isLoading = false;
        });
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

.app.dark {
  background: linear-gradient(90deg, #1d1f2b 45%, #212434 45%);
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
.custom-input > .v-input__control > .v-input__slot > .v-input__prepend-inner {
  margin-right: 10px !important;
}
.main-card {
  margin-left: 20px;
  max-width: 90%;
}
</style>
