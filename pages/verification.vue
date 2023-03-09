<template>
  <div :class="$vuetify.theme.dark ? 'app dark ' : 'app'">
    <v-card class="verification-card d-flex justify-center" color="off-white-3">
      <v-card-text
        style="text-align: left"
        class="d-flex flex-column align-center pa-0"
      >
        <lottie
          :width="200"
          :height="200"
          :options="lottieOptions"
          v-on:animCreated="handleAnimation"
        />
        <h3 class="basic-text--text">
          {{ message }}
        </h3>
        <div class="d-flex justify-center align-center mt-4">
          <v-btn
            :loading="isLoading"
            depressed
            rounded
            class="primary white--text text-capitalize"
            @click.stop="sendEmailVerification"
          >
            {{ buttonText }}
          </v-btn>
          <!-- <v-btn
            @click="logout"
            depressed
            rounded
            color="customPink"
            class="text-capitalize ml-2"
          >
            Logout
          </v-btn> -->
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/email-sent.json";

export default {
  layout: "default",
  components: {
    lottie,
  },
  data: () => ({
    isLoading: false,
    emailSent: false,
    message:
      "A verification link has been sent to your inbox. Please ensure to check your spam folder as well",
    buttonText: "Resend Email",
    // LOTTIE
    anim: null, // for saving the reference to the animation
    lottieOptions: { animationData: animationData.default },
  }),
  head: {
    title: "Verification",
  },
  watch: {
    user: {
      handler(val) {
        if (val && val.emailVerified) {
          this.$store.commit("setGlobalCss", {
            topMargin: this.matchHeight(),
          });
        }
      },
    },
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    },
  },
  mounted() {
    setTimeout(() => {
      console.log("user", this.user);
      if (this.user.emailVerified) {
        return this.$router.push("/");
      } else {
        this.sendEmailVerification();
      }
    });
  },
  methods: {
    logout() {
      this.$fire.auth
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        })
        .catch((error) => {
          // console.log(error)
        });
    },
    // TRIGGER
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    sendEmailVerification() {
      this.isLoading = true;
      this.$api
        .$post("/user/auth/verify", {
          email: this.user.email,
        })
        .then((result) => {
          console.log(result);
          this.emailSent = true;
          this.message = `We have sent a verification email to ${this.user.email}`;
          this.buttonText = "Resend Email";
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
.noGutters {
  height: 100%;
}

.verification-card {
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
