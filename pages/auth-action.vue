<template>
  <div class="app off-white" v-if="config">
    <v-card
      class="verification-card d-flex justify-center pa-5 pb-10"
      color="off-white-3"
    >
      <v-card-text
        style="text-align: left"
        class="d-flex flex-column justify-center align-center pa-0"
      >
        <v-img
          :src="
            $vuetify.theme.dark
              ? '/bitzenius-logo-white.png'
              : '/bitzenius-logo-white.png'
          "
          width="240"
          contain
        />
        <lottie
          :width="180"
          :height="180"
          :options="lottieOptions"
          v-on:animCreated="handleAnimation"
        />
        <v-form class="mt-10" ref="form">
          <div class="text-center mb-5">
            <h1 class="primary-text--text">{{ title }}</h1>
          </div>
          <v-row v-if="config.mode == 'resetPassword'">
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :value="password"
                placeholder="Password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                :rules="passwordRules"
                dense
                required
                @click:append="show1 = !show1"
                rounded
                class="mb-2 custom-input py-2"
                prepend-inner-icon="$vuetify.icons.LockIcon"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                :value="confirmPassword"
                placeholder="Confirm Password"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                :rules="confirmPasswordRules"
                dense
                required
                @click:append="show2 = !show2"
                rounded
                class="mb-2 custom-input py-2"
                prepend-inner-icon="$vuetify.icons.LockIcon"
              ></v-text-field>
              <v-btn
                :loading="isLoading"
                style="width: 100%"
                color="primary"
                x-large
                class="text-capitalize"
                depressed
                @click.stop="handleResetPassword"
              >
                Change Password
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-else-if="config.mode == 'unlockDevice'"> </v-row>
          <!-- <v-row v-else-if="config.mode == 'verifyEmail'">
            <v-col cols="12">
              <v-btn
                :loading="isLoading"
                :disabled="isLoading"
                style="width: 100%"
                color="customGreen"
                x-large
                class="text-capitalize basic-text--text"
                depressed
                @click.stop="handleVerifyEmail"
              >
                Verify Now
              </v-btn>
            </v-col>
          </v-row> -->
          <v-row v-if="message">
            <v-col cols="12" class="text-center">
              <p class="mt-5">{{ message }}</p>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- <v-col cols="12" md="4">
        <div class="cardColor" elevation="8">
          <div class="pa-md-12 pa-8">
            <v-img
              :src="
                $vuetify.theme.dark
                  ? '/bitzenius-logo-white.png'
                  : '/bitzenius-logo.png'
              "
              height="32"
              contain
              position="center"
            />

          </div>
          <MiniFooter />
        </div>
      </v-col> -->
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/email-verifying.json";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

export default {
  layout: "default",
  components: {
    lottie,
  },
  data: () => ({
    show1: false,
    show2: false,
    config: null,
    auth: null,
    isLoading: false,
    title: "",
    email: null,
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
    ],
    confirmPassword: "",
    message: null,
    // LOTTIE
    anim: null, // for saving the reference to the animation
    lottieOptions: { animationData: animationData.default },
  }),
  head: {
    title: "Auth Action",
  },
  computed: {
    confirmPasswordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
          "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
        (v) => v === this.password || "Senhas diferentes!",
      ];
    },
    user() {
      return this.$store.state.authUser;
    },
    subscription() {
      return this.$store.state.subscription;
    },
  },
  mounted() {
    const config = {
      mode: this.$route.query.mode,
      oobCode: this.$route.query.oobCode,
      apiKey: this.$route.query.apiKey,
      continueUrl: this.$route.query.continueUrl,
      lang: this.$route.query.lang,
      email: this.$route.query.email,
    };

    const app = !getApps().length ? initializeApp(config) : getApp();
    const auth = getAuth(app);

    this.auth = auth;
    this.config = config;

    console.log("config", config);
    console.log("routeQuery", this.$route.query);
    switch (config.mode) {
      case "verifyEmail":
        this.title = "Verifying your email..";
        this.handleVerifyEmail();
        break;
      case "unlockDevice":
        this.title = "Unlocking your device..";
        this.handleUnlockDevice();
        break;
      case "resetPassword":
        this.title = "Reset your password";
        break;
      case "recoverEmail":
        this.title = "Recover your email";
        break;
      default:
        this.message = "Redirecting to home...";
        this.goToHome("/");
        break;
    }
  },
  methods: {
    // TRIGGER
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    handleUnlockDevice() {
      let id = this.$route.query.id ? this.$route.query.id : null;
      if (!id) {
        this.message =
          "Unable to unlock your device, please make sure you did it correctly!";
        return;
      }
      console.log("id", id);
      this.$api
        .$get("/user/auth/unlock", {
          params: {
            id,
          },
        })
        .then((res) => {
          console.log("res unlock", res);
          this.message = "Device unlock success. Redirecting to home...";
          setTimeout(() => {
            this.$router.push("/");
          }, 3000);
        })
        .catch((err) => {
          this.message = err;
        });
    },
    handleVerifyEmail() {
      this.isLoading = true;
      applyActionCode(this.auth, this.config.oobCode)
        .then(() => {
          const currentEmail = this.user ? this.user.email : this.config.email;

          this.$api
            .$post("/user/auth/verify", {
              email: currentEmail,
            })
            .then((result) => {
              console.log(result);
              this.message =
                "Email verification success. Redirecting to home...";
              this.goToHome(this.config.continueUrl);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.message =
            "Authentication link already used, please use the latest verification url or resend verification email. Redirecting...";
          setTimeout(() => {
            this.$router.push("/verification");
          }, 3000);
        });
    },
    handleResetPassword() {
      const valid = this.$refs.form.validate();

      if (valid) {
        this.isLoading = true;
        verifyPasswordResetCode(this.auth, this.config.oobCode)
          .then((email) => {
            confirmPasswordReset(this.auth, this.config.oobCode, this.password)
              .then(() => {
                this.$fire.auth
                  .signInWithEmailAndPassword(email, this.password)
                  .then((r) => {
                    this.message =
                      "Password changed successfully. Redirecting to home...";
                    this.goToHome(this.config.continueUrl);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    goToHome(url) {
      setTimeout(() => {
        window.location = url;
      }, 2000);
    },
  },
};
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

.verification-card {
  position: absolute;
  width: 50%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.app {
  /* background-image: url("/background.jpg"); */
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
