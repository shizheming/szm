import {
  onMounted,
  reactive,
  watch,
  inject,
  onUnmounted,
  useAttrs,
  watchEffect,
  isRef,
  isReactive,
} from "vue";
import {
  forEach,
  tail,
  isArray,
  isFunction,
  drop,
  isString,
  get,
} from "lodash";

export default function (props, emit, componentType) {
  const attrs = useAttrs();
  /* 接受form给的数据 */
  let isEdit = inject("isEdit", undefined);
  let detailData = inject("detailData", undefined);
  let isFinish = inject("isFinish", undefined);

  let outer = inject("outer", undefined);
  let formData = inject("formData", undefined);
  let formComponents = inject("formComponents", undefined);
  let componentName = inject("componentName", undefined);
  /* 把change包一下，我要在里面更新数据，同时把formComponents传出去，打通表单内的所有数据 */
  let newProps = reactive({ ...props });
  forEach(attrs, (value, key) => {
    // 不需要监听trigger-xxxx，switch-xxx，和响应式数据
    if (
      !/^trigger-/.test(key) &&
      !/^switch-/.test(key) &&
      !isRef(value) &&
      !isReactive(value)
    ) {
      newProps[key] = value;
    }
  });
  // 监听原来的属性，不直接丢上去，因为不是一个值的入口，还有trigger-xxxx值的入口，我要自己接，然后处理好放上去
  watchEffect(() => {
    forEach(attrs, (value, key) => {
      // 不需要监听trigger-xxxx，switch-xxx，和响应式数据
      if (!/^trigger-/.test(key) && !/^switch-/.test(key)) {
        if (isRef(value) || isReactive(value)) {
          newProps[key] = value;
        }
      }
    });
  });

  return newProps;
}
