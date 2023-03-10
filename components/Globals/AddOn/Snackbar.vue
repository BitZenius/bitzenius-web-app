<template>
  <div class="text-center ma-2">
    <v-snackbar
      timeout="5000"
      elevation="5"
      :color="color"
      v-model="show"
      top
      width="100%"
    >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-if="buttonPath"
          color="white"
          text
          exact
          v-bind="attrs"
          @click="
            () => {
              $router.push(buttonPath);
              show = false;
            }
          "
        >
          {{ buttonMessage ? buttonMessage : "Continue" }}
        </v-btn>
        <v-btn v-else color="white" text v-bind="attrs" @click="show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: null,
      color: null,
      buttonMessage: null,
      buttonPath: null,
    };
  },
  methods: {
    logger() {},
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
  },
  watch: {
    snackbar: {
      handler(nv, ov) {
        this.show = nv.show;
        this.message = nv.message;
        this.color = nv.color;
        this.buttonMessage = nv.buttonMessage;
        this.buttonPath = nv.buttonPath;
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
