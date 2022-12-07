// 主动与被动的关系
// trigger和change的关系
// 以后做完一个文件要回顾下知识点，意识到的点，和减少变量

import {
  watch,
  inject,
  useSlots,
  Ref,
  ref,
  ExtractPropTypes,
  InjectionKey,
} from 'vue';
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
} from 'lodash';
import { PropsInterface } from './props';

export default function (props: PropsInterface): {
  newSlots: {};
  detailStyleObj: Ref<{
    disabled: boolean;
    bordered: boolean;
    showArrow: boolean;
    class: string;
    style: string;
  }>;
} {
  /********************** 接受form给的数据 **********************/
  const outer = inject<Ref>('outer', ref());
  const componentName = inject<Ref>('componentName', ref());
  let componentNameStr: string = '';
  let detailStyleObj = ref({
    disabled: false,
    bordered: true,
    showArrow: true,
    class: '',
    style: '',
  });
  const slots = useSlots();

  let newSlots: { [name: string]: any } = {};
  forEach(slots, (value, key) => {
    newSlots[key] = (<Function>value)();
  });

  if (isArray(componentName.value)) {
    componentNameStr = componentName.value.join('.');
  } else if (isString(componentName.value)) {
    componentNameStr = componentName.value;
  }

  if (props.inner) {
    props.inner();
  }

  if (props.isDetail) {
    watch(
      () => props.isDetail,
      (newValue) => {
        if (newValue) {
          detailStyleObj.value.disabled = true;
          detailStyleObj.value.bordered = false;
          detailStyleObj.value.showArrow = false;
          detailStyleObj.value.class = 'formDetail';
          detailStyleObj.value.style = '';
        } else {
          detailStyleObj.value.disabled = false;
          detailStyleObj.value.bordered = true;
          detailStyleObj.value.showArrow = true;
          detailStyleObj.value.class = '';
          detailStyleObj.value.style = 'margin:auto';
        }
      },
      { immediate: true }
    );
  }

  if (props.watch) {
    watch(...props.watch);
  }

  /* outer函数 */
  if (props.outer && outer) {
    if (componentNameStr) {
      outer.value[componentNameStr] = (data: any) => {
        return (props.outer as Function)(data);
      };
    }
  }
  return { newSlots, detailStyleObj };
}
