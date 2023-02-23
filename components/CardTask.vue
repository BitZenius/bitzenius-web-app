<template>
  <v-card class="pa-5" style="width: 95%; margin-left: auto" flat>
    <v-row class="pa-3">
      <v-col cols="1" style="position: relative">
        <div class="custom-avatar off-white-2">
          <lottie
            :width="50"
            :height="50"
            :options="lottieOptions"
            v-on:animCreated="handleAnimation"
          />
        </div>
      </v-col>
      <v-col
        cols="11"
        class="py-5 basic-text--text font-weight-bold text-body-1"
      >
        Task Overview
      </v-col>
      <v-col cols="12" class="task-item-container no-scrollbar pa-3">
        <CardTaskItem
          v-for="(data, i) in taskData"
          class="task-item"
          :key="`task-${i}`"
          :title="data.title"
          :description="data.description"
          :path="data.path"
          :completed="data.completed"
        ></CardTaskItem>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "~/assets/lottie/dashboard/new user task.json";

export default {
  components: {
    lottie,
  },
  props: {
    taskData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      // LOTTIE
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
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

.custom-avatar {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 4px solid var(--primary);
  top: -30%;
  left: -50%;
}

.absolute-tooltip {
  position: absolute;
  top: 10%;
  right: 5%;
}

.task-item-container {
  overflow-x: auto;
  display: flex;
  justify-content: flex-start;
  column-gap: 20px;
}

.task-item {
  min-width: 250px;
}
</style>
