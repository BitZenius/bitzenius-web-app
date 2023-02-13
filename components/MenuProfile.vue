<template>
  <v-list-item color="primary" exact dense class="custom-menu-2 mb-2" two-line>
    <v-progress-circular
      :rotate="270"
      :value="20"
      color="primary"
      class="d-flex align-center justify-center mr-2"
    >
      <v-list-item-avatar size="25" class="ma-0">
        <v-img :src="user.photoURL" :alt="user.displayName" contain></v-img>
      </v-list-item-avatar>
    </v-progress-circular>

    <v-list-item-content>
      <v-list-item-title class="black--text text-body-1 font-weight-bold">
        {{ user.displayName }}
      </v-list-item-title>
      <v-list-item-subttitle class="black--text text-body-2">
        <strong class="primary--text font-weight-bold">{{ 64 }}%</strong>
        Profile completion
      </v-list-item-subttitle>
    </v-list-item-content>

    <v-chip class="custom-chip" small color="primary">
      {{ user.subscription ? "Active" : user.trial ? "Trial" : "Inactive" }}
    </v-chip>
  </v-list-item>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          displayName: "Adi Setiawan",
          email: "mas.adisetiawan@gmail.com",
          emailVerified: true,
          phoneNumber: null,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/bitzenius-dev.appspot.com/o/user-avatars%2F1675436061468-1A1FBC5F-7B64-4BCE-AF27-1E66BAA4D631.jpeg?alt=media&token=25b63a6e-7559-4972-8767-790518734f1b",
          subscription: true,
          trial: false,
          uid: "6qcnpemu34Q2vU9KOsEO6vfVbYl2",
        };
      },
    },
  },
};
</script>

<style>
.custom-menu-2.v-list-item {
  padding: 0px !important;
  background-color: #f4f7fd !important;
  border-radius: 15px !important;
  position: relative;
}

.custom-menu-2.v-list-item > .v-list-item__action {
  margin: 0px !important;
}

.custom-menu-2.v-list-item > .v-list-item__action > .v-list-item__avatar {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
  transition: all 0.2s;
}

.custom-chip {
  position: absolute;
  right: 0%;
  top: -5%;
}
</style>