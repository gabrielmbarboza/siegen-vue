app.component("tooltip", {
  props: {
    content: { type: Object },
  },
  template: `
    <div class="tooltip" v-if="content">
      <span class="tooltip-content">
        <div class="tooltip-title">Resume</div>
        <div class="tooltip-info">
          <div class="tooltip-row">
            <span>{{ content?.paved_road?.label }}:</span>
            <span><strong>\${{ content?.paved_road?.cost }}</strong></span>
          </div>
          <div class="tooltip-row">
            <span>{{ content?.unpaved_road?.label }}:</span>
            <span><strong>\${{ content?.unpaved_road?.cost }}</strong></span>
          </div>
          <div class="tooltip-row">
            <span>{{ content?.cargo_weight?.label }}:</span>
            <span><strong>{{ content?.cargo_weight?.value }}</strong></span>
          </div>
        </div>
      </span>
    </div>
  `,
});
