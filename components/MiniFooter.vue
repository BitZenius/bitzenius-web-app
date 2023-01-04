<template>
  <v-footer
    padless
  >
    <v-card
      flat
      tile
      class="white--text text-center"
      width="100%"
    >
      <v-card-text>
        <v-btn
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            mdi-twitter
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            mdi-instagram
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            mdi-facebook
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            mdi-web
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        &copy;{{ new Date().getFullYear() }} — <strong>BitZenius</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
