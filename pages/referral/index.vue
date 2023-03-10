<template>
  <v-row v-if="checkMobile() == false" class="pa-5">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="5">
      <v-row>
        <v-col cols="12">
          <v-card v-if="!isLoaded" rounded flat class="pa-2">
            <div class="pa-3">
              <v-skeleton-loader loading type="heading" />
              <v-skeleton-loader loading type="heading" class="mt-2" />
              <v-skeleton-loader loading type="heading" class="mt-5" />
              <v-skeleton-loader loading type="heading" class="mt-2" />
            </div>
          </v-card>
          <v-card
            v-else-if="referralCode"
            flat
            rounded
            class="pa-2"
            style="position: relative"
          >
            <div class="lottie-container">
              <template>
                <!-- width and height are optional -->
                <lottie
                  :width="300"
                  :height="300"
                  :options="lottieOptions"
                  v-on:animCreated="handleAnimation"
                />
              </template>
            </div>
            <v-list>
              <v-list-item class="mb-10 pb-10">
                <v-list-item-content>
                  <v-list-item-title class="text-body-1 font-weight-bold"
                    >Your Referral Code</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    <v-tooltip v-model="copied" top>
                      <template v-slot:activator="{ on, attrs }">
                        <h1
                          v-bind="attrs"
                          v-on="on"
                          color="primary"
                          v-clipboard:copy="referralCode"
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onError"
                          class="text-h4 font-weight-bold primary--text"
                          style="cursor: pointer"
                        >
                          {{ referralCode }}
                        </h1>
                      </template>
                      <span>{{ copied ? "Copy" : "Copied" }}</span>
                    </v-tooltip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="mt-10">
                <v-list-item-content>
                  <v-list-item-title class="text-body-1 font-weight-bold"
                    >Referral Link</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    <v-chip color="off-white">
                      {{ referralLink }}
                      <v-tooltip v-model="copied2" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                            size="16"
                            v-clipboard:copy="referralLink"
                            v-clipboard:success="onCopy2"
                            v-clipboard:error="onError"
                          >
                            <v-icon color="primary" class="ml-2">
                              $vuetify.icons.CopyIcon
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>{{ copied2 ? "Copy" : "Copied" }}</span>
                      </v-tooltip>
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card flat rounded style="position: relative">
            <v-list two-line>
              <v-list-item>
                <v-icon color="primary" class="mr-5" size="18"
                  >$vuetify.icons.ReferralIcon
                </v-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-body-1 font-weight-bold"
                    >Total Referrals</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Total referred peoples</v-list-item-subtitle
                  >
                  <strong class="text-h5 font-weight-bold">
                    {{ totalReferredUsers }}
                  </strong>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- ORNAMENTS -->
            <div class="ornament-1"></div>
            <!-- ORNAMENTS END -->
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card flat rounded style="position: relative">
            <v-list two-line>
              <v-list-item>
                <v-icon color="primary" class="mr-5" size="18"
                  >$vuetify.icons.EarningsIcon
                </v-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-body-1 font-weight-bold"
                    >Total Earned</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-body-2"
                    >Total earned rewards</v-list-item-subtitle
                  >
                  <strong class="text-h5 font-weight-bold">
                    {{ totalRewards | currency("$") }}
                  </strong>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- ORNAMENTS -->
            <div class="ornament-1"></div>
            <!-- ORNAMENTS END -->
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="7">
      <v-row>
        <v-col cols="7">
          <v-list flat color="rgba(0,0,0,0)" two-line>
            <v-list-item>
              <!-- <v-list-item-avatar> -->
              <v-icon size="30" class="primary--text mr-3">
                $vuetify.icons.GiftIcon
              </v-icon>
              <!-- </v-list-item-avatar> -->
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-bold"
                  >My Rewards History</v-list-item-title
                >
                <v-list-item-subtitle class="text-body-2">
                  Track your earned rewards of all your referral
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-card flat rounded class="pa-3">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="transactions"
              :loading="isLoading"
              :options.sync="options"
              :server-items-length="totalItems"
              :items-per-page="rowsPerPage"
              disable-sort
              class="elevation-0"
              loading-text="Loading... Please wait"
            >
              <template #item.type="{ item }">
                <v-chip color="primary" small label>
                  {{ item.type.toUpperCase() }}
                </v-chip>
              </template>
              <template #item.status="{ item }">
                <v-chip v-if="item.status == 0" small> On Processing </v-chip>
                <v-chip
                  v-if="item.status == 1"
                  small
                  color="success"
                  class="white--text"
                >
                  Done
                </v-chip>
                <v-chip
                  v-if="item.status == 2"
                  small
                  color="error"
                  class="white--text"
                >
                  Cancelled
                </v-chip>
              </template>
              <template #item.amount="{ item }">
                <div class="text-right">
                  <span v-if="item.credit > 0" class="success--text">
                    {{ item.amount | currency("$") }}
                    <v-icon color="success" size="16"
                      >mdi-arrow-bottom-left</v-icon
                    >
                  </span>
                  <span v-if="item.debt > 0" class="danger--text">
                    {{ item.amount | currency("$") }}
                    <v-icon color="danger" size="16"
                      >mdi-arrow-top-right</v-icon
                    >
                  </span>
                </div>
              </template>
              <template v-slot:no-data>
                <BaseNoData :label="`No Rewards History`"></BaseNoData>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else class="pa-1 ma-0">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8" class="text-h5 font-weight-bold pl-3">
          <v-icon @click="mobileBack">mdi-arrow-left</v-icon>
          {{ title }}
        </v-col>
      </v-row>
    </v-col>
    <v-slide-x-transition mode="out-in" hide-on-leave>
      <v-col v-show="mobileMode == 'DEFAULT'" cols="12">
        <v-row>
          <v-col cols="12">
            <div>
              <template>
                <!-- width and height are optional -->
                <lottie
                  :width="300"
                  :height="300"
                  :options="lottieOptions"
                  v-on:animCreated="handleAnimation"
                />
              </template>
            </div>
          </v-col>
          <v-col cols="12">
            <v-card flat rounded>
              <v-row>
                <v-col cols="6">
                  <v-list two-line>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-1 font-weight-bold"
                          >Total Referrals</v-list-item-title
                        >

                        <strong class="text-h5 font-weight-bold">
                          {{ totalReferredUsers }}
                        </strong>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-list two-line>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-1 font-weight-bold"
                          >Total Earned</v-list-item-title
                        >

                        <strong class="text-h5 font-weight-bold">
                          {{ totalRewards | currency("$") }}
                        </strong>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card v-if="referralCode" flat rounded class="pa-2">
              <v-list rounded color="off-white-2 pa-1 mb-2">
                <v-list-item class="">
                  <v-list-item-content>
                    <v-list-item-title class="text-body-1 font-weight-bold"
                      >Referral Code</v-list-item-title
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text
                      class="text-h6 font-weight-bold primary--text"
                    >
                      <v-tooltip v-model="copied" top>
                        <template v-slot:activator="{ on, attrs }">
                          <h1
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                            v-clipboard:copy="referralCode"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            style="cursor: pointer"
                            class="text-h6 font-weight-bold primary--text"
                          >
                            {{ referralCode }}
                            <v-icon color="primary" class="ml-1"
                              >$vuetify.icons.CopyIcon</v-icon
                            >
                          </h1>
                        </template>
                        <span>{{ copied ? "Copy" : "Copied" }}</span>
                      </v-tooltip>
                    </v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-list rounded color="off-white-2 pa-1 ">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-1 font-weight-bold"
                      >Referral Link</v-list-item-title
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text
                      class="text-h6 font-weight-bold primary--text"
                    >
                      {{ formatCopyText(referralLink) }}
                      <v-tooltip v-model="copied2" top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                            size="16"
                            v-clipboard:copy="referralLink"
                            v-clipboard:success="onCopy2"
                            v-clipboard:error="onError"
                          >
                            <v-icon color="primary" class="ml-1">
                              $vuetify.icons.CopyIcon
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>{{ copied2 ? "Copy" : "Copied" }}</span>
                      </v-tooltip>
                    </v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            class="text-center primary--text text-decoration-underline"
            @click="mobileMode = 'HISTORY'"
          >
            Rewards History
          </v-col>
        </v-row>
      </v-col>
    </v-slide-x-transition>
    <v-slide-x-transition mode="out-in" hide-on-leave>
      <v-col v-show="mobileMode == 'HISTORY'" cols="12">
        <v-row>
          <v-col cols="12">
            <v-list flat color="rgba(0,0,0,0)" two-line>
              <v-list-item>
                <!-- <v-list-item-avatar> -->
                <v-icon size="30" class="primary--text mr-3">
                  $vuetify.icons.GiftIcon
                </v-icon>
                <!-- </v-list-item-avatar> -->
                <v-list-item-content>
                  <v-list-item-title class="text-h5 font-weight-bold"
                    >My Rewards History</v-list-item-title
                  >
                  <v-list-item-subtitle class="text-body-2">
                    Track your earned rewards of all your referral
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-card flat rounded class="pa-3">
          <v-row>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="transactions"
                :loading="isLoading"
                :options.sync="options"
                :server-items-length="totalItems"
                :items-per-page="rowsPerPage"
                disable-sort
                class="elevation-0"
                loading-text="Loading... Please wait"
              >
                <template v-slot:body="{ items }">
                  <v-row
                    v-for="(item, i) in items"
                    :key="`${i}-item`"
                    class="mb-5"
                  >
                    <v-col cols="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="text-body-2">
                            Date
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.date }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="7">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="text-body-2">
                            Bonus
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            <span v-if="item.credit > 0" class="success--text">
                              {{ item.amount | currency("$") }}
                              <v-icon color="success" size="16"
                                >mdi-arrow-bottom-left</v-icon
                              >
                            </span>
                            <span v-if="item.debt > 0" class="danger--text">
                              {{ item.amount | currency("$") }}
                              <v-icon color="danger" size="16"
                                >mdi-arrow-top-right</v-icon
                              >
                            </span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="5">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="text-body-2">
                            Type
                          </v-list-item-title>
                          <v-list-item-subtitle class="primary--text">
                            {{ item.type.toUpperCase() }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="7">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title class="text-body-2">
                            Description
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{ item.description }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="6">
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="text-body-2">
                            Status
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            <v-chip v-if="item.status == 0" small>
                              On Processing
                            </v-chip>
                            <v-chip
                              v-if="item.status == 1"
                              small
                              color="success"
                              class="white--text"
                            >
                              Done
                            </v-chip>
                            <v-chip
                              v-if="item.status == 2"
                              small
                              color="error"
                              class="white--text"
                            >
                              Cancelled
                            </v-chip>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col cols="6"> </v-col>
                  </v-row>
                </template>

                <template v-slot:no-data>
                  <BaseNoData :label="`No Rewards History`"></BaseNoData>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-slide-x-transition>
  </v-row>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/Referral.json";

export default {
  layout: "account",
  components: {
    lottie,
  },
  data() {
    return {
      title: "Referral",
      isLoading: false,
      isLoaded: false,
      headers: [
        {
          text: "Date",
          align: "left",
          value: "date",
        },
        {
          text: "Type",
          align: "left",
          value: "type",
        },
        {
          text: "Desc",
          align: "left",
          value: "description",
        },
        {
          text: "Amount",
          align: "right",
          value: "amount",
        },
        {
          text: "Status",
          align: "left",
          value: "status",
        },
      ],
      options: {},
      totalItems: 0,
      rowsPerPage: 10,
      referralCode: "",
      referralLink: "",
      totalRewards: 0,
      totalReferredUsers: 0,
      transactions: [],
      copied: false,
      copied2: false,

      // LOTTIE
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },

      // MOBILE
      mobileMode: "DEFAULT",
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  watch: {
    options: {
      handler() {
        this.getRewards();
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.commit("setTitle", this.title);
    this.getProfile();
    this.countRewards();
    this.getRewards();
  },
  methods: {
    formatCopyText(text) {
      var first = text.slice(0, 8);
      var last = text.slice(text.length - 5, text.length);
      return first + "..." + last;
    },
    mobileBack() {
      if (this.mobileMode == "DEFAULT") {
        this.$router.push("/account");
      } else {
        this.mobileMode = "DEFAULT";
      }
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    getProfile() {
      this.isLoading = true;
      this.$api
        .$get("/user/referral")
        .then((res) => {
          this.referralCode = res.code;
          this.referralLink =
            window.location.origin + "/signup?referral=" + res.code;
          this.totalReferredUsers = res.total_referred_users;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
          this.isLoaded = true;
        });
    },
    countRewards() {
      this.isLoading = true;
      this.$api
        .$get("/user/referral/total")
        .then((res) => {
          console.log(res);
          this.totalRewards = res.result;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getRewards() {
      this.isLoading = true;
      const { page, itemsPerPage } = this.options;
      this.rowsPerPage = itemsPerPage;

      this.$api
        .$get("/user/referral/rewards", {
          params: {
            limit: itemsPerPage == -1 ? this.totalItems : itemsPerPage,
            page,
          },
        })
        .then((res) => {
          this.totalItems = res.result.total;
          const transactions = [];

          res.result.data.forEach((result) => {
            transactions.push({
              id: result._id,
              date: this.$moment(result.created_at).format("DD MMM YYYY HH:mm"),
              description: result.description,
              amount: result.debt || result.credit,
              debt: result.debt,
              credit: result.credit,
              type: result.type.replace("_", " "),
              status: result.status,
            });
          });

          this.transactions = transactions;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    closeModal() {
      alert("closeModal");
    },
    onCopy: function (e) {
      this.copied = !this.copied;
    },
    onCopy2: function (e) {
      this.copied2 = !this.copied2;
    },
    onError: function (e) {
      alert("Failed to copy: " + e.text);
    },
  },
};
</script>

<style>
.lottie-container {
  position: absolute;
  top: 0%;
  right: 0%;
  transform: translate(10%, -30%);
}
.ornament-1 {
  position: absolute;
  width: 50%;
  height: 4px;
  border-radius: 8px;
  background: var(--primary);

  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
}

.v-data-table--mobile > .v-data-table__wrapper {
  overflow-x: hidden !important;
}
</style>