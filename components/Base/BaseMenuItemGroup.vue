<template>
  <v-list-group
    :disabled="disabled"
    :ripple="false"
    color="primary"
    exact
    dense
    class="custom-menu mb-2"
  >
    <template v-slot:prependIcon>
      <v-list-item-avatar>
        <v-icon v-if="icon" v-html="avatar" size="18"> </v-icon>
      </v-list-item-avatar>
    </template>
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title class="black--text text-body-2">
          {{ cardtitle }}</v-list-item-title
        >
      </v-list-item-content>
    </template>
    <slot></slot>
  </v-list-group>
</template>

<script>
export default {
  name: "BaseMenuItemGroup",
  props: {
    to: {
      type: String,
      default: () => {
        return "/";
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

<style >
.custom-menu.v-list-group > .v-list-item {
  padding: 0px !important;
  background-color: none !important;
}

.custom-menu.v-list-group > .v-list-item > .v-list-item__icon {
  margin: 0px !important;
  align-self: center;
}

.custom-menu.v-list-group
  > .v-list-item
  > .v-list-item__icon
  > .v-list-item__avatar {
  margin-bottom: 0px !important;
  margin-top: 0px !important;
  transition: all 0.2s;
}

/* .custom-menu.v-list-group > .v-list-item.v-list-item--active {
  background-color: #f4f7fd !important;
} */

.custom-menu.v-list-group
  > .v-list-item.v-list-item--active
  > .v-list-item__icon
  > .v-list-item__avatar {
  color: white;
  background: var(--primary);
}

.custom-menu.v-list-group
  > .v-list-item.v-list-item--active
  > .v-list-item__content
  > .v-list-item__title {
  font-weight: 700;
}

.custom-menu.v-list-group
  > .v-list-item
  > .v-list-item__content
  > .v-list-item__title {
  transition: all 0.2s;
}

.custom-menu.v-list-group
  > .v-list-item:not(.v-list-item--active):hover
  > .v-list-item__content
  > .v-list-item__title {
  margin-left: 5px;
  font-weight: 700;
}

.custom-menu.v-list-group
  > .v-list-item:not(.v-list-item--active):hover
  > .v-list-item__icon
  > .v-list-item__avatar
  > .v-icon {
  color: var(--primary) !important;
}
</style>