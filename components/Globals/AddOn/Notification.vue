<template>
    <v-overlay :value="showOverlay" z-index="5000" opacity="0.9">
        <v-btn class="right" @click="showOverlay = false" icon>
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <small>
          Please resolve all existing important notification!
        </small>
        <v-list elevation="10" style="border-radius:15px;">
            <div v-for="(notification,i) in notifications" :key="i">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon large class="customPink">mdi-alert-circle-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">Notification {{i+1}}</v-list-item-title>
                        <v-list-item-subtitle class="customYellow--text">
                          {{notification.message}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                    <!-- <v-btn small color="customGreen basic-text--text" style="text-transform: unset !important;">
                        I've read it
                    </v-btn> -->
                    </v-list-item-action>
                </v-list-item>
              </div>
        </v-list>
    </v-overlay>
</template>



<script>
export default {
  props:['notifications'],
  data: () => ({
    showOverlay: false,
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
  mounted() {
  },
  methods: {
    show() {
      this.showOverlay = true;
    },
  },
};
</script>

<style scoped>
.close-button {
  position: absolute;
  right: 3%;
  top: 5%;
}
</style>