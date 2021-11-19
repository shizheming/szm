<template>
  <a-form v-bind="attrs" v-on="events" ref="formRender" :model="model">
    <slot></slot>
  </a-form>
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
    let detailData = ref();
    provide("detailData", detailData);
    /* 获取事件 */
    let events = cloneDeep(w.attrs);
    delete events.onChange;

    /* 获取属性 */
    let attrs = reactive({ ...events });

    /* 设置外面的fromRender */
    const formRender = ref();
    onMounted(() => {
      w.emit("setForm", formRender);
      // 包一下验证方法，为了outer函数
      let ve = formRender.value.validate;
      formRender.value.validate = () => {
        // 处理outer所有的函数

        return ve();
      };
    });

    /* 回显数据 */
    if (props.isEdit && "api" in props) {
      props.api().then((data) => {
        detailData.value = data;
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
