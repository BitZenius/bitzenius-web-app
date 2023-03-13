<template>
  <v-card flat rounded>
    <v-card-title class="text-h5 lighten-2 pt-8" style="position: relative">
      <v-btn icon @click="closeModal" class="close-button">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-row>
        <v-col cols="12">
          <v-img width="60" class="mb-2" contain :src="exchange.image"></v-img>
          <span class="text-body-1 font-weight-bold"
            >{{ data ? "Edit" : "Add" }} {{ exchange.name }} As Your Exchange
          </span>
        </v-col>
        <v-col cols="12">
          <v-card
            flat
            rounded
            color="primary2"
            class="pa-3 primary-text--text text-body-2 mb-2"
          >
            Please be sure to whitelist the following IP address when creating
            an API Key on your exchange. It is a required step!
          </v-card>
          <v-card
            flat
            rounded
            color="primary2"
            class="pa-3 primary-text--text text-body-2 custom-card"
          >
            {{ whitelistIp }}
            <v-tooltip v-model="copied" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="black"
                  size="16"
                  v-clipboard:copy="whitelistIp"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  @click="copyToClipboard(whitelistIp)"
                >
                  <v-icon small color="primary-text"> mdi-content-copy </v-icon>
                </v-btn>
              </template>
              {{ copied ? "Copy" : "Copied" }}
            </v-tooltip>
          </v-card>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="mt-3 pb-0">
      <v-card flat rounded class="mb-12 d-flex flex-column align-center">
        <v-row class="d-flex align-center justify-center" style="width: 100%">
          <v-col cols="12" md="12">
            <div class="mb-2 font-weight-bold">API Key</div>
            <v-text-field
              dense
              v-model="api_key"
              rounded
              class="my-2 custom-input text-body-1"
              autocomplete="null"
              placeholder="API Key"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex align-center justify-center" style="width: 100%">
          <v-col cols="12" md="12">
            <div class="mb-2 font-weight-bold">Secret Key</div>
            <v-text-field
              dense
              rounded
              class="my-2 custom-input text-body-1"
              v-model="secret_key"
              autocomplete="null"
              placeholder="Secret Key"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row
          v-if="needSecretPhrase"
          class="d-flex align-center justify-center"
          style="width: 100%"
        >
          <v-col cols="12" md="12">
            <div class="mb-2 font-weight-bold">Secret Phrase</div>
            <v-text-field
              dense
              rounded
              class="my-2 custom-input text-body-1"
              v-model="passphrase"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              required
              @click:append="show1 = !show1"
              placeholder="Secret Phrase"
              autocomplete="null"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
    <v-card-actions class="d-flex justify-center py-5 mb-3">
      <v-btn
        v-if="!data"
        :disabled="!user.subscription || user.subscription == false"
        color="primary"
        @click="_save"
        block
        rounded
      >
        Save
      </v-btn>
      <v-btn
        v-else
        :disabled="!user.subscription || user.subscription == false"
        color="primary"
        @click="_updateData"
        block
        rounded
      >
        Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["exchange", "data"],
  data() {
    return {
      name: this.exchange.name,
      api_key: null,
      secret_key: null,
      passphrase: null,
      show1: false,
      // COPY
      whitelistIp: "108.61.117.32",
      copied: false,
      // exchangeItems: ['Binance', 'Tokocrypto', 'MEXC', 'Coinstore'],
    };
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    },
    needSecretPhrase() {
      if (!this.exchange) {
        return false;
      }

      switch (this.exchange.name) {
        case "Kucoin":
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    onCopy(e) {
      console.log("onCopy", e.text);
      this.copied = !this.copied;
    },
    onError: function (e) {
      alert("Failed to copy: " + e.text);
    },
    // TRIGGER
    closeModal() {
      this.$emit("close-modal", false);
    },
    _logger() {
      console.log(this.exchange.name);
    },
    async _save() {
      if (!this.user.subscription) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "You haven't subsrcibe to any plan",
          color: "customPink",
        });
        return;
      }
      this.$store.commit("setIsLoading", true);

      // Create params
      let paramTemp = {};
      paramTemp.title = this.name;
      paramTemp.exchange_name = this.exchange.name;
      paramTemp.api_key = this.api_key;
      paramTemp.secret_key = this.secret_key;

      if (this.needSecretPhrase) {
        paramTemp.passphrase = this.passphrase;
      }

      // Filtering
      if (!this.exchange.name || !this.api_key || !this.secret_key) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Please fill all requirements needed!",
          color: "customPink",
        });

        return;
      }

      // Filter secret phase
      if (this.needSecretPhrase) {
        if (!this.passphrase) {
          return this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please fill all requirements needed!",
            color: "customPink",
          });
        }
      }

      try {
        let validateExchangeKey = await this.$api.$post(
          "/user/validate-user-exchange",
          paramTemp
        );

        if (validateExchangeKey.success) {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Your api key and secret key are valid!",
            color: "success",
          });
          let res = await this.$api.$post("/user/exchange", paramTemp);
          this.$store.commit("setIsLoading", true);
          setTimeout(() => {
            this.$emit("close-modal", false);
            this.$store.commit("setShowSnackbar", {
              show: true,
              message: "Successfuly Added New Exchange!",
              color: "success",
            });

            this.$store.commit("setIsLoading", false);
            this.fetchCompletion();
          });
        }
      } catch (error) {
        console.log(error.message);
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: this.needSecretPhrase
            ? "Please insert valid api key, secret key, and passphrase"
            : "Please insert valid api key and secret key",
          color: "customPink",
        });
        this.$store.commit("setIsLoading", false);
      }
    },
    async _updateData() {
      if (!this.user.subscription) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "You haven't subsrcibe to any plan",
          color: "customPink",
        });
        return;
      }
      this.$store.commit("setIsLoading", true);

      // Create params
      let paramTemp = {};
      paramTemp.api_key = this.api_key;
      paramTemp.secret_key = this.secret_key;
      paramTemp.exchange_name = this.exchange.name;

      if (this.needSecretPhrase) {
        paramTemp.passphrase = this.passphrase;
      }

      // Filtering
      if (!this.exchange.name || !this.api_key || !this.secret_key) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Please fill all requirements needed!",
          color: "customPink",
        });
        this.$store.commit("setIsLoading", false);
        return;
      }

      // Filter secret phase
      if (this.needSecretPhrase) {
        if (!this.passphrase) {
          return this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please fill all requirements needed!",
            color: "customPink",
          });
        }
      }

      console.log(paramTemp);
      try {
        let validateExchangeKey = await this.$api.$post(
          "/user/validate-user-exchange",
          paramTemp
        );
        if (validateExchangeKey.success) {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Your api key and secret key are valid!",
            color: "success",
          });
          let res = await this.$api.$put("/user/exchange", paramTemp, {
            params: {
              id: this.data.id,
            },
          });
          setTimeout(() => {
            this.$emit("close-modal", false);
            if (res.ok) {
              this.$store.commit("setShowSnackbar", {
                show: true,
                message: "Successfuly Updated!",
                color: "success",
              });
              this.$store.commit("setIsLoading", false);
            } else {
            }
          });
        }
      } catch (error) {
        console.log(error.message);
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: this.needSecretPhrase
            ? "Please insert valid api key, secret key, and passphrase"
            : "Please insert valid api key and secret key",
          color: "customPink",
        });
        this.$store.commit("setIsLoading", false);
      }
    },
  },
};
</script>

<style scoped>
.summary .v-card__title {
  padding: 0;
  font-size: 0.9rem;
  text-align: center;
  display: block;
}

.summary .v-card__text {
  display: block;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.close-button {
  position: absolute;
  right: 3%;
  top: 5%;
}
</style>
