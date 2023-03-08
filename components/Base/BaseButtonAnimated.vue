<template>
  <v-btn
    color=""
    rounded
    x-large
    class="white--text text-capitalize custom-button"
    depressed
    :data-text="text"
    :disabled="disabled"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "BaseButtonAnimated",
  props: {
    text: {
      type: String,
      default: () => {
        return "Default";
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

<style scoped>
.custom-button {
  position: relative;
  z-index: 3;
  border: thin solid #7dd4b4;
  border-radius: 28px;
  padding: 25px;
  transition: all 0.2s ease-in;
}

.custom-button::after {
  content: attr(data-text);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102%;
  height: 102%;
  background: #3394f8 !important;
  position: absolute;
  border-radius: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-49%, -57%);
  transition: all 0.2s linear;
  z-index: 2;
}

.custom-button:hover::after {
  transform: translate(-50%, -50%);
}

.custom-button:hover {
}
</style>