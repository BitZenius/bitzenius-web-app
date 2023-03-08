<template>
  <v-card flat class="pa-3" rounded>
    <v-row no-gutters>
      <v-col cols="8">
        <h3 class="text-body-h6 font-weight-bold mb-2">Recent Transaction</h3>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <v-btn small color="primary"> Show All </v-btn>
      </v-col>
      <v-col cols="12">
        <v-list>
          <v-list-item v-for="i in 5" :key="`${i}-list`" two-line>
            <v-list-item-avatar>
              <v-img
                max-width="25px"
                max-height="25px"
                :src="
                  i <= 2
                    ? require('~/assets/images/deposit.svg')
                    : require('~/assets/images/withdraw.svg')
                "
                position="center"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-body-1">{{
                i <= 2 ? "Deposit" : "Withdraw"
              }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold text-body-2"
                >2023-01-24 05:15:42</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-content class="text-right">
              <v-list-item-title class="font-weight-bold text-body-1"
                >1.22 USDT</v-list-item-title
              >
              <v-list-item-subtitle
                :class="
                  i <= 2
                    ? 'font-weight-bold text-body-2 success--text'
                    : 'font-weight-bold text-body-2 red--text'
                "
                >{{ i <= 2 ? "Completed" : "Failed" }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
      actionMode: "Deposit",
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
}

.text-chip {
  padding: 20px;
  background-color: #f4f7fd;
  border-radius: 20px;
}
</style>
