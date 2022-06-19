<script>
/*
    有些默认的值需要配一下
    比如说select都是要叉叉功能的
    比如说搜索item的水平3列
    比如详情页的水平3列

    1.三块比重重新分配下，现在有点头重身体轻
    2.块先独立在提炼，概念提炼，不是形状提炼
    3.提炼数据层
    4.click优化，不需要配置
    5.增加组的概念，比如一大推一起显示隐藏，不可能去控制每个id的isShow，像区长市长省长国家元首
    6.setComponent方法细分
    7.startDisplay支持异步回显，就是不用管我设置值得时候dom有没有，能一下子射上去，我不管，但是需要配合endDisplay一起用
    8.在组应用得时候要加个组内组，有时候一个组得显示影藏是根据另一个组得显示影藏，并不是直接操作
    9.增加缓存数据功能，用于切换显示影藏时显示老得数据

*/
import readyStart from './readyStart';
import method from './method';
import {cloneDeep, isArray, isPlainObject, identity, partialRight} from 'lodash';
import customComponent from './component.js';
import FormSearch from './search.vue';
import FormSubmit from './form.vue';
import FormDetail from './detail.vue';
import {Form} from 'ant-design-vue';

export default {
  data () {
    return {
      // 全部数据
      originalData: [],
      // 表单对象
      form: {},
      // 组对象
      group: {},
      // 这个给component.js里面的组件用的变量
      componentData: {},
      // 所有的组件不管是内部的还是外部的
      allComponent: customComponent,
      staticData: {},
      // 缓存表单数据，用于切换显示原来得数据
      cacheData: {}
    };
  },
  props: {
    type: {
      type: String,
      default: 'search'
    },
    source: {
      type: Array,
      default () {
        return [];
      }
    },
    initFetch: {
      type: Boolean,
      default () {
        return false;
      }
    },
    column: {
      type: Number,
      default () {
        return 3;
      }
    },
    p: {
      type: Object,
      default () {
        return {};
      }
    },
    init: {
      type: Array,
      default () {
        return [];
      }
    },
    // 这个适用于页面级别的自定义组件，通用的话可以写在component.js里面
    // 页面级别的自定义组件
    myComponent: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  watch: {
    source () {
      this.generate();
    },
    init () {
      this.generate();
    }
  },
  created () {
    readyStart.bindThis(this);
    this.generate();
  },
  methods: {
    startDisplay (data) {
      this.$refs.formSubmit.formData = {
        ...data,
        isShow: true
      };
    },
    endDisplay () {
      this.$refs.formSubmit.formData.isShow = false;
    },
    getValue () {
      return this.form.getFieldsValue();
    },
    ...method,
    generate () {
      // 处理source数据
      this.defaultSource();
      // 合并2块的组件
      this.mergeComponent();
      // 添加事件
      this.addEvent();
      // 处理init数据
      this.initData();
    },
    defaultSource () {
      let {newSource, group} = readyStart.defaultSource(this.source, this.type);

      this.originalData = newSource;
      this.group = group;
      // 记录第一次的数据用于resetFields方法还原数据
      this.staticData = {
        originalData: cloneDeep(newSource),
        group: cloneDeep(group)
      };
    },
    mergeComponent () {
      this.allComponent = {
        ...customComponent,
        ...this.myComponent
      };
    },
    addEvent () {
      readyStart.addEvent(this.originalData, this.$listeners, this.type);
      this.onceData();
    },
    initData () {
      readyStart.defaultAllDetail(this.originalData, this.init, this.type).then(() => {
        this.type !== 'detail' && this.onceData();
      });
    },
    // 记录第一次的数据用于resetFields方法还原数据
    onceData () {
      let {group} = readyStart.defaultSource([
        ...this.originalData,
        ...(this.staticData.group.originalGroup ? this.staticData.group.originalGroup : {})
      ]);

      this.staticData = {
        group,
        originalData: cloneDeep(this.originalData)
      };
    },
    // 避免复制vonode节点
    clone (data) {
      Object.keys(data).forEach((current, key) => {
        if (isPlainObject(data[current])) {
          data[current] = !data[current].tag ? this.clone({...data[current]}) : data[current];
        } else if (isArray(data[current])) {
          data[current] = this.clone([...data[current]]);
        }
      });
      return data;
    },
    renderComponent (fn = identity) {
      // 最终渲染的对象
      let renderData = [];
      let div = <hm-form-item {...{
        style: {
          display: 'none'
        },
        props: {
          cols: 0
        }
      }}></hm-form-item>;
      let onlyComponentRender = partialRight(this.onlyComponentRender, fn, div);

      this.originalData.forEach(current => {
        let r = onlyComponentRender(current);

        if (!r) return;
        renderData.push(r);
      });
      return renderData;
    },
    onlyComponentRender (current, fn, div) {
      let dName = current.value.type;

      // 找不到渲染的组件就pass
      if (!this.allComponent[dName]) return;
      current = this.clone({...current});
      delete current.value.type;

      return current.isShow !== false
        ? fn(this.allComponent[dName].bind(this, current.value), current)
        : div
      ;
    },
    r () {
      let d = {
        props: {
          p: this.p,
          initFetch: this.initFetch
        }
      };

      if (this.type === 'search') {
        return <FormSearch {...d}/>;
      } else if (this.type === 'submit') {
        return <FormSubmit {...d} ref='formSubmit'/>;
      } else if (this.type === 'detail') {
        d.props.column = this.column;
        return <FormDetail {...d}/>;
      }
    }
  },
  render (h) {
    return this.r();
  }
};
</script>