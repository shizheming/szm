<script>
import _ from '@/widgets/tool';
import c from './component.js';
export default {
  data () {
    return {
      f: this.$form.createForm(this)
    };
  },
  props: ['source', 'initFetch'],
  created () {
    // 怎么区别是单个组件还是组合组件
    // 把directives全部拿出来不管单个还是组合
    var directives = _.recursive(this.source, function (currentValue, key, collection, level) {
      return collection.name === 'decorator' ? collection.value : '';
    });
    // 注册decorator

    directives.value
      .filter(current => current)
      .map(current => current[0])
      .forEach(current => {
        this.f.getFieldDecorator(current, {
          preserve: true
        });
      });

    // console.log(this.initFetch, 'initFetch');
    // this.initFetch && this.search();
  },
  mounted () {
    this.$parent.$emit('get:form', this.f);
    this.initFetch && this.search();
  },

  methods: {
    r () {
      return this.$parent.renderComponent((getDom, data) => {
        return <hm-form-item {...data.label}>{getDom()}</hm-form-item>;
      });
    },
    search () {
      this.$parent.$emit('submit', this.f);
    },
    reset () {
      this.$parent.$emit('reset', this.f);
    },
    // 搜索布局分组
    group (v) {
      var newResult = [];
      var num = 0;
      var currentArr = [];

      v.forEach((current, index) => {
        var on = num;

        num += Number(current.data.props.cols || 24);

        if (num < 24) {
          currentArr.push(current);
          if (index === v.length - 1) newResult.push(currentArr);
        } else if (num == 24) {
          currentArr.push(current);
          newResult.push(currentArr);
          currentArr = [];
          num = 0;
        } else {
          newResult.push(currentArr);
          currentArr = [current];
          num = Number(num - on);
          if (index === v.length - 1) newResult.push(currentArr);
        }
      });
      return newResult;
    },
    // 添加a-row，实现展开更多条件功能
    addRow (result) {
      result.forEach((current, index, arr) => {
        arr[index] = <a-row>{current}</a-row>;
      });
      return result;
    }

  },
  render (h) {
    this.$parent.form = this.f;
    let d = {
      props: {
        ...this.p,
        form: this.f
      },
      on: {
        submit: this.search,
        reset: this.reset
      }
    };

    var node = _.compose(this.addRow, this.group)(this.r());

    return <hm-form-search {...d}>
      {node}
    </hm-form-search>;
  }
};
</script>