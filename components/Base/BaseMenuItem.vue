<template>
  <v-list-item
    :disabled="disabled"
    :ripple="false"
    color="primary"
    :to="to"
    exact
    dense
    class="custom-menu mb-2"
  >
    <v-list-item-action>
      <v-icon v-if="icon" v-html="avatar" size="21" class="mx-4"> </v-icon>

      <!-- <v-list-item-avatar size="35">
      </v-list-item-avatar> -->
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title class="basic-text--text text-body-1">{{
        cardtitle
      }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "BaseMenuItem",
  props: {
    to: {
      type: String | Object,
      default: () => {
        return undefined;
      },
    },
    icon: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    avatar: {
      type: String,
      default: () => {
        return "mdi-apps";
      },
    },
    cardtitle: {
      type: String,
      default: () => {
        return "Dashboard";
      },
    },
    link: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
};
</script>

<style>
.custom-menu.v-list-item {
  padding: 0px !important;
  background-color: none !important;
  cursor: pointer;
}

.custom-menu.v-list-item > .v-list-item__action {
  margin: 0px !important;
}

.custom-menu.v-list-item > .v-list-item__action > .v-list-item__avatar {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
  transition: all 0.2s;
}

/* .custom-menu.v-list-item.v-list-item--active {
  background-color: #f4f7fd !important;
} */

.custom-menu.v-list-item.v-list-item--active
  > .v-list-item__action
  > .v-list-item__avatar {
  color: white;
  background: var(--primary);
}

.custom-menu.v-list-item.v-list-item--active
  > .v-list-item__content
  > .v-list-item__title {
  font-weight: 700;
}

.custom-menu.v-list-item > .v-list-item__content > .v-list-item__title {
  transition: all 0.2s;
}

.custom-menu.v-list-item:not(.v-list-item--active):hover
  > .v-list-item__content
  > .v-list-item__title {
  margin-left: 5px;
  font-weight: 700;
}

.custom-menu.v-list-item:not(.v-list-item--active):hover
  > .v-list-item__action
  > .v-icon {
  color: var(--primary) !important;
}
</style>