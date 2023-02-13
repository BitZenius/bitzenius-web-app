<template>
  <v-card class="pa-2" flat>
    <v-row>
      <v-col cols="5" style="position: relative">
        <div class="custom-avatar">
          <img width="40" height="40" src="/token_logo/USDT.png" />
        </div>
      </v-col>
      <v-col cols="7" class="pt-5 black--text font-weight-bold text-body-1">
        Task Overview
      </v-col>
      <v-col v-for="i in 5" :key="`task-${i}`" cols="12" class="mt-2">
        <CardTaskItem
          :title="`Default task ${i}`"
          :completed="i > 3 || i == 2"
        ></CardTaskItem>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
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

.custom-avatar {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 100%;
  border: 4px solid var(--primary);
  top: -50%;
  left: 25%;
}

.absolute-tooltip {
  position: absolute;
  top: 10%;
  right: 5%;
}
</style>
