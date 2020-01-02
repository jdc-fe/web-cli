<script>
export default {
  props: {
    labelWidth: {
      type: String,
      default: '120px'
    },
    items: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: this.formData
    };
  },
  computed: {
    rules() {
      return this.items.reduce((map, item) => {
        if (item.rules) map[item.prop] = item.rules;
        return map;
      }, {});
    }
  },
  methods: {
    change(key, value) {
      this.form = Object.assign({}, this.form, { [key]: value });
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) resolve();
          else reject();
        });
      });
    },
    resetForm() { // 清空检验 + 清空form表单输入
      this.$refs.form.resetFields();
    },
    clearValidate() { // 只清空校验
      this.$refs.form.clearValidate();
    }
  },
  // eslint-disable-next-line
  render(h) {
    const { items, labelWidth, form } = this;
    const componentMap = {
      input: item => (
        <ElInput
          attrs={item.props}
          value={form[item.prop]}
          onInput={value => this.change(item.prop, value)}
          // onInput={this.change.bind(this, item.prop)}
        />
      ),
      number: item => (
        <ElInputNumber
          attrs={item.props}
          value={form[item.prop]}
          onInput={value => this.change(item.prop, value)}
        />
      ),
      colorPicker: item => (
        <ElColorPicker
          attrs={item.props}
          value={form[item.prop]}
          onInput={value => this.change(item.prop, value)}
        />
      ),
      date: item => (
        <ElDatePicker
          attrs={item.props}
          value={form[item.prop]}
          onInput={this.change.bind(this, item.prop)}
        />
      ),
      radio: item => (
        item.props.list) && (
        item.props.list.map((d, idx) => (
        <ElRadio
          attrs={item.props}
          value={form[item.prop]}
          key={idx}
          label={d.label}
          onInput={this.change.bind(this, item.prop)}
        >
          {d.value}
        </ElRadio>
        ))
      ),
      slot: (item) => {
        const { slotName } = item;
        const slot = this.$slots[slotName];
        return slot;
      }
    };
    return (
      <ElForm
        labelWidth={labelWidth}
        attrs={{ model: form }}
        rules={this.rules}
        ref="form"
      >
        {items.map((item, idx) => (
          <ElFormItem
            key={idx}
            label={item.label}
            prop={item.prop}
            labelWidth={labelWidth}
          >
            {componentMap[item.pattern](item)}
          </ElFormItem>
        ))}
    </ElForm>
    );
  }
};
</script>
