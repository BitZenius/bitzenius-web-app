export default {
  props: {
    parentModel: false,
    persistent: false,
  },
  data() {
    return {
      showDialog: false,
      styleElement: null,
    };
  },
  mounted() { },
  methods: {
    // CSS HIJACK
    applyStyle(styleDef) {
      let styleElement = document.createElement("style");
      styleElement.type = "text/css";
      document.head.appendChild(styleElement);
      styleElement.innerHTML = styleDef;
      return styleElement;
    },


  },
  computed: {
    style() {
      if (this.showDialog) {
        return `
        .v-overlay--active {
          background: #1a202c4d 0% 0% no-repeat padding-box;
          opacity: 1;
          backdrop-filter: blur(4px);
        }
        `;
      }
      return "";
    },
  },
  watch: {
    style: function (style) {
      if (this.styleElement) {
        this.styleElement.parentNode.removeChild(this.styleElement);
      }
      this.styleElement = this.applyStyle(style);
    },
    parentModel: {
      handler(nv, ov) {
        this.showDialog = nv;
      },
      immediate: true,
    },
    showDialog: {
      handler(nv, ov) {
        if (nv == false) {
          this.$emit("close");
        }
      },
    },
  },
}