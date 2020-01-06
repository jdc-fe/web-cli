<template>
  <el-form
    :model="formData"
    :label-width="labelWidth"
    :rules="rules"
    v-bind="formProps"
    ref="form"
    class="form"
    :validate-on-rule-change="false"
  >
    <el-form-item
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      :label-width="labelWidth"
    >
      <el-input
        v-if="item.pattern === 'input'"
        v-model="formData[item.prop]"
        v-bind="item.props"
      />
      <template v-if="item.pattern === 'radio'">
        <el-radio
          v-model="formData[item.prop]"
          v-for="(d, idx) in item.props.list"
          :key="idx"
          :label="d.label"
           v-bind="item.props"
        >
          {{d.value}}
        </el-radio>
      </template>
      <template v-if="item.pattern === 'radioButton'">
        <el-radio-group v-model="formData[item.prop]">
        <el-radio-button
          v-model="formData[item.prop]"
          v-for="(d, idx) in item.props.list"
          :key="idx"
          :label="d.label"
          v-bind="item.props"
        >
          {{d.value}}
        </el-radio-button>
        </el-radio-group>
      </template>
      <template v-if="item.pattern === 'checkbox'">
        <el-checkbox-group v-model="formData[item.prop]">
          <el-checkbox
          v-model="formData[item.prop]"
          v-for="(d, idx) in item.props.list"
          :key="idx"
          :label="d.label"
          v-bind="item.props"
        >
          {{d.value}}
          </el-checkbox>
        </el-checkbox-group>
      </template>
      <el-date-picker
        v-if="item.pattern === 'date'"
        v-model="formData[item.prop]"
        v-bind="item.props"
        :picker-options="item.pickerOptions"
      />
      <el-input-number
        v-if="item.pattern === 'number'"
        v-model="formData[item.prop]"
        v-bind="item.props"
      ></el-input-number>
      <span v-if="item.pattern === 'number'&&item.flag === true">%</span>
      <el-color-picker
        v-if="item.pattern === 'colorPicker'"
        v-model="formData[item.prop]"
        v-bind="item.props"
      />
      <span class="rgbText"
      v-if="item.pattern === 'colorPicker'">可输入RGB色值</span>
      <el-select
        v-if="item.pattern === 'select'"
        v-model="formData[item.prop]"
        v-bind="item.props"
      >
        <el-option
          v-for="(i, idx) in item.props.list"
          :key="idx"
          :label="i.label"
          :value="i.value"
        />
        </el-select>
      <slot v-if="item.pattern === 'slot'" :name="item.slotName" />
    </el-form-item>
  </el-form>
</template>

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
    },
    formProps: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    rules() {
      // arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
      // initialValue可选: 作为第一次调用callback函数时的第一个参数的值。
      // 如果没有提供初始值，则将使用数组中的第一个元素。
      return this.items.reduce((map, item) => {
        if (item.rules) map[item.prop] = item.rules;
        return map;
      }, {});
    }
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (valid) resolve();
          else reject();
        });
      });
    },
    // 清空检验 + 清空form表单输入
    // 注： 对该表单项进行重置，将其值重置为初始值并移除校验结果
    resetForm() {
      this.$refs.form.resetFields();
    },
    // 只清空校验
    clearValidate() {
      this.$refs.form.clearValidate();
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'variable';
.form {
  text-align: left;
  // margin: 0 auto;
  padding-top: $--main-padding;
}
span{
  font-size: 16px;
}
.rgbText{
  display: inline-block;
  position: relative;
  bottom: 13px;
  left: 5px;
  font-size: 14px;
  color: #9ca1ae;
}
</style>
