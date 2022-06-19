<script>
export default {
  props: {
    column: {
      type: Number,
      default () {
        return 3;
      }
    }
  },
  methods: {
    r () {
      return this.$parent.renderComponent((getDom, data) => {
        const conel = (
          <div
            class={'myCardDetaile'}
            {...{
              style: {
                width: data.label.row
                  ? '100%'
                  : Math.floor(100 / this.column) + '%'
              }
            }}
          >
            <label
              {...data.label}
              {...{
                style: {
                  width: data.label.row
                    ? Math.floor(100 / this.column) / this.column + '%'
                    : Math.floor(100 / this.column) + '%'
                }
              }}
            >
              {data.label.name} ：
            </label>
            <span
              {...{
                style: {
                  width: this.column == 2 ? '50%' : '63%'
                }
              }}
            >
              {getDom()}
            </span>
          </div>
        );

        return data.label.row ? <a-row>{conel}</a-row> : conel;
      });
    }
  },
  render () {
    return <div>{this.r()}</div>;
  }
};
</script>
<style lang="less">
.myCardDetaile {
  display: inline-block;
  line-height: 3;
  label {
    width: 33%;
    text-align: right;
    display: inline-block;
    white-space: nowrap;
  }
  > span {
    display: inline-block;
    width: 63%;
    vertical-align: middle;
  }
}
</style>