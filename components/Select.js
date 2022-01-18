app.component("v-select", {
  props: {
    modelValue: { type: String, default: "" },
    firstItem: { type: String },
    options: { type: Array, required: true },
  },
  emits: ["update:modelValue"],
  template: `
    <select v-model="value">
      <option disabled v-if="firstItem" value="">{{ firstItem }}</option>
      <option v-for="option in options" v-bind:value="option.code" >{{ option.label }}</option>
    </select>
  `,
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
