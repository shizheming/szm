// 主动与被动的关系
// trigger和change的关系
// 以后做完一个文件要回顾下知识点，意识到的点，和减少变量

import {
  onMounted,
  reactive,
  watch,
  inject,
  onUnmounted,
  useAttrs,
  watchEffect,
  ref,
  isRef,
  isReactive,
  useSlots,
  nextTick,
} from "vue";
import {
  forEach,
  tail,
  isArray,
  isFunction,
  drop,
  isString,
  isPlainObject,
  get,
  isObject,
} from "lodash";

export default function (props, emit, componentType) {
  /********************** 接受form给的数据 **********************/
  const outer = inject("outer", undefined);
  const componentName = inject("componentName", undefined);
  const attrs = useAttrs();
  const bindValue = ref(props.value || props.checked);
  let componentNameStr;
  let emitType;

  const slots = useSlots();
  let newSlots = {};
  forEach(slots, (value, key) => {
    newSlots[key] = value();
  });

  if (isArray(componentName?.value)) {
    componentNameStr = componentName.value.join(".");
  } else if (isString(componentName?.value)) {
    componentNameStr = componentName.value;
  }

  // 统一emit事件
  if (componentType === "switch") {
    emitType = function (value) {
      emit("update:checked", value);
    };
  } else {
    emitType = function (value) {
      emit("update:value", value);
    };
  }

  // 监听外面绑定值变化，更新
  watch(
    () => props.value,
    (newValue) => {
      bindValue.value = newValue;
    }
  );

  // 监听组件内部绑定值，同步更新外部值
  watch(
    () => bindValue.value,
    (newValue) => {
      emitType(newValue);
    }
  );

  if (props.inner) {
    props.inner();
  }

  /********************** 编辑页和详情页回显 **********************/
  /*   if (isDetail || props.isDetail) {
    // 详情页样式修改
    newProps.disabled = true;
    newProps.bordered = false;
    newProps.showArrow = false;
    newProps.class = "formDetail";
    newProps.style = "margin:0";
    newProps.placeholder = undefined;
  } */

  /* 组件没有了删除对应的值 */
  if (props.clear === true) {
    onUnmounted(() => {
      emitType(undefined);
    });
  }

  /* 单个监听 */
  // 没有多个，多个也是单个
  if (isArray(props.trigger)) {
    props.trigger.forEach((item) => {
      watch(
        isObject(item[0]) ? item[0] : () => item[0],
        (newValue, oldValue) => {
          item[1]();
        }
      );
    });
  }

  /* 监听一次 */
  if (isArray(props["trigger-once"])) {
    props["trigger-once"].forEach((item) => {
      const unwatch = watch(
        isObject(item[0]) ? item[0] : () => item[0],
        (newValue, oldValue) => {
          item[1]();
          unwatch();
        }
      );
    });
  }

  /* 联动关系清除值或属性 */
  // switch是开关
  // 还没想好怎么设计
  if (attrs["switch"]) {
  }

  /* 同时满足有的条件监听 */
  if (props.togetherhas) {
    watch(
      props.togetherhas[0].map((cur, index) => {
        return () => props.togetherhas[0][index];
      }),
      (newValue, oldValue) => {
        if (
          newValue.every((item) => {
            return item !== undefined && newValue !== "";
          })
        ) {
          props.togetherhas[1]();
        }
      }
    );
  }

  /* 同时满足无的条件监听 */
  if (props.togethernohas) {
    watch(
      props.togethernohas[0].map((cur, index) => {
        return () => props.togethernohas[0][index];
      }),
      (newValue, oldValue) => {
        if (
          newValue.every((item) => {
            return item === undefined || newValue === "";
          })
        ) {
          props.togethernohas[1]();
        }
      }
    );
  }

  /* outer函数 */
  if (props.outer && outer) {
    if (componentNameStr) {
      outer[componentNameStr] = (data) => {
        return props.outer(data);
      };
    }
  }
  return { bindValue, newSlots };
}
