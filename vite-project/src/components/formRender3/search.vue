<script>
// import _ from '@/widgets/tool';
export default {
  data () {
    return {
      f: this.$form.createForm(this)
    };
  },
  props: ['initFetch', 'p'],
  mounted () {
    this.initFetch && this.search();
  },

  methods: {
    r () {
      return this.$parent.renderComponent((renderConfigComponent, data) => {
        let {label} = data;

        return (
          <hm-form-item {...label}>{
            renderConfigComponent()
          }</hm-form-item>
        );
      });
    },
    search () {
      this.$parent.$emit('submit', this.f);
    },
    reset () {
      this.$parent.$emit('reset', this.f);
    }
    // 搜索布局分组
    /* group (v) {
      var newResult = [];
      var num = 0;
      var currentArr = [];

      v.forEach((current, index) => {
        let {cols} = current.data.props;

        // 要排除isShow=false的
        if (!cols) return;
        var on = num;
                
        num += Number(cols);

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
    }, */
    // 添加a-row，实现展开更多条件功能
    /* addRow (result) {
      result.forEach((current, index, arr) => {
        arr[index] = <a-row>{current}</a-row>;
      });
      return result;
    } */

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
      },
      ...this.p
    };

    // var node = _.compose(this.addRow, this.group)(this.r());

    return <hm-form-search {...d}>
      {this.r()}
    </hm-form-search>;
  }
};
</script>