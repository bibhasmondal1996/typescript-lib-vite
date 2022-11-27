import { defineComponent, reactive, openBlock, createElementBlock, normalizeClass, unref, renderSlot } from 'vue';

var MyButton_vue_vue_type_style_index_0_scoped_true_lang = '';

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MyButton",
  props: {
    primary: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { primary } = reactive(props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass(["btn", { primary: unref(primary) }])
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});
var MyButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00487d54"]]);

export { MyButton };
