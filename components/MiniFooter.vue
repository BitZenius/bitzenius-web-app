<template>
  <v-footer
    padless
  >
    <v-card
      flat
      tile
      class="cardColor white--text text-center"
      width="100%"
      fixed
    >
      <v-card-text>
        <v-btn
          class="mx-4 white--text"
          icon
          href="https://twitter.com"
          target="_blank"
        >
          <v-icon size="24px">
            mdi-twitter
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
          href="https://instagram.com"
          target="_blank"
        >
          <v-icon size="24px">
            mdi-instagram
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
          href="https://facebook.com"
          target="_blank"
        >
          <v-icon size="24px">
            mdi-facebook
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
          href="https://bitzenius.com"
          target="_blank"
        >
          <v-icon size="24px">
            mdi-web
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        &copy;{{ new Date().getFullYear() }} - BitZenius
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style>
  .cardColor {
    background-color: rgba(51, 148, 248, 0.9) !important;
    border-color: rgba(51, 148, 248, 0.9) !important;
  }
</style>
