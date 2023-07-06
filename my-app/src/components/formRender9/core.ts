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
  newSlotsObject: {};
  detailStyleObject: Ref<{
    disabled: boolean;
    bordered: boolean;
    showArrow: boolean;
    class: string;
    style: string;
  }>;
} {
  /********************** 接受form给的数据 **********************/
  const outerObject = inject<Ref>('outer', ref());
  const componentNameStringArray = inject<Ref>('componentName', ref());
  let componentNameString = '';
  let detailStyleObject = ref({
    disabled: false,
    bordered: true,
    showArrow: true,
    class: '',
    style: '',
  });
  const slotsObject = useSlots();

  let newSlotsObject: { [name: string]: any } = {};
  forEach(slotsObject, (value, key) => {
    newSlotsObject[key] = (<Function>value)();
  });

  if (isArray(componentNameStringArray.value)) {
    componentNameString = componentNameStringArray.value.join('.');
  } else if (isString(componentNameStringArray.value)) {
    componentNameString = componentNameStringArray.value;
  }

  if (props.inner) {
    props.inner();
  }

  if (props.watch) {
    watch(...props.watch);
  }

  /* outer函数 */
  if (props.outer && outerObject) {
    if (componentNameString) {
      outerObject.value[componentNameString] = (data: any) => {
        return (props.outer as Function)(data);
      };
    }
  }
  return { newSlotsObject, detailStyleObject };
}
