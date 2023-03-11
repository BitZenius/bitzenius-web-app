<template>
  <v-card class="pa-4" flat>
    <v-row>
      <v-col cols="8" class="d-flex flex-column">
        <span class="basic-text--text font-weight-bold text-h6"
          >Task completion</span
        >
        <span class="basic-text--text font-weight-bold my-2">
          <strong class="primary--text"
            >{{ completedTasks.length }}/{{ taskData.length }}</strong
          >
          tasks are done
        </span>
        <v-btn
          @click="$emit('show-task')"
          color="primary"
          style="width: 50%"
          rounded
          depressed
        >
          All Tasks
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-end">
        <v-progress-circular
          :rotate="270"
          :value="profileCompletionProgress"
          color="primary"
          size="65"
          width="5"
          class="d-flex align-center justify-center mr-2"
        >
          <span class="primary--text font-weight-bold">
            {{ profileCompletionProgress }}%
          </span>
        </v-progress-circular>
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
  computed: {
    completedTasks() {
      return this.taskData.filter((e) => e.completed == true);
    },
    profileCompletionProgress() {
      var total = this.taskData;
      var completed = this.taskData.filter((e) => e.completed == true);
      return (completed.length / total.length) * 100;
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

.custom-avatar-2 {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 100%;
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
