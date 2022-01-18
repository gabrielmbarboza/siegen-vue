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
    <div v-for="(notify, index) in list" class="notify">
      <div class="message">{{ notify }}</div>
      <div @click="close" class="close" :data-notify-index="index">X</div>   
    </div>
  </div>
  `,
});
