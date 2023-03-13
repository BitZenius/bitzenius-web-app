<template>
  <v-card flat rounded>
    <v-card-title class="text-h6 font-weight-bold primary white--text">
      <v-row align="center">
        <v-col cols="8"> Task Overview </v-col>
        <v-col cols="4" class="d-flex justify-end align-center">
          <v-btn color="white" icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="py-5">
      <v-expansion-panels accordion v-if="!profileCompletionLoading">
        <v-expansion-panel v-for="(item, i) in profileCompletion.data" :key="i">
          <v-expansion-panel-header
            :disable-icon-rotate="item.completed"
            class="text-h6 font-weight-bold"
          >
            {{ item.title }}
            <template v-if="item.completed" v-slot:actions>
              <v-icon color="success"> mdi-check </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex flex-column text-body-1">
              {{ item.description }}
              <div
                :class="
                  checkMobile()
                    ? 'd-flex justify-center mt-4'
                    : 'd-flex justify-end mt-2'
                "
                v-if="!item.completed"
              >
                <v-btn
                  rounded
                  dense
                  color="success"
                  exact
                  @click="taskAction(item)"
                  style="max-width: min-content"
                >
                  {{ item.title }}
                  <v-icon small class="ml-1"> mdi-arrow-right </v-icon>
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels accordion v-else>
        <v-expansion-panel v-for="i in 4" :key="`skeleton-task-${i}`">
          <v-expansion-panel-header class="text-h6 font-weight-bold">
            <v-skeleton-loader type="heading"></v-skeleton-loader>
            <template v-slot:actions>
              <v-skeleton-loader type="chip"></v-skeleton-loader>
            </template>
          </v-expansion-panel-header>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close-modal", false);
    },

    taskAction(task) {
      if (task.path.includes("bots")) {
        this.$store.commit("setShowCreateBotListModal", true);
      } else {
        this.$router.push(`${task.path}?c=1`);
      }

      this.closeModal();
    },
  },
  computed: {
    profileCompletion() {
      return this.$store.state.profileCompletion;
    },
    nextTask() {
      var result = null;

      if (!this.profileCompletion.data) return result;

      for (let index = 0; index < this.profileCompletion.data.length; index++) {
        const task = this.profileCompletion.data[index];
        if (!task.completed) {
          result = task;
          break;
        }
      }

      return result;
    },
    profileCompletionProgress() {
      return (
        (this.profileCompletion.step / this.profileCompletion.stepTotal) * 100
      );
    },
  },
  beforeDestroy() {
    this.$store.commit("setShowTaskModal", false);
  },
};
</script>

<style>
</style>