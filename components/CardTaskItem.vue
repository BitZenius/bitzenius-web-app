<template>
  <v-card :outlined="completed" flat color="success" class="custom-card-item">
    <v-list flat class="pa-0">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-body-2">{{
            title
          }}</v-list-item-title>
        </v-list-item-content>
        <v-avatar v-if="completed">
          <v-icon class="customGreen2--text">mdi-checkbox-marked-circle</v-icon>
        </v-avatar>
      </v-list-item>
    </v-list>

    <!-- ORNAMENTS -->
    <div v-if="completed" class="ornament-1"></div>
    <div v-else class="ornament-2"></div>
    <!-- ORNAMENTS END -->
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "Default title";
      },
    },
    completed: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.custom-card-item {
  border-radius: 0 !important;
}
.absolute-tooltip {
  position: absolute;
  top: 10%;
  right: 5%;
}

.ornament-1 {
  position: absolute;
  width: 20%;
  height: 4px;
  border-radius: 8px;
  background: #1ad598;

  left: 10%;
  top: 100%;
  transform: translate(0%, -50%);
}

.ornament-2 {
  position: absolute;
  width: 20%;
  height: 4px;
  border-radius: 8px;
  background: var(--primary);

  left: 10%;
  top: 100%;
  transform: translate(0%, -50%);
}
</style>