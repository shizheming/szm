<template>
  <div>
    <a-form v-bind="attrs" v-on="events" ref="formRender" :model="model">
      <slot></slot>
    </a-form>
  </div>
</template>

<script>
import { reactive, provide, ref, onMounted } from "vue";
import { cloneDeep } from "lodash";
export default {
  props: ["api", "model", "isEdit"],
  emits: ["setForm"],
  setup(props, w) {
    provide("isEdit", props.isEdit);
    provide("formData", props.model);
    /* 获取事件 */
    let events = cloneDeep(w.attrs);
    delete events.onChange;

    /* 获取属性 */
    let attrs = reactive({ ...events });

    /* 设置外面的fromRender */
    const formRender = ref();
    onMounted(() => {
      w.emit("setForm", formRender);
    });

    /* 回显数据 */
    if (props.isEdit && "api" in props) {
      props.api().then((data) => {
        props.model._detailData = data;
        // provide不能写在异步函数里面吗
        // provide("detailData", data);
        props.model._isFinish = true;
      });
    }
    return {
      formRender,
      attrs,
      events,
    };
  },
};
</script>
