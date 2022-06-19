<script>
import _ from '@/widgets/tool';
import c from './component.js';
export default {
  data () {
    return {
      f: this.$form.createForm(this)
    };
  },
  props: ['source', 'p'],
  watch: {
    source () {
      let directives = _.recursive(this.source, function (currentValue, key, collection, level) {
        return collection.name === 'decorator' ? collection.value : '';
      });

      directives.value
        .filter(current => current)
        .map(current => current[0])
        .forEach(current => {
          this.f.getFieldDecorator(current, {
            preserve: true
          });
        });
    }
  },
  methods: {
    r () {
      return this.$parent.renderComponent((getDom, data) => {
        return <hm-form-item {...data.label}>{getDom()}</hm-form-item>;
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