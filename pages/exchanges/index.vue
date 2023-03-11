<template>
  <v-row class="pa-5" :key="divKey" v-if="checkMobile() == false">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card rounded class="card-1 pa-2" flat color="primary">
        <div class="image-container">
          <v-img
            width="860"
            class="background-image"
            src="/images/signin-vector.svg"
          >
          </v-img>
        </div>
        <v-row class="pa-5">
          <v-col cols="12" class="d-flex">
            <div class="lottie-container-exchange">
              <lottie
                :width="50"
                :height="50"
                :options="lottieOptions"
                v-on:animCreated="handleAnimation"
              />
            </div>
          </v-col>
          <v-col cols="3" class="d-flex flex-column justify-start align-start">
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
                  >
                    <v-icon small color="primary-text">
                      mdi-content-copy
                    </v-icon>
                  </v-btn>
                </template>
                {{ copied ? "Copy" : "Copied" }}
              </v-tooltip>
            </v-card>
          </v-col>
          <v-col cols="9" class="relative-container">
            <div class="exchange-card-container" v-if="clientExchangesLoaded">
              <v-card
                v-for="(exchange, index) in exchanges"
                :key="index"
                style="position: relative; margin-bottom: 25px"
                :class="{
                  'd-flex align-center justify-center exchange-active':
                    exchange.selected,
                  'd-flex align-center justify-center': !exchange.selected,
                }"
                rounded
              >
                <div class="custom-avatar off-white-3">
                  <v-img contain :src="exchange.image"></v-img>
                </div>
                <v-row class="pa-3 pt-10">
                  <v-col
                    cols="12"
                    class="d-flex justify-center align-center pt-10 px-5"
                  >
                    <!-- <v-btn
                      @click="_addExchange(exchange)"
                      class="mx-2"
                      fab
                      x-small
                      outlined
                      :disabled="
                        exchange.active ||
                        !user.subscription ||
                        user.subscription == false ||
                        exchange.comingsoon
                      "
                      color="primary"
                    >
                      <v-icon> mdi-cog </v-icon>
                    </v-btn> -->
                    <v-btn
                      @click="_addExchange(exchange)"
                      class="mx-2"
                      fab
                      x-small
                      outlined
                      :disabled="
                        !exchange.active ||
                        !user.subscription ||
                        user.subscription == false ||
                        exchange.comingsoon
                      "
                      color="primary"
                    >
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                    <v-btn
                      @click="_deleteExchange(exchange)"
                      class="mx-2"
                      fab
                      x-small
                      outlined
                      :disabled="
                        !exchange.active ||
                        !user.subscription ||
                        user.subscription == false ||
                        exchange.comingsoon
                      "
                      color="danger"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <h4 class="text-body-1 font-weight-bold mb-2">
                      {{ exchange.name }}
                    </h4>
                    <v-alert
                      dense
                      border="left"
                      colored-border
                      :color="
                        exchange.comingsoon
                          ? 'white'
                          : exchange.active
                          ? 'success'
                          : 'primary'
                      "
                      class="pr-0 d-flex align-center justify-center"
                    >
                      <span
                        class="text-caption font-weight-bold"
                        v-if="exchange.updateAt"
                      >
                        Latest Update :
                        {{
                          $moment(exchange.updatedAt).format("DD/MM/YYYY HH:mm")
                        }}
                      </span>
                      <span
                        class="text-caption font-weight-bold"
                        v-else-if="exchange.comingsoon"
                      >
                        Coming soon
                      </span>
                      <v-btn
                        @click="_addExchange(exchange)"
                        class="d-flex align-center justify-center"
                        depressed
                        rounded
                        :disabled="
                          exchange.active ||
                          !user.subscription ||
                          user.subscription == false ||
                          exchange.comingsoon
                        "
                        color="primary"
                        v-else
                      >
                        <span class="text-caption font-weight-bold">
                          Connect {{ exchange.name }}
                        </span>
                      </v-btn>
                    </v-alert>
                  </v-col>
                </v-row>
                <!-- ORNAMENTS -->
                <div v-if="false" class="ornament o1"></div>
                <!-- ORNAMENTS END -->
              </v-card>
            </div>
            <div class="exchange-card-container" v-else>
              <v-card
                class="pa-3"
                v-for="(exchange, index) in exchanges"
                :key="index"
              >
                <div class="custom-avatar off-white-3">
                  <v-skeleton-loader type="avatar"></v-skeleton-loader>
                </div>

                <v-skeleton-loader
                  type="actions"
                  class="mt-10"
                ></v-skeleton-loader>
                <v-skeleton-loader
                  type="sentences"
                  class="mt-10 mb-3"
                ></v-skeleton-loader>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <BaseModal
      v-if="showAddExchange"
      @close="showAddExchange = false"
      :parentModel="showAddExchange"
      :maxWidth="'450'"
    >
      <ModalsExchangeSetup
        :data="data"
        :exchange="selectedExchange"
        @close-modal="closeModal"
        @refetch="refetch"
      />
    </BaseModal>

    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      dark
      bottom
      color="success"
      elevation="15"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
  <v-row class="pa-1 ma-0" :key="divKey" v-else>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row class="mt-10" v-if="clientExchangesLoaded">
        <v-col cols="6" v-for="(exchange, index) in exchanges" :key="index">
          <v-card
            style="position: relative; margin-bottom: 25px"
            :class="{
              'd-flex align-center justify-center exchange-active':
                exchange.selected,
              'd-flex align-center justify-center': !exchange.selected,
            }"
            rounded
          >
            <div class="custom-avatar off-white-3">
              <v-img contain :src="exchange.image"></v-img>
            </div>
            <v-row class="pa-1 ma-0 pt-10">
              <v-col
                cols="12"
                class="d-flex justify-space-between align-center pt-10 px-2"
              >
                <v-btn
                  @click="_addExchange(exchange)"
                  class="mx-2"
                  fab
                  x-small
                  outlined
                  :disabled="
                    exchange.active ||
                    !user.subscription ||
                    user.subscription == false ||
                    exchange.comingsoon
                  "
                  color="primary"
                >
                  <v-icon> mdi-cog </v-icon>
                </v-btn>
                <v-btn
                  @click="_addExchange(exchange)"
                  class="mx-2"
                  fab
                  x-small
                  outlined
                  :disabled="
                    !exchange.active ||
                    !user.subscription ||
                    user.subscription == false ||
                    exchange.comingsoon
                  "
                  color="primary"
                >
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  @click="_deleteExchange(exchange)"
                  class="mx-2"
                  fab
                  x-small
                  outlined
                  :disabled="
                    !exchange.active ||
                    !user.subscription ||
                    user.subscription == false ||
                    exchange.comingsoon
                  "
                  color="danger"
                >
                  <v-icon> mdi-delete </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" c>
                <h4 class="text-body-1 font-weight-bold mb-2 ml-2">
                  {{ exchange.name }}
                </h4>
                <v-alert
                  dense
                  border="left"
                  colored-border
                  :color="
                    exchange.comingsoon
                      ? 'white'
                      : exchange.active
                      ? 'primary'
                      : 'success'
                  "
                  class="pr-0"
                >
                  <span
                    class="text-caption font-weight-bold"
                    v-if="exchange.updateAt"
                  >
                    Latest Update :
                    {{ $moment(exchange.updatedAt).format("DD/MM/YYYY HH:mm") }}
                  </span>
                  <span
                    class="text-caption font-weight-bold"
                    v-else-if="exchange.comingsoon"
                  >
                    Coming soon
                  </span>
                  <span class="text-caption font-weight-bold" v-else>
                    Setup exchange
                  </span>
                </v-alert>
              </v-col>
            </v-row>
            <!-- ORNAMENTS -->
            <div v-if="false" class="ornament o1"></div>
            <!-- ORNAMENTS END -->
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10" v-else>
        <v-col cols="6" v-for="(exchange, index) in exchanges" :key="index">
          <v-card
            class="pa-3"
            style="position: relative; margin-bottom: 25px"
            s
          >
            <div class="custom-avatar off-white-3">
              <v-skeleton-loader type="avatar"></v-skeleton-loader>
            </div>

            <v-skeleton-loader type="button" class="mt-10"></v-skeleton-loader>
            <v-skeleton-loader
              type="sentences"
              class="mt-10 mb-3"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="d-flex flex-column justify-start align-start">
      <v-card
        flat
        rounded
        color="primary2"
        class="pa-3 primary-text--text text-body-2 mb-2"
      >
        Please be sure to whitelist the following IP address when creating an
        API Key on your exchange. It is a required step!
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
            >
              <v-icon small color="primary-text"> mdi-content-copy </v-icon>
            </v-btn>
          </template>
          {{ copied ? "Copy" : "Copied" }}
        </v-tooltip>
      </v-card>
    </v-col>

    <BaseModalMobile
      v-if="showAddExchange"
      @close="showAddExchange = false"
      :parentModel="showAddExchange"
      :maxWidth="'450'"
    >
      <ModalsExchangeSetup
        :data="data"
        :exchange="selectedExchange"
        @close-modal="closeModal"
        @refetch="refetch"
      />
    </BaseModalMobile>

    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      dark
      bottom
      color="success"
      elevation="15"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import Form from "./form";
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/Whitelist icon.json";

export default {
  layout: "account",
  components: {
    Form,
    lottie,
  },
  filters: {
    moment(val) {
      console.log("moment", this.$moment(new Date()).format("DD/MM/YYYY"));
      console.log("val", val);
      // return this.$moment(val).format('DD/MM/YYYY');
    },
  },
  data() {
    return {
      divKey: 0,
      title: "My Exchanges",
      dialog: false,
      dialogDelete: false,

      // START OF CARD EXCHANGE
      data: false,
      exchanges: [
        {
          name: "Binance",
          selected: false,
          active: false,
          image: "/exchange_logo/binance.png",
          comingsoon: false,
        },
        // {
        //   name: "Bybit",
        //   selected: false,
        //   active: false,
        //   image: "/exchange_logo/bybit.png",
        //   comingsoon: false,
        // },
        {
          name: "Kucoin",
          selected: false,
          active: false,
          image: "/exchange_logo/kucoin.png",
          comingsoon: false,
        },
        // {
        //   name: "Tokocrypto",
        //   selected: false,
        //   active: false,
        //   image: "/exchange_logo/tokocrypto.png",
        //   comingsoon: true,
        // },
      ],

      // END OF CARD EXCHANGE

      // MODAL EXCHANGE
      selectedExchange: null,
      // END OF MODAL EXCHANGE

      headers: [
        {
          text: "Name",
          value: "title",
        },
        {
          text: "Exchange",
          value: "exchange_name",
        },
        {
          text: "Created On",
          value: "created_at",
        },
        {
          text: "",
          value: "actions",
          sortable: false,
        },
      ],
      clientExchanges: [],
      clientExchangesLoaded: false,
      id: null,
      editedItem: {
        name: "",
        exchange: "",
        api_key: "",
        secret_key: "",
      },
      defaultItem: {
        name: "",
        exchange: "",
        api_key: "",
        secret_key: "",
      },
      isLoading: true,
      listener: null,
      snackbar: false,
      snackbarText: "My timeout is set to 2000.",
      snackbarTimeout: 5000,

      // MODAL ADD EXCHANGE
      showAddExchange: false,

      // COPY
      whitelistIp: "108.61.117.32",
      copied: false,

      // LOTTIE
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    formTitle() {
      return this.id === null ? "Add New" : "Edit";
    },
    user() {
      return this.$store.state.authUser;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  async mounted() {
    this.clientExchangesLoaded = false;
    this.checkCompletion();
    this.$store.commit("setTitle", this.title);
    // this.listener = this.$fire.firestore.collection('user_exchanges').orderBy('created_at', 'desc').onSnapshot((onResult, onError) => {
    //     if (onResult.size > 0) {
    //         const exchanges = []
    //         onResult.docs.forEach((doc) => {
    //             exchanges.push({
    //                 ...doc.data(),
    //                 id: doc.id,
    //                 created_at: this.$moment(doc.data().created_at).format('DD/MM/YYYY HH:mm')
    //             })
    //         })
    //         this.items = exchanges
    //     }
    // })
    await this._fetchExchanges();
    this.clientExchangesLoaded = true;
  },
  beforeDestroy() {},
  methods: {
    resetExchanges() {
      console.log("BEFORE resetExchanges", this.exchanges);
      this.exchanges = [
        {
          name: "Binance",
          selected: false,
          active: false,
          image: "/exchange_logo/binance.png",
          comingsoon: false,
        },
        // {
        //   name: "Bybit",
        //   selected: false,
        //   active: false,
        //   image: "/exchange_logo/bybit.png",
        //   comingsoon: false,
        // },
        {
          name: "Kucoin",
          selected: false,
          active: false,
          image: "/exchange_logo/kucoin.png",
          comingsoon: false,
        },
        // {
        //   name: "Tokocrypto",
        //   selected: false,
        //   active: false,
        //   image: "/exchange_logo/tokocrypto.png",
        //   comingsoon: true,
        // },
      ];

      for (let index = 0; index < this.exchanges.length; index++) {
        const element = this.exchanges[index];
        element.active = false;
      }

      console.log("AFTER resetExchanges", this.exchanges);
    },
    refetch() {
      setTimeout(() => {
        this.$router.go();
      }, 1000);
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    // FETCH API
    async _fetchExchanges() {
      console.log("FETCHING DATA EXCHANGES");
      this.resetExchanges();
      let res = await this.$api.$get("/user/exchange");
      this.clientExchanges = res.data;
      console.log("DATA EXCHANGES", res.data);
      if (res.data) {
        for (let exchange of this.clientExchanges) {
          console.log(exchange.exchange_name);
          for (let i = 0; i < this.exchanges.length; i++) {
            let currentExchange = this.exchanges[i];
            if (currentExchange.active == true) {
              continue;
            }

            console.log(
              `comparing ${currentExchange.name} & ${exchange.exchange_name} ==`
            );
            if (currentExchange.name == exchange.exchange_name) {
              console.log("IF");
              currentExchange.active = true;
              currentExchange.updateAt = exchange.updated_at;
              currentExchange.id = exchange._id;
            }
          }
        }
      } else {
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Unable to fetch user exchanges!",
          color: "customPink",
        });
      }
    },

    // LISTENER
    closeModal(val) {
      this.showAddExchange = val;
      this._fetchExchanges();
    },
    // END OF LISTENER
    // TRIGGER
    onCopy(e) {
      console.log("onCopy", e.text);
      this.copied = !this.copied;
    },
    onError: function (e) {
      alert("Failed to copy: " + e.text);
    },
    async _logger() {
      await this._fetchExchanges();
      console.log(this.clientExchanges);
      console.log(this.exchanges);
    },
    async _deleteExchange(exchange) {
      this.$store.commit("setIsLoading", true);

      try {
        let res = await this.$api.$delete("/user/exchange", {
          params: {
            id: exchange.id,
          },
        });

        if (res.success) {
          this.$store.commit("setShowSnackbar", {
            show: true,
            message: `Successfuly deleted ${exchange.name}`,
            color: "success",
          });

          this.refetch();
        }
      } catch (error) {
        console.log("_deleteExchange", error);
        this.$store.commit("setShowSnackbar", {
          show: true,
          message: "Deleting exchange fails",
          color: "danger",
        });
      }

      this.$store.commit("setIsLoading", false);
    },
    _addExchange(exchange) {
      this.data = null;
      this.selectedExchange = exchange;
      this.showAddExchange = true;
      if (exchange.active) {
        this.data = exchange;
      }
      // alert('On going pop-up modal add Exchange')
    },
    addItem() {
      this.id = null;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },
    editItem(item) {
      this.id = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.id = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      /*
            this.$axios.delete('admin/exchanges/' + this.id).then((res) => {
              this.snackbarText = res.data.message
              this.snackbar = true
            }).catch((e) => {
              console.log(e)
            }).finally(() => {
              this.isLoading = false
              this.closeDelete()
            })
            */
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.id = null;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.id = null;
      });
    },
  },
};
</script>


<style scoped>
.custom-card {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.exchange-selected {
  position: absolute;
  bottom: -20px;
  right: 5px;
  background: #17576a;
  color: white;
  padding: 0px 15px;
  border-radius: 0px 0px 15px 15px !important;
  font-size: 0.8rem;
}

.exchange-table-selected {
  background: #17576a;
  padding: 5px 25px;
  font-weight: bold;
  color: white;
  float: right;
  font-size: 0.8rem;
  border-radius: 15px 15px 0px 0px;
}

.updated-label {
  position: absolute;
  font-size: 0.7rem;
  bottom: -28px;
  background: #17576a;
  color: white;
  padding: 5px 22px;
}

.text-info {
  background: #177e89;
  color: white;
  border-radius: 10px;
  padding: 13px 10px;
}
.text-chip {
  padding: 8px;
  background-color: #f4f7fd;
  border-radius: 20px;
}

.ornament {
  position: absolute;
  width: 50%;
  height: 4px;
  border-radius: 8px;

  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
}
.ornament.o1 {
  background: var(--primary);
}

.ornament.o2 {
  background: var(--primary);
}

.card-1 {
  position: relative;
  width: 90%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0%;
  left: 0%;
}

.card-1 > .image-container > .background-image {
  transform: rotate(40deg) scaleX(-1);
  position: absolute;
  top: -60%;
  left: 18%;
}

.relative-container {
  position: relative;
}

.exchange-card-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 10px;
  width: 120%;
}

.exchange-card-container > .v-card {
  width: 210px !important;
}

.custom-avatar {
  box-shadow: 0px 20px 25px #3394f81a;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  padding: 15px;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 100% !important;
  top: 0%;
  left: 0%;
  transform: translate(50%, -50%);
  z-index: 10;
}
</style>

