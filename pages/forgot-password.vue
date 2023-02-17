<template>
  <div class="app">
    <v-row no-gutters class="noGutters">
      <v-col cols="12" md="8" class="d-none d-sm-flex"> </v-col>
      <v-col cols="12" md="4">
        <div class="cardColor" elevation="8">
          <v-alert v-if="message" tile :color="message.color">
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
            <v-form ref="form" v-model="valid" lazy-validation class="mt-10">
              <div class="text-center my-5">
                <h2>Reset your password</h2>
                We'll send an intruction about how to reset your password.
              </div>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    outlined
                    required
                    class="mb-2"
                  />
                  <v-btn
                    :loading="isLoading"
                    :disabled="isLoading"
                    block
                    color="customGreen"
                    x-large
                    class="text-capitalize basic-text--text"
                    depressed
                    @click.stop="sendRequest"
                  >
                    Send Request
                  </v-btn>
                  <v-btn
                    :loading="isLoading"
                    :disabled="isLoading"
                    block
                    color="customGreen"
                    x-large
                    class="text-capitalize basic-text--text mt-4"
                    depressed
                    @click.stop="$router.go(-1)"
                    outlined
                  >
                    Back
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
  layout: "default",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    isLoading: false,
    message: null,
  }),
  head: {
    title: "Forgot Password",
  },
  methods: {
    sendRequest() {
      const valid = this.$refs.form.validate();

      if (valid) {
        this.isLoading = true;
        this.$api
          .$post("/user/auth/reset-password", {
            email: this.email,
          })
          .then((result) => {
            this.message = {
              text: result.message,
              color: "success",
            };
          })
          .catch((err) => {
            this.message = {
              text: err.response.data.message,
              color: "error",
            };
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
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
