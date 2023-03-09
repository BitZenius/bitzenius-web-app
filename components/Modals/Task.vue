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
    <v-card-text v-if="profileCompletion.data" class="py-5">
      <v-expansion-panels accordion>
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
              <div class="d-flex justify-end" v-if="!item.completed">
                <v-btn
                  flat
                  rounded
                  dense
                  color="success"
                  exact
                  :to="item.path"
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close-modal", false);
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
};
</script>

<style>
</style>