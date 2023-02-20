<template>
  <div :class="$vuetify.theme.dark ? 'app dark ' : 'app'">
    <v-row no-gutters class="pa-10 noGutters" align="center">
      <v-col cols="12" md="7"> </v-col>
      <v-col cols="12" md="5" style="z-index: 2">
        <v-row class="pa-8 basic-text--text main-card" justify="start">
          <v-col cols="12" style="max-width: 80%" class="mb-4">
            <div class="text-h4 font-weight-bold decorated-text">
              Create new account.
            </div>
          </v-col>

          <v-col cols="12">
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    validate-on-blur
                    placeholder="Full name"
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                    dense
                    prepend-inner-icon="$vuetify.icons.UserIcon"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    validate-on-blur
                    placeholder="Email"
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                    dense
                    prepend-inner-icon="$vuetify.icons.MailIcon"
                  >
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
                    validate-on-blur
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                    dense
                    prepend-inner-icon="$vuetify.icons.LockIcon"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="referral"
                    required
                    placeholder="Referral code"
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                    dense
                    prepend-inner-icon="$vuetify.icons.ReferralIcon"
                  >
                  </v-text-field>

                  <span class="px-4 mt-3"
                    >How did you hear about BitZenius?</span
                  >
                  <v-select
                    v-model="hearAboutModel"
                    :items="hearAboutItems"
                    @change="onHearAboutSelected(hearAboutModel)"
                    placeholder="Select one..."
                    item-text="name"
                    item-value="value"
                    required
                    solo
                    flat
                    rounded
                  >
                  </v-select>
                  <v-text-field
                    v-if="showHearAboutText"
                    v-model="hearAbout"
                    required
                    placeholder="Ex: From a TV show"
                    rounded
                    class="mb-2 custom-input py-2"
                    color="black"
                  >
                  </v-text-field>
                  <v-row justify="center">
                    <v-col cols="11">
                      <v-checkbox
                        v-model="checkbox"
                        :rules="[(v) => !!v || 'You must agree to continue!']"
                        required
                      >
                        <template v-slot:label>
                          <span class="text-body-1"
                            >By checking the checkbox you're agree on our policy
                            <a class="customGreen--text" href="#"
                              >read more about the ToS</a
                            ></span
                          >
                        </template>
                      </v-checkbox>
                    </v-col>
                  </v-row>

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
          <v-col cols="12" v-if="false">
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
      :src="require('assets/images/bitzy loginpage.png')"
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
    showHearAboutText: false,
    hearAbout: null,
    hearAboutModel: null,
    hearAboutItems: [
      { name: "Google Ads", value: "google_ads" },
      { name: "Google Search", value: "google_search" },
      { name: "Article", value: "article" },
      { name: "Instagram", value: "instagram" },
      { name: "Twitter", value: "twitter" },
      { name: "Youtube", value: "youtube" },
      { name: "Friends", value: "friends" },
      { name: "Others", value: "others" },
    ],
  }),
  head: {
    title: "Signup",
  },
  mounted() {
    this.referral = this.$route.query.referral;
  },
  methods: {
    onHearAboutSelected(value) {
      switch (value) {
        case "others":
          this.hearAbout = "";
          this.showHearAboutText = true;
          break;
        default:
          this.hearAbout = value;
          this.showHearAboutText = false;
          break;
      }
    },
    findHearAboutDesc(value) {
      var findValue = this.hearAboutItems.find((e) => e.value === value);
      var res = "";

      if (!findValue) {
        return null;
      }

      if (findValue.name == "Others") {
        res = this.hearAbout;
      } else {
        res = findValue.name;
      }

      return res;
    },
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
      if (valid) {
        var hearAboutDict = {
          value: this.hearAboutModel,
          description: this.findHearAboutDesc(this.hearAboutModel),
        };

        this.$api
          .$post("/user/auth/signup", {
            name: this.name,
            email: this.email,
            password: this.password,
            referral: this.referral,
            hearAbout: hearAboutDict,
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
  width: 60px;
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
  width: 100%;
  height: 100%;
  border-radius: 20px;
  top: 45%;
  left: 32%;
  transform: translate(-50%, -50%);
  z-index: 1;
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


