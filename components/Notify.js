app.component("notify", {
  props: {
    list: { type: Array, default: [] },
  },
  emits: ["close"],
  methods: {
    close(event) {
      const {
        target: {
          previousSibling: { textContent: text },
        },
      } = event;
      this.$emit("close", text);
    },
  },
  template: `
  <div class="notifies">
    <div v-for="notify in list" class="notify slide-x">
      <div class="message">{{ notify }}</div>
      <div @click="close" class="close">X</div>   
    </div>
  </div>
  `,
});
