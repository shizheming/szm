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
      return this.$parent.renderComponent((renderConfigComponent, data) => {
        const conel = <div class={'myCardDetaile'} {...{
          style: {
            width: data.label.row ? '100%' : Math.floor(100 / this.column) + '%'
          },
          ...data
        }}><label {...data.label}>{data.label.name} ：</label><span style={{display: 'inline-block'}}>{renderConfigComponent()}</span></div>;

        return conel;
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
    padding: 8px;
    label {
        display: inline-block;
        white-space: nowrap;
    }
    > span {
        display: inline-block;
    }
}
</style>