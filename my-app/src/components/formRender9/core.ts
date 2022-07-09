// 主动与被动的关系
// trigger和change的关系
// 以后做完一个文件要回顾下知识点，意识到的点，和减少变量

import { watch, inject, useSlots, Ref, ref, ExtractPropTypes } from "vue";
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
import { props } from "./props";

export default function (props: props): { newSlots: {} } {
  /********************** 接受form给的数据 **********************/
  const outer: Ref<{} | []> | undefined = inject("outer", undefined);
  const componentName: Ref<string | []> | undefined = inject(
    "componentName",
    undefined
  );
  let componentNameStr: string;

  const slots = useSlots();
  let newSlots: { [name: string]: any } = {};
  forEach(slots, (value, key) => {
    newSlots[key] = (<Function>value)();
  });

  if (isArray(componentName?.value)) {
    componentNameStr = componentName.value.join(".");
  } else if (isString(componentName?.value)) {
    componentNameStr = componentName.value;
  }

  if (props.inner) {
    props.inner();
  }

  /* 单个监听 */
  // 没有多个，多个也是单个
  /* if (isArray(props.trigger)) {
    props.trigger.forEach((item) => {
      watch(
        isObject(item[0]) ? item[0] : () => item[0],
        (newValue, oldValue) => {
          item[1]();
        }
      );
    });
  } */

  /* 监听一次 */
  /*  if (isArray(props["trigger-once"])) {
    props["trigger-once"].forEach((item) => {
      const unwatch = watch(
        isObject(item[0]) ? item[0] : () => item[0],
        (newValue, oldValue) => {
          item[1]();
          unwatch();
        }
      );
    });
  } */

  /* outer函数 */
  if (props.outer && outer) {
    if (componentNameStr) {
      outer[componentNameStr] = (data: any) => {
        return props.outer(data);
      };
    }
  }
  return { newSlots };
}
