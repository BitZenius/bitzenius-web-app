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
      <v-col cols="12" md="5" style="z-index: 2">
        <v-row class="pa-8 basic-text--text main-card" justify="start">
          <v-col cols="12" style="max-width: 80%" class="mb-8">
            <div class="text-h4 font-weight-bold decorated-text">
              Reset your password.
            </div>
          </v-col>

          <v-col cols="12">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="basic-text--text">
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    required
                    placeholder="Email"
                    dense
                    rounded
                    class="mb-2 custom-input py-2"
                    prepend-inner-icon="$vuetify.icons.MailIcon"
                  >
                  </v-text-field>

                  <base-button-animated
                    :loading="isLoading"
                    :disabled="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    depressed
                    @click.native="sendRequest"
                    class="mt-5"
                    :text="'Send Request'"
                  ></base-button-animated>
                  <base-button-animated
                    :loading="isLoading"
                    :disabled="isLoading"
                    style="width: 100%"
                    color="customGreen"
                    depressed
                    @click.native="$router.go(-1)"
                    class="mt-5"
                    :text="'Back'"
                  ></base-button-animated>
                </v-col>
              </v-row>
            </v-form>
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
      :src="
        $vuetify.theme.dark
          ? require('assets/images/bitzy darkmode loginpage.png')
          : require('assets/images/bitzy loginpage.png')
      "
      contain
    ></v-img>
    <div
      class="text-subtitle white--text footer d-flex flex-column"
      style="z-index: 2"
    >
      <div>
        Download our app
        <div class="my-5">
          <v-tooltip color="primary" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                plain
                :ripple="false"
                class="white--text mr-3 pa-0"
              >
                <v-img
                  contain
                  :src="require('@/assets/images/AS128.png')"
                ></v-img>
              </v-btn>
            </template>
            <span>Coming soon!</span>
          </v-tooltip>

          <v-tooltip color="primary" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                plain
                :ripple="false"
                class="white--text pa-0"
              >
                <v-img
                  contain
                  :src="require('@/assets/images/GP128.png')"
                ></v-img>
              </v-btn>
            </template>
            <span>Coming soon!</span>
          </v-tooltip>
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
