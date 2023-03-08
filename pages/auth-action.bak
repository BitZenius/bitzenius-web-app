<template>
  <div class="app" v-if="config">
    <v-row no-gutters class="noGutters">
      <v-col cols="12" md="8" class="d-none d-sm-flex"> </v-col>
      <v-col cols="12" md="4">
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
            <v-form class="mt-10" ref="form">
              <div class="text-center mb-5">{{ title }}</div>
              <v-row v-if="config.mode == 'resetPassword'">
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    outlined
                    class="mb-2"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                    label="Re-type Password"
                    outlined
                    class="mb-2"
                    type="password"
                  ></v-text-field>
                  <v-btn
                    :loading="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    x-large
                    class="text-capitalize basic-text--text"
                    depressed
                    @click.stop="handleResetPassword"
                  >
                    Change Password
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-else-if="config.mode == 'verifyEmail'">
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
              </v-row>
              <v-row v-if="message">
                <v-col cols="12" class="text-center">
                  <p class="mt-5">{{ message }}</p>
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
import {
  getAuth,
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

export default {
  layout: "default",
  data: () => ({
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

    switch (config.mode) {
      case "verifyEmail":
        this.title = "Verify your email";
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
          this.message = "Redirecting to home...";
          this.goToHome(this.config.continueUrl);
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

.app {
  background-image: url("/background.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
