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
      </v-row>
    </v-card-title>
    <v-card-text class="mt-3 pb-0">
      <v-card flat rounded class="mb-12 d-flex flex-column align-center">
        <!-- <h3>Please fill up the form below</h3> -->
        <!-- <v-row
          class="d-flex align-center justify-center"
          style="width: 100%;"
        >
          <v-col cols="12" md="12">
            <div class="mb-2 font-weight-bold">Total USDT To Withdraw</div>
            <v-text-field
              readonly
              dense
              v-model="exchange.name"
              rounded
              class="my-2 custom-input text-body-1"
            ></v-text-field>
          </v-col>
        </v-row> -->
        <v-row class="d-flex align-center justify-center" style="width: 100%">
          <v-col cols="12" md="12">
            <div class="mb-2 font-weight-bold">API Key</div>
            <v-text-field
              dense
              v-model="api_key"
              rounded
              class="my-2 custom-input text-body-1"
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
              placeholder="Secret Key"
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
      // exchangeItems: ['Binance', 'Tokocrypto', 'MEXC', 'Coinstore'],
    };
  },
  computed: {
    user() {
      return this.$store.state.authUser;
    },
  },
  methods: {
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
      let paramTemp = {};
      paramTemp.title = this.name;
      paramTemp.exchange_name = this.exchange.name;
      paramTemp.api_key = this.api_key;
      paramTemp.secret_key = this.secret_key;
      if (!this.exchange.name || !this.api_key || !this.secret_key) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Please fill all requirements needed!",
          color: "customPink",
        });
      } else {
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
            let res = await this.$api.$post("/user/exchange", paramTemp);
            this.$store.commit("setIsLoading", true);
            setTimeout(() => {
              this.$emit("close-modal", false);
              this.$store.commit("setShowSnackbar", {
                show: true,
                message: "Successfuly Added New Bot!",
                color: "success",
              });
              this.$store.commit("setIsLoading", false);
            });
          }
        } catch (error) {
          console.log(error.message);
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: "Please insert valid api key and secret key",
            color: "customPink",
          });
          this.$store.commit("setIsLoading", false);
        }
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
      let paramTemp = {};
      paramTemp.api_key = this.api_key;
      paramTemp.secret_key = this.secret_key;
      paramTemp.exchange_name = this.exchange.name;
      if (!this.exchange.name || !this.api_key || !this.secret_key) {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Please fill all requirements needed!",
          color: "customPink",
        });
        this.$store.commit("setIsLoading", false);
      } else {
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
            message: "Please insert valid api key and secret key",
            color: "customPink",
          });
          this.$store.commit("setIsLoading", false);
        }
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
