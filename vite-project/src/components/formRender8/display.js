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

export function display(
  componentType,
  componentNameStr,
  setDetail,
  detailData,
  innerObj,
  props,
  emitType,
  newSlots,
  newProps
) {
  // 添加设值函数到form，让form来调用，而不是自己调回用，
  setDetail?.value?.push((v) => {
    let value = get(detailData?.value, componentNameStr);
    // 我这里是通过change事件来设值，而不是直接赋值，值和chang是一体的，模拟人为的
    if (value !== undefined) {
      // 等options有了才设值
      if (componentType === "select" || componentType === "cascader") {
        // options先回来
        if (innerObj.optionsDetail?.length) {
          if (isFunction(props.inner)) {
            value = props.inner(detailData?.value);
          }
          emitType(value);
        } else {
          // 不是每个select都是接口回来的options，也要考虑，写死的options
          // 写死的options

          if (newSlots?.default) {
            if (isFunction(props.inner)) {
              value = props.inner(detailData?.value);
            }
            emitType(value);
          } else {
            // 进来的时候就有options了
            if (newProps.options) {
              if (isFunction(props.inner)) {
                value = props.inner(detailData?.value);
              }
              emitType(value);
            } else {
              // options后回来
              // 监听我主动设上去的options
              let optionsMyWatch = watch(
                () => innerObj.optionsDetail,
                (newValue) => {
                  if (isFunction(props.inner)) {
                    value = props.inner(detailData?.value);
                  }
                  emitType(value);
                  optionsMyWatch();
                  optionsWatch();
                }
              );
              // 监听原来自己的options属性
              let optionsWatch = watch(
                () => newProps.options,
                (newValue) => {
                  if (isFunction(props.inner)) {
                    value = props.inner(detailData?.value);
                  }
                  emitType(value);
                  optionsWatch();
                  optionsMyWatch();
                }
              );
            }
          }
        }
      } else {
        if (isFunction(props.inner)) {
          value = props.inner(detailData?.value);
        }

        emitType(value);
      }
    }
  });
}
