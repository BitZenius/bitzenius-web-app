<template>
  <v-card flat class="no-padding">
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <v-card class="pa-2 custom-card" flat>
          <v-list-item two-line>
            <v-list-item-avatar size="40" color="#F4F7FD">
              <v-img
                max-width="25px"
                max-height="25px"
                :src="require('~/assets/images/wallet-icon.svg')"
                position="center"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle
                class="white--text font-weight-bold text-body-1 mb-1"
              >
                Credit Balance
              </v-list-item-subtitle>
              <v-list-item-title>
                <span
                  class="text-h5 font-weight-black white--text text--lighten-2"
                >
                  <v-skeleton-loader v-if="isLoading" loading type="heading" />
                  <div v-else>{{ balance | currency("$", 2) }}</div>
                </span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      balance: 0,
      depositDialog: false,
      withdrawDialog: false,
      copied: false,
      styleElement: null,
      isLoading: false,
    };
  },
  mounted() {
    this.countBalance();
    this.getProfile();
  },
  methods: {
    countBalance() {
      this.isLoading = true;
      this.$api
        .$get("/user/balance/total")
        .then((res) => {
          this.balance = res.result ? res.result : 0;
        })
        .catch((err) => {
          this.balance = 0;
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getProfile() {
      this.isLoading = true;
      this.$api
        .$get("/user/profile")
        .then((res) => {
          this.userData = res.result;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    showDeposit() {
      this.depositDialog = true;
    },
    showWithdraw() {
      this.withdrawDialog = true;
    },
    onCopy: function (e) {
      this.copied = !this.copied;
    },
    onError: function (e) {
      alert("Failed to copy: " + e.text);
    },

    // CSS HIJACK
    applyStyle(styleDef) {
      let styleElement = document.createElement("style");
      styleElement.type = "text/css";
      document.head.appendChild(styleElement);
      styleElement.innerHTML = styleDef;
      return styleElement;
    },
  },
  computed: {
    style() {
      if (this.depositDialog) {
        return `
        .v-overlay--active {
          background: #1a202c4d 0% 0% no-repeat padding-box;
          opacity: 1;
          backdrop-filter: blur(4px);
        }
        `;
      }
      return "";
    },
  },
  watch: {
    style: function (style) {
      if (this.styleElement) {
        this.styleElement.parentNode.removeChild(this.styleElement);
      }
      this.styleElement = this.applyStyle(style);
    },
  },
};
</script>

<style scoped>
.custom-card {
  position: relative;
  background-color: var(--primary);
  background-image: url("/images/signin-vector.svg");
  background-size: contain;
  background-position: 120% 20px;
}

.no-padding {
  padding: 0px !important;
}

.text-chip {
  padding: 20px;
  background-color: #f4f7fd;
  border-radius: 20px;
}
</style>
