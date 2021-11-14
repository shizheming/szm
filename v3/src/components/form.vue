<template>
  <div>
    <a-form v-bind="attrs" v-on="events">
      <slot></slot>
    </a-form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { cloneDeep } from "lodash";
export default {
  props: ["api", "model"],
  setup(props, w) {
    /* 获取事件 */
    let events = cloneDeep(w.attrs);
    delete events.onChange;

    /* 获取属性 */
    let attrs = reactive({ ...events });

    /* 回显数据 */
    if ("api" in props) {
      props.api().then((data) => {
        Object.assign(props.model, data);
      });
    }
    return {
      attrs,
      events,
    };
  },
};
</script>
