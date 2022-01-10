app.component("v-select", {
  props: {
    firstItem: { type: String },
    options: { type: Array, required: true },
  },
  template: `
    <select>
      <option v-if="firstItem">{{ firstItem }}</option>
      <option v-for="option in options" v-bind:value="option.code" >{{ option.label }}</option>
    </select>
  `,
});
