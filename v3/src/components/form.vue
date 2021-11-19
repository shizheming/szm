<template>
  <a-form v-bind="props" ref="formRender">
    <slot></slot>
  </a-form>
</template>

<script>
import { reactive, provide, ref, onMounted } from "vue";
import { Form } from "ant-design-vue";
import { cloneDeep, forEach } from "lodash";
export default {
  props: {
    api: {
      type: Function,
      default: undefined,
    },
    model: {
      type: Object,
      default: undefined,
    },
    isEdit: {
      type: Boolean,
      default: undefined,
    },
    outerModel: {
      type: Object,
      default: undefined,
    },
    ...Form.props,
  },
  emits: ["setForm"],
  setup(props, w) {
    // 判断是不是编辑页
    provide("isEdit", props.isEdit);
    // 接口回来的数据
    let detailData = ref();
    provide("detailData", detailData);
    // 在不同的组件里面需要判断接口是否已经请求好了
    let isFinish = ref();
    provide("isFinish", isFinish);
    // 收集表单里面的组件的outer函数
    let outer = reactive({});
    provide("outer", outer);

    /* 设置外面的fromRender */
    const formRender = ref();
    onMounted(() => {
      w.emit("setForm", formRender);
      // 包一下验证方法，为了outer函数
      let ve = formRender.value.validate;
      formRender.value.validate = () => {
        // 处理outer所有的函数
        if ("outerModel" in props) {
          forEach(outer, (value, key) => {
            console.log(key)
            props.outerModel[key] = value();
          });
        }
        return ve();
      };
    });

    /* 回显数据 */
    if (props.isEdit && "api" in props) {
      props.api().then((data) => {
        detailData.value = data;
        isFinish.value = true;
      });
    }
    return {
      props,
      formRender,
    };
  },
};
</script>
