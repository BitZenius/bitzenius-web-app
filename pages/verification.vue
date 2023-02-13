<template>
  <div class="app">
    <v-card
      class="verification-card d-flex align-center justify-center"
      color="primary"
    >
      <v-card-text
        style="text-align: left"
        class="d-flex flex-column justify-center align-center pa-0"
      >
        <h3 class="white--text">
          {{ message }}
        </h3>
        <div class="d-flex justify-center align-center mt-4">
          <v-btn
            :loading="isLoading"
            depressed
            class="customGreen black--text text-capitalize"
            @click.stop="sendEmailVerification"
          >
            {{ buttonText }}
          </v-btn>
          <v-btn
            @click="logout"
            depressed
            color="customPink"
            class="text-capitalize ml-2"
          >
            Logout
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "default",
  data: () => ({
    isLoading: false,
    emailSent: false,
    message: "Please check your email to verify your account!",
    buttonText: "Send Verification",
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
      if (this.user.emailVerified) {
        return this.$router.push("/");
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
          this.buttonText = "Resend";
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
  background-image: url("/background.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
