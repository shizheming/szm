<script>
import c from './component.js';
export default {
  data () {
    return {
      f: this.$form.createForm(this),
      formData: {
        isShow: false
      }
    };
  },
  props: ['p'],
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
    search (e) {
      e.preventDefault();
      this.$parent.$emit('submit', this.f);
    }
  },
  render () {
    this.$parent.form = this.f;

    let d = {
      props: {
        source: this.source,
        ...this.p,
        form: this.f
      },
      on: {
        submit: this.search
      }
    };

    return <hm-form {...d}>
      {this.r()}
    </hm-form>;
  }
};
</script>