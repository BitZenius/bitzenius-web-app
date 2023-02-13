<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="600px">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold pl-8 pt-8 pr-8">
        {{ formTitle }}
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="data.name"
                  label="Custom Name"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="data.exchange"
                  :items="exchangeItems"
                  label="Choose Exchange"
                  outlined
                />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="data.api_key" label="API Key" outlined />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="data.secret_key"
                  label="Secret Key"
                  outlined
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="px-8 py-5">
        <v-spacer />
        <v-btn
          :disabled="isLoading"
          color="blue darken-1"
          class="elevation-0"
          @click.native="close"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          color="primary"
          class="elevation-0"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Form",
  props: {
    id: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
      default: null,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      exchangeItems: ["Binance", "Tokocrypto", "MEXC", "Coinstore"],
      isLoading: false,
    };
  },
  computed: {
    formTitle() {
      return this.data.id ? "Edit Exchange" : "Add Exchange";
    },
    user() {
      return this.$store.state.authUser;
    },
  },
  methods: {
    save() {
      this.isLoading = true;

      const saveData = {
        name: this.data.name,
        exchange: this.data.exchange,
        api_key: this.data.api_key,
        secret_key: this.data.secret_key,
      };

      if (this.id) {
        this.$fire.firestore
          .collection("user_exchanges")
          .doc(this.id)
          .set(saveData, { merge: true })
          .then(() => {
            this.close();
          })
          .catch((e) => {
            alert(e.response.data.message);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        saveData.user_id = this.user.uid;
        saveData.created_at = this.$moment().toISOString();
        this.$fire.firestore
          .collection("user_exchanges")
          .add(saveData)
          .then(() => {
            this.close();
          })
          .catch((e) => {
            alert(e.response.data.message);
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    close() {
      this.isLoading = false;
      this.$emit("update:dialog", false);
    },
  },
};
</script>
